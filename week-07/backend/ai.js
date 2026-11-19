
const OpenAI = require('openai')

const MODEL =
  process.env.OPENROUTER_MODEL ||
  'meta-llama/llama-3.3-70b-instruct:free'

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
  defaultHeaders: {
    'HTTP-Referer': 'http://localhost:5173',
    'X-Title': 'FlowAI Workflow Builder',
  },
})

async function evaluateDecision(prompt, context = '') {
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error('OPENROUTER_API_KEY is missing in backend .env')
  }

  if (!prompt || typeof prompt !== 'string') {
    throw new Error('A valid AI decision prompt is required')
  }

  console.log('OpenRouter model:', MODEL)
  console.log(
    'OpenRouter API key loaded:',
    Boolean(process.env.OPENROUTER_API_KEY),
  )

  try {
    const response = await client.chat.completions.create({
      model: MODEL,
      temperature: 0,
      max_tokens: 10,
      messages: [
        {
          role: 'system',
          content:
            'You are a workflow decision engine. Evaluate the decision prompt and context. Reply with exactly one word: YES or NO. Do not explain.',
        },
        {
          role: 'user',
          content: `Decision prompt: ${prompt}\n\nContext: ${context}`,
        },
      ],
    })

    const answer = response.choices?.[0]?.message?.content
      ?.trim()
      .toUpperCase()

    // Accept only a clear YES or NO response.
    if (answer === 'YES') return 'YES'
    if (answer === 'NO') return 'NO'

    throw new Error(
      `AI returned an invalid decision: ${answer || 'empty response'}`,
    )
  } catch (error) {
    console.error('OpenRouter request failed:', {
      status: error.status,
      message: error.message,
      model: MODEL,
    })

    if (error.status === 402) {
      throw new Error(
        'OpenRouter credits are insufficient or this model requires credits. Check your OpenRouter account.',
      )
    }

    if (error.status === 401) {
      throw new Error(
        'OpenRouter API key is invalid. Check OPENROUTER_API_KEY in .env.',
      )
    }

    if (error.status === 404) {
      throw new Error(
        `OpenRouter model not found or unavailable: ${MODEL}`,
      )
    }

    throw new Error(`AI decision failed: ${error.message}`)
  }
}

module.exports = { evaluateDecision }
