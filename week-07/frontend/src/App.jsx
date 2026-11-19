import { useCallback, useEffect, useState } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Handle,
  Position,
  addEdge,
  useNodesState,
  useEdgesState,
} from '@xyflow/react'

import '@xyflow/react/dist/style.css'
import './App.css'

const API = 'http://localhost:3000'

const initialNodes = [
  {
    id: '1',
    type: 'decision',
    position: { x: 100, y: 120 },
    data: {
      label: 'Support Request?',
      prompt: 'Is this message a customer support request?',
      status: 'idle',
    },
  },
  {
    id: '2',
    type: 'decision',
    position: { x: 480, y: 20 },
    data: {
      label: 'Support Team',
      prompt: 'Does this request require human support?',
      status: 'idle',
    },
  },
  {
    id: '3',
    type: 'decision',
    position: { x: 480, y: 250 },
    data: {
      label: 'Sales Team',
      prompt: 'Is the customer interested in purchasing a product?',
      status: 'idle',
    },
  },
]

const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    sourceHandle: 'YES',
    target: '2',
    label: 'YES',
    animated: true,
  },
  {
    id: 'e1-3',
    source: '1',
    sourceHandle: 'NO',
    target: '3',
    label: 'NO',
    animated: true,
  },
]

function DecisionNode({ data, selected }) {
  return (
    <div className={`decision-node ${selected ? 'selected' : ''} ${data.status || ''}`}>
      <Handle type="target" position={Position.Left} />

      <div className="node-heading">
        <span className="node-tag">AI DECISION</span>
        <span className="node-dot" />
      </div>

      <strong>{data.label}</strong>
      <p>{data.prompt}</p>

      <div className="node-branches">
        <span className="yes">YES</span>
        <span className="no">NO</span>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id="YES"
        style={{ top: '65%' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="NO"
        style={{ top: '88%' }}
      />
    </div>
  )
}

const nodeTypes = { decision: DecisionNode }

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [selectedNode, setSelectedNode] = useState(null)
  const [execution, setExecution] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('Editor Ready')

  const onConnect = useCallback(
    (connection) => {
      const branch = connection.sourceHandle || 'YES'

      setEdges((current) =>
        addEdge(
          {
            ...connection,
            id: `e-${connection.source}-${connection.target}-${branch}`,
            label: branch,
            animated: true,
          },
          current,
        ),
      )
    },
    [setEdges],
  )

  const addNode = () => {
    const id = crypto.randomUUID()

    setNodes((current) => [
      ...current,
      {
        id,
        type: 'decision',
        position: { x: 180, y: 150 },
        data: {
          label: `AI Decision ${current.length + 1}`,
          prompt: 'Enter your decision question here.',
          status: 'idle',
        },
      },
    ])
  }

  const updateSelectedNode = (field, value) => {
    setNodes((current) =>
      current.map((node) =>
        node.id === selectedNode.id
          ? { ...node, data: { ...node.data, [field]: value } }
          : node,
      ),
    )

    setSelectedNode((current) => ({
      ...current,
      data: { ...current.data, [field]: value },
    }))
  }

  const handleNodeClick = (_, node) => {
    setSelectedNode(node)
  }

  const exportWorkflow = () => {
    const workflow = {
      id: 'flowai-workflow',
      nodes,
      edges,
    }

    const blob = new Blob([JSON.stringify(workflow, null, 2)], {
      type: 'application/json',
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'flowai-workflow.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  const importWorkflow = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()

    reader.onload = () => {
      try {
        const workflow = JSON.parse(reader.result)

        if (!Array.isArray(workflow.nodes) || !Array.isArray(workflow.edges)) {
          throw new Error('Invalid workflow JSON')
        }

        setNodes(workflow.nodes)
        setEdges(workflow.edges)
        setSelectedNode(null)
        setMessage('Workflow imported')
      } catch (error) {
        setMessage(error.message)
      }
    }

    reader.readAsText(file)
    event.target.value = ''
  }

  const runWorkflow = async () => {
    if (!nodes.length) {
      setMessage('Add a node first')
      return
    }

    setLoading(true)
    setExecution(null)
    setMessage('Sending workflow to Inngest...')

    setNodes((current) =>
      current.map((node) => ({
        ...node,
        data: { ...node.data, status: 'idle' },
      })),
    )

    try {
      const response = await fetch(`${API}/api/workflow/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workflow: {
            id: 'flowai-workflow',
            nodes,
            edges,
          },
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Could not start workflow')
      }

      setMessage('Workflow queued')
      setExecution({
        id: data.executionId,
        status: 'queued',
        logs: [],
      })
    } catch (error) {
      setMessage(error.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!execution?.id) return

    let active = true

    const poll = async () => {
      try {
        const response = await fetch(`${API}/api/executions/${execution.id}`)
        const data = await response.json()

        if (!response.ok) throw new Error(data.error)

        if (active) {
          setExecution(data)

          const completedNodes = new Set(
            data.logs
              .filter((log) => log.status === 'completed')
              .map((log) => log.nodeId),
          )

          const activeNodes = new Set(
            data.logs
              .filter((log) => log.status === 'running')
              .map((log) => log.nodeId),
          )

          setNodes((current) =>
            current.map((node) => ({
              ...node,
              data: {
                ...node.data,
                status: activeNodes.has(node.id)
                  ? 'running'
                  : completedNodes.has(node.id)
                    ? 'completed'
                    : 'idle',
              },
            })),
          )

          if (['completed', 'failed'].includes(data.status)) {
            setLoading(false)
            setMessage(
              data.status === 'completed'
                ? 'Workflow completed successfully'
                : `Workflow failed: ${data.error || 'Unknown error'}`,
            )
            return
          }
        }
      } catch (error) {
        if (active) {
          setMessage(`Execution status error: ${error.message}`)
          setLoading(false)
        }
      }

      if (active) {
        setTimeout(poll, 1200)
      }
    }

    poll()

    return () => {
      active = false
    }
  }, [execution?.id])

  return (
    <main className="app">
      <header className="topbar">
        <div>
          <h1>FlowAI</h1>
          <p>Visual AI Workflow Builder</p>
        </div>

        <div className="header-actions">
          <span className="status">{message}</span>
          <button className="secondary" onClick={exportWorkflow}>
            Export JSON
          </button>

          <label className="import-button">
            Import JSON
            <input type="file" accept=".json,application/json" onChange={importWorkflow} />
          </label>

          <button onClick={addNode}>+ Add Node</button>
          <button className="run-button" onClick={runWorkflow} disabled={loading}>
            {loading ? 'Running...' : '▶ Run Workflow'}
          </button>
        </div>
      </header>

      <section className="workspace">
        <aside className="sidebar">
          <h2>Workflow Builder</h2>
          <p>Create AI-powered decision flows.</p>

          <div className="info-card">
            <span className="node-icon">AI</span>
            <div>
              <strong>Decision Node</strong>
              <p>Evaluates prompts with OpenRouter AI.</p>
            </div>
          </div>

          <div className="info-card">
            <span className="node-icon">↗</span>
            <div>
              <strong>YES / NO Branching</strong>
              <p>Two separate output connections.</p>
            </div>
          </div>

          <div className="sidebar-note">
            <strong>How to use</strong>
            <p>Click a node to edit its name and prompt.</p>
            <p>Connect YES or NO handles to another node.</p>
            <p>Press Run Workflow to execute using Inngest.</p>
          </div>

          {selectedNode && (
            <div className="editor-panel">
              <h3>Edit Decision Node</h3>

              <label>Node Name</label>
              <input
                value={selectedNode.data.label}
                onChange={(event) =>
                  updateSelectedNode('label', event.target.value)
                }
              />

              <label>AI Prompt</label>
              <textarea
                rows="5"
                value={selectedNode.data.prompt}
                onChange={(event) =>
                  updateSelectedNode('prompt', event.target.value)
                }
              />

              <button
                className="secondary full-width"
                onClick={() => setSelectedNode(null)}
              >
                Close Editor
              </button>
            </div>
          )}
        </aside>

        <div className="canvas">
          <div className="canvas-label">WORKFLOW CANVAS</div>

          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={handleNodeClick}
            fitView
          >
            <Background />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </div>

        <aside className="logs-panel">
          <h2>Execution Monitor</h2>
          <div className="execution-status">
            <span>Status</span>
            <strong>{execution?.status || 'Not Started'}</strong>
          </div>

          {execution?.id && (
            <p className="execution-id">ID: {execution.id}</p>
          )}

          <h3>Execution Logs</h3>

          <div className="logs-list">
            {execution?.logs?.length ? (
              execution.logs.map((log, index) => (
                <div className="log-item" key={`${index}-${log.timestamp}`}>
                  <span>{log.status || 'info'}</span>
                  <p>{log.message}</p>
                </div>
              ))
            ) : (
              <p className="empty-logs">Run your workflow to see execution logs.</p>
            )}
          </div>
        </aside>
      </section>
    </main>
  )
}