const executions = new Map()

function createExecution(id, workflowId) {
  executions.set(id, {
    id,
    workflowId,
    status: 'queued',
    logs: [],
    result: null,
    error: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })
}

function updateExecution(id, updates) {
  const current = executions.get(id)
  if (!current) return

  executions.set(id, {
    ...current,
    ...updates,
    updatedAt: new Date().toISOString(),
  })
}

function addLog(id, log) {
  const current = executions.get(id)
  if (!current) return

  current.logs.push({
    ...log,
    timestamp: new Date().toISOString(),
  })

  current.updatedAt = new Date().toISOString()
}

function getExecution(id) {
  return executions.get(id)
}

module.exports = {
  createExecution,
  updateExecution,
  addLog,
  getExecution,
}