import { useEffect, useState } from 'react'

interface useSpeechRecognitionProps {
  lang?: string
  continuous?: boolean
  onEndCallback?: () => void
  onResultCallback?: () => void
}

export function useRecognition({
  lang = 'en-US',
  continuous = false,
  onEndCallback,
  onResultCallback,
}: useSpeechRecognitionProps) {
  const [recognition, setRecognition] = useState<any>(null)
  const [transcript, setTranscript] = useState('')
  const [isEnd, setIsEnd] = useState(false)
  console.log('recognition1111111', recognition)
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    setIsEnd(false)
    recognition.lang = lang
    recognition.interimResults = true
    recognition.continuous = continuous
    recognition.maxAlternatives = 1
    const handleRecognitionResult = (e: any) => {
      console.log(1111)
      let transcript = ''
      for (let i = e.resultIndex; i < e.results.length; i++) {
        console.log('e.results[i].isFinal', e.results[i].isFinal)
        // transcript += e.results[i][0].transcript
        if (e.results[i].isFinal) {
          transcript += e.results[i][0].transcript
        } else {
          transcript += e.results[i][0].transcript

          // 处理实时的部分识别结果
          // 可以将实时的部分识别结果展示在实时字幕中或进行其他操作
        }
      }
      setTranscript(transcript)
      console.log('transcript', transcript)
    }
    let timeoutId: NodeJS.Timeout | null = null
    const TIME_TO_END = 3000
    const handleEnd = () => {
      setIsEnd(true)
      onEndCallback?.()
    }
    recognition.addEventListener('result', (e) => {
      setIsEnd(false)
      timeoutId = setTimeout(handleEnd, TIME_TO_END)

      handleRecognitionResult(e)
    })
    // continuous=true的情况下不会执行
    recognition.addEventListener('end', (e) => {
      console.log('end!!!!')
      handleEnd()
      onEndCallback?.()
    })
    recognition.addEventListener('start', (e) => {
      timeoutId = setTimeout(handleEnd, TIME_TO_END)
      setIsEnd(false)
    })

    setRecognition(recognition)

    return () => {
      if (recognition) {
        recognition.stop()
      }
    }
  }, [lang, onResultCallback, onEndCallback])

  return { recognition, transcript, isEnd }
}
