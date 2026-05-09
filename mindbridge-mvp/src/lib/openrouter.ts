import OpenAI from 'openai';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '';
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';

export const openrouter = new OpenAI({
  baseURL: OPENROUTER_BASE_URL,
  apiKey: OPENROUTER_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': 'https://mindbridge-africa.vercel.app',
    'X-Title': 'MindBridge',
  },
});

// Culturally calibrated system prompt for African university students
const SYSTEM_PROMPT = `You are MindBridge AI, a compassionate peer supporter for African university students. 

GUIDELINES:
- Use warm, validating language without clinical jargon
- Acknowledge unique stressors: HELB loans, exam pressure, family expectations, financial constraints
- Respect cultural contexts: collectivist values, spiritual coping, community support
- Never diagnose - always validate and support
- If crisis keywords detected (suicide, self-harm), gently suggest professional help
- Use simple English or Swahili phrases when appropriate ("Pole sana", "Uko sawa")
- Keep responses concise and mobile-friendly

TONE:
- Warm like an older sibling
- Understanding without toxic positivity
- Culturally aware and respectful
- Non-judgmental and safe`;

export async function generateResponse(messages: any[]) {
  try {
    const completion = await openrouter.chat.completions.create({
      model: 'mistralai/mistral-7b-instruct:free',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 500,
      stream: false,
    });

    return {
      content: completion.choices[0].message.content || '',
      model: completion.model,
      usage: completion.usage,
    };
  } catch (error) {
    console.error('OpenRouter API error:', error);
    throw new Error('Failed to generate AI response');
  }
}

export async function generateStreamedResponse(messages: any[]) {
  // For future streaming implementation
  return generateResponse(messages);
}
