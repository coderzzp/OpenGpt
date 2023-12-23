import OpenAI from 'openai'
import type { NextApiRequest, NextApiResponse } from 'next'
import { promises as fs } from 'fs'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: 'https://letsrunai.today/v1',
  //   baseURL: 'https://fast.xeduapi.com/v1',
})

export const config = {
  runtime: 'edge',
}

const handler = async (req: any, res: NextApiResponse) => {
  //   return new Response('')
  const { userInput } = await req.json()
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: userInput }],
  })
  console.log('completion', completion)
  const textReply = completion.choices[0]?.message?.content
  console.log('textReply', textReply)
  const mp3 = await openai.audio.speech.create({
    model: 'tts-1',
    voice: 'alloy',
    input: textReply as string,
  })
  return new Response(mp3.body)
}
export default handler
