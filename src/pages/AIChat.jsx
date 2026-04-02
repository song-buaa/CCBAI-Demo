import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import { SparkleIcon } from '../components/AIHintBar'
import { SCENES } from '../data/scripts'

// Parse **bold** and \n in text
function RichText({ text }) {
  if (!text) return null
  const lines = text.split('\n')
  return (
    <div className="space-y-1">
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-1" />
        // Parse **bold**
        const parts = line.split(/(\*\*[^*]+\*\*)/)
        return (
          <p key={i} className="text-sm text-gray-800 leading-relaxed">
            {parts.map((part, j) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={j} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>
              }
              return part
            })}
          </p>
        )
      })}
    </div>
  )
}

// Typing animation wrapper
function TypingMessage({ text, onDone }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const idx = useRef(0)

  useEffect(() => {
    if (done) return
    const interval = setInterval(() => {
      idx.current += 4 // chars per tick — fast enough for demo
      if (idx.current >= text.length) {
        setDisplayed(text)
        setDone(true)
        clearInterval(interval)
        onDone && onDone()
      } else {
        setDisplayed(text.slice(0, idx.current))
      }
    }, 16)
    return () => clearInterval(interval)
  }, [text, done, onDone])

  return <RichText text={displayed} />
}

export default function AIChat() {
  const { scene } = useParams()
  const navigate = useNavigate()
  const data = SCENES[scene]

  const [messages, setMessages] = useState([])
  const [quickReplies, setQuickReplies] = useState([])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [openingDone, setOpeningDone] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  // Init: show opening message
  useEffect(() => {
    if (!data) return
    setMessages([{ id: 'opening', role: 'ai', text: data.opening, animate: true }])
    setQuickReplies([])
    setOpeningDone(false)
  }, [scene])

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleOpeningDone = () => {
    setOpeningDone(true)
    setQuickReplies(data.quickReplies || [])
  }

  const sendMessage = (text, replyKey) => {
    if (isTyping) return
    const userMsg = { id: Date.now(), role: 'user', text }
    setMessages(prev => [...prev, userMsg])
    setQuickReplies([])
    setIsTyping(true)

    setTimeout(() => {
      const aiText = replyKey && data.replies[replyKey]
        ? data.replies[replyKey]
        : '感谢您的提问。根据您的持仓情况，建议保持现有策略，密切关注市场动态。如有更多问题，欢迎继续咨询。\n\n以上分析仅供参考，不构成投资建议。'
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'ai', text: aiText, animate: true }])
      setIsTyping(false)
    }, 600)
  }

  const handleQuickReply = (qr) => {
    sendMessage(qr.label, qr.replyKey)
  }

  const handleSend = () => {
    const text = inputText.trim()
    if (!text || isTyping) return
    setInputText('')
    sendMessage(text, null)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (!data) {
    return (
      <div className="flex flex-col h-screen items-center justify-center">
        <p className="text-gray-400">场景不存在</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-[#0066B3]">返回</button>
      </div>
    )
  }

  const isLossScene = data.isLoss

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#0066B3] flex-shrink-0">
        <StatusBar dark />
        <div className="flex items-center px-4 h-12">
          <button onClick={() => navigate(-1)} className="text-white p-1 -ml-1 active:opacity-70">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 19L8 12L15 5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <div className="flex-1 flex flex-col items-center">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                <SparkleIcon size={13} color="white" />
              </div>
              <span className="text-white text-base font-medium">{data.title}</span>
            </div>
            {data.subtitle && (
              <span className="text-blue-100 text-xs mt-0.5">{data.subtitle}</span>
            )}
          </div>
          <button className="text-white p-1 active:opacity-70">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="5" r="1.5" fill="white"/>
              <circle cx="10" cy="10" r="1.5" fill="white"/>
              <circle cx="10" cy="15" r="1.5" fill="white"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Emotion banner for loss scenes */}
      {isLossScene && (
        <div className="bg-amber-50 border-b border-amber-100 px-4 py-2 flex items-center gap-2 flex-shrink-0">
          <span className="text-amber-500 text-sm">💛</span>
          <span className="text-xs text-amber-700">这种感受很正常，波动是投资的一部分。我们先冷静看一下数据。</span>
        </div>
      )}

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3" style={{ WebkitOverflowScrolling: 'touch' }}>

        {messages.map((msg) => (
          <div key={msg.id}>
            {msg.role === 'ai' ? (
              <div className="flex items-start gap-2">
                {/* AI avatar */}
                <div className="w-8 h-8 rounded-full bg-[#0066B3] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                  <SparkleIcon size={14} color="white" />
                </div>
                {/* Bubble */}
                <div className="flex-1 max-w-[85%]">
                  <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                    {msg.animate && msg.id === 'opening' ? (
                      <TypingMessage text={msg.text} onDone={handleOpeningDone} />
                    ) : msg.animate ? (
                      <TypingMessage text={msg.text} />
                    ) : (
                      <RichText text={msg.text} />
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* User bubble */
              <div className="flex justify-end">
                <div className="max-w-[75%] bg-[#0066B3] rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm">
                  <p className="text-sm text-white leading-relaxed">{msg.text}</p>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 rounded-full bg-[#0066B3] flex items-center justify-center flex-shrink-0">
              <SparkleIcon size={14} color="white" />
            </div>
            <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
              <div className="flex gap-1 items-center h-5">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        {/* Quick reply buttons — shown after opening finishes */}
        {openingDone && !isTyping && quickReplies.length > 0 && (
          <div className="flex flex-col gap-2 pl-10">
            {quickReplies.map((qr) => (
              <button
                key={qr.replyKey}
                onClick={() => handleQuickReply(qr)}
                className="self-start bg-gray-100 border border-gray-200 text-[#0066B3] text-xs px-4 py-2 rounded-full text-left active:bg-blue-50 active:border-[#0066B3]"
              >
                {qr.label}
              </button>
            ))}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div className="flex-shrink-0 bg-white border-t border-gray-100 px-3 py-2 safe-area-pb">
        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2">
          <SparkleIcon size={18} color="#0066B3" className="flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入或按住说话…"
            className="flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder-gray-400 min-w-0"
          />
          {inputText ? (
            <button
              onClick={handleSend}
              className="flex-shrink-0 w-7 h-7 rounded-full bg-[#0066B3] flex items-center justify-center active:opacity-70"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 11V3M4 6L7 3L10 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ) : (
            <button className="flex-shrink-0 active:opacity-70">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="7" y="2" width="6" height="10" rx="3" stroke="#999" strokeWidth="1.3"/>
                <path d="M4 10C4 13.3 6.7 16 10 16C13.3 16 16 13.3 16 10" stroke="#999" strokeWidth="1.3" strokeLinecap="round"/>
                <path d="M10 16V18" stroke="#999" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
            </button>
          )}
        </div>
        {/* Disclaimer */}
        <p className="text-center text-[10px] text-gray-400 mt-1.5">部分内容由AI生成，不构成投资建议</p>
      </div>
    </div>
  )
}
