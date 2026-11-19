require('dotenv').config()

const express = require('express')
const cors = require('cors')
const { serve } = require('inngest/express')
const { randomUUID } = require('crypto')

const { inngest } = require('./inngest')
const { workflowRunner } = require('./workflow')
const {
  createExecution,
  getExecution,
} = require('./executionStore')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
}))
app.use(express.json({ limit: '2mb' }))

app.use(
  '/api/inngest',
  serve({
    client: inngest,
    functions: [workflowRunner],
  }),
)

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'FlowAI backend is running',
  })
})

app.post('/api/workflow/start', async (req, res) => {
  try {
    const { workflow } = req.body

    if (!workflow || !Array.isArray(workflow.nodes) || !Array.isArray(workflow.edges)) {
      return res.status(400).json({ error: 'Invalid workflow data' })
    }

    if (!workflow.nodes.length) {
      return res.status(400).json({ error: 'Add at least one node' })
    }

    const executionId = randomUUID()

    createExecution(executionId, workflow.id || 'flowai-workflow')

    await inngest.send({
      name: 'flowai/workflow.started',
      data: {
        executionId,
        workflow,
      },
    })

    res.status(202).json({
      message: 'Workflow execution queued',
      executionId,
    })
  } catch (error) {
    console.error('Workflow start error:', error)
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/executions/:id', (req, res) => {
  const execution = getExecution(req.params.id)

  if (!execution) {
    return res.status(404).json({ error: 'Execution not found' })
  }

  res.json(execution)
})

app.listen(PORT, () => {
  console.log(`FlowAI backend running at http://localhost:${PORT}`)
})