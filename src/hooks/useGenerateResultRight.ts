import { loadOpenAIKey } from '@/utils/localData'
import { GenerateApiInput } from '@/utils/types'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { loadLicenseKey } from './../utils/localData'

export const useGenerateResult = () => {
  const router = useRouter()
  const [generatedResults, setGeneratedResults] = useState<string>('')
  const [result, setResult] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      console.log('generatedResults222', generatedResults)
      setResult(generatedResults)
    }
  }, [isLoading, generatedResults])

  async function generate(body: GenerateApiInput) {
    setGeneratedResults('')
    setIsLoading(true)
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...body,
        userKey: loadLicenseKey() || loadOpenAIKey(),
      }),
    })

    if (!response.ok) {
      if (response.status === 429) {
        toast(`今日免费额度已用尽，购买更多使用次数功能正加紧开发中`, {
          icon: '🔴',
        })
        // router.push('/usage')
        return
      } else if (response.status === 439) {
        toast('License key 不合法或次数已耗尽', { icon: '🔴' })
        // router.push('/usage')
      } else {
        throw new Error(response.statusText)
      }
    }

    // This data is a ReadableStream
    const data = response.body
    if (!data) {
      return
    }

    const reader = data.getReader()
    const decoder = new TextDecoder()
    let done = false

    while (!done) {
      console.log('done111', done)
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      const chunkValue = decoder.decode(value)
      setGeneratedResults((prev) => prev + chunkValue)
    }
    setIsLoading(false)
  }

  return { generatedResults: result, generate }
}
