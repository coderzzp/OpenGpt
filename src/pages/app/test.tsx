import { useRecognition } from '@/hooks/useRecognition'

import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'

const ChatBot = () => {
  // const [outputBot, setOutputBot] = useState('')
  const [lastinputYou, setLastinputYou] = useState('')
  const {
    recognition: userRecignition,
    transcript: inputYou,
    isEnd: inputIsEnd,
  } = useRecognition({
    continuous: true,
  })
  const { recognition: botRecignition, transcript: outputBot } = useRecognition(
    { continuous: true }
  )

  console.log('inputIsEnd', inputIsEnd)
  useEffect(() => {
    console.log('inputYou111', inputYou)
    console.log('inputIsEnd111', inputIsEnd)
    if (inputIsEnd && inputYou !== lastinputYou) {
      const audioContext = new AudioContext()
      setLastinputYou(inputYou)
      fetch('/api/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userInput: inputYou,
        }),
      })
        .then((response) => response.arrayBuffer())
        .then((arrayBuffer) => {
          // 创建新的 AudioContext
          // 解码音频数据
          return audioContext.decodeAudioData(arrayBuffer)
        })
        .then((audioBuffer) => {
          // 创建 AudioBufferSourceNode
          const sourceNode = audioContext.createBufferSource()
          sourceNode.buffer = audioBuffer
          console.log('sourceNode', sourceNode)
          // 连接到音频输出设备
          sourceNode.connect(audioContext.destination)
          // 播放音频
          sourceNode.start(0)
          sourceNode.onended = () => {
            console.log('音频播放完成')
            botRecignition?.stop()
            userRecignition?.start()
            // 在这里进行相应的处理
          }
          userRecignition?.stop()
          botRecignition.start()
        })
        .catch((error) => {
          // 处理错误
          console.error('音频解码失败', error)
        })
    }
  }, [inputIsEnd, inputYou])

  useEffect(() => {
    console.log('recognition22222', userRecignition)
    // userRecignition?.start()
  }, [userRecignition])

  return (
    <section>
      <button
        onClick={() => {
          console.log(2222222)
          userRecignition?.start()
        }}
      >
        <i className="fa fa-microphone"></i>
        <h1 className=" text-2xl">click to start a conversation</h1>
      </button>

      <div>
        <p>
          You said: <em className="output-you">{inputYou}</em>
        </p>
        <p>
          Bot replied: <em className="output-bot">{outputBot}</em>
        </p>
      </div>
    </section>
  )
}

export default ChatBot
