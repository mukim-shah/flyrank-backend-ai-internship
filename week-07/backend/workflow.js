const { inngest } = require('./inngest')
const { evaluateDecision } = require('./ai')
const { updateExecution, addLog } = require('./executionStore')

const workflowRunner = inngest.createFunction(
  {
    id: 'flowai-workflow-runner',
    retries: 1,
    triggers: [{ event: 'flowai/workflow.started' }],
  },
  async ({ event, step }) => {
    const { executionId, workflow } = event.data

    const nodes = workflow.nodes || []
    const edges = workflow.edges || []

    updateExecution(executionId, { status: 'running' })

    try {
      if (!nodes.length) {
        throw new Error('Workflow has no nodes')
      }

      const incoming = new Set(edges.map((edge) => edge.target))
      const startNode = nodes.find((node) => !incoming.has(node.id))

      if (!startNode) {
        throw new Error('No starting node found. Check your connections.')
      }

      let currentNode = startNode
      const visited = new Set()
      const decisions = []

      while (currentNode) {
        if (visited.has(currentNode.id)) {
          throw new Error(`Loop detected at node ${currentNode.id}`)
        }

        visited.add(currentNode.id)

        if (visited.size > 30) {
          throw new Error('Workflow stopped: maximum 30 nodes reached')
        }

        const prompt = currentNode.data?.prompt || currentNode.data?.label

        if (!prompt) {
          throw new Error(`Node ${currentNode.id} has no prompt`)
        }

        addLog(executionId, {
          nodeId: currentNode.id,
          message: `Evaluating: ${prompt}`,
          status: 'running',
        })

        const decision = await step.run(
          `decision-${currentNode.id}`,
          async () => evaluateDecision(prompt),
        )

        decisions.push({
          nodeId: currentNode.id,
          prompt,
          decision,
        })

        addLog(executionId, {
          nodeId: currentNode.id,
          message: `AI decision: ${decision}`,
          decision,
          status: 'completed',
        })

        const nextEdge = edges.find((edge) => {
          if (edge.source !== currentNode.id) return false

          const branch = edge.sourceHandle || edge.label
          return String(branch || '').toUpperCase() === decision
        })

        if (!nextEdge) {
          addLog(executionId, {
            nodeId: currentNode.id,
            message: `No ${decision} connection. Workflow finished.`,
            status: 'completed',
          })
          break
        }

        currentNode = nodes.find((node) => node.id === nextEdge.target)

        if (!currentNode) {
          throw new Error(`Target node ${nextEdge.target} does not exist`)
        }
      }

      const result = {
        message: 'Workflow completed successfully',
        decisions,
      }

      updateExecution(executionId, {
        status: 'completed',
        result,
      })

      return result
    } catch (error) {
      addLog(executionId, {
        message: error.message,
        status: 'error',
      })

      updateExecution(executionId, {
        status: 'failed',
        error: error.message,
      })

      throw error
    }
  },
)

module.exports = { workflowRunner }