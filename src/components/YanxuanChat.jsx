import { useState, useEffect, useRef } from 'react'
import { allConversations } from '../data/yanxuan-scripts'
import { SparkleIcon } from './AIHintBar'
import StatusBar from './StatusBar'

// 解析 Markdown：**bold**、- 列表项、*斜体风险提示*
function renderContent(content) {
  const paragraphs = content.split('\n\n')
  return paragraphs.map((paragraph, pIndex) => {
    const lines = paragraph.split('\n')
    return (
      <div key={pIndex} className={pIndex > 0 ? 'mt-3' : ''}>
        {lines.map((line, lIndex) => {
          // 列表项
          if (line.startsWith('- ')) {
            return (
              <div key={lIndex} className="flex gap-2 mt-1.5">
                <span className="text-[#0066B3] mt-1 flex-shrink-0">•</span>
                <span>{parseInline(line.slice(2))}</span>
              </div>
            )
          }
          // 斜体风险提示
          if (line.startsWith('*') && line.endsWith('*') && !line.startsWith('**')) {
            return (
              <p key={lIndex} className="text-xs text-gray-400 mt-3 pt-2 border-t border-gray-100">
                {line.slice(1, -1)}
              </p>
            )
          }
          // 普通段落
          return (
            <p key={lIndex} className={lIndex > 0 ? 'mt-1.5' : ''}>
              {parseInline(line)}
            </p>
          )
        })}
      </div>
    )
  })
}

function parseInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>
    }
    return part
  })
}

export function YanxuanChat({ scenario, onClose }) {
  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  // 初始化显示问候语
  useEffect(() => {
    setMessages([])
    setIsTyping(true)
    const timer = setTimeout(() => {
      setMessages([{
        role: 'ai',
        content: scenario.greeting.content,
        followUps: scenario.greeting.followUps,
      }])
      setIsTyping(false)
    }, 600)
    return () => clearTimeout(timer)
  }, [scenario])

  // 滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  // 处理追问点击
  const handleFollowUp = (followUp) => {
    if (followUp.nextKey === 'back_home') {
      onClose()
      return
    }

    // 添加用户消息
    setMessages(prev => [...prev, { role: 'user', content: followUp.text }])
    setIsTyping(true)

    setTimeout(() => {
      const response = followUp.nextKey
        ? (allConversations[followUp.nextKey] || scenario.conversations[followUp.nextKey])
        : null

      if (response) {
        setMessages(prev => [...prev, {
          role: 'ai',
          content: response.content,
          followUps: response.followUps,
        }])
      }
      setIsTyping(false)
    }, 800)
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-gray-50" style={{ height: '100dvh' }}>
      {/* 头部 */}
      <div className="bg-[#0066B3] flex-shrink-0">
        <StatusBar dark />
        <div className="flex items-center px-4 h-12">
          <button
            onClick={onClose}
            className="text-white p-1 -ml-1 active:opacity-70"
            aria-label="返回"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 19L8 12L15 5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <div className="flex-1 flex flex-col items-center">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                <SparkleIcon size={13} color="white" />
              </div>
              <span className="text-white text-base font-medium">{scenario.title}</span>
            </div>
            <span className="text-blue-100 text-xs mt-0.5">AI 理财助理</span>
          </div>
          {/* 占位，保持标题居中 */}
          <div className="w-6" />
        </div>
      </div>

      {/* 消息区域 */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3 no-scrollbar" style={{ WebkitOverflowScrolling: 'touch' }}>
        {messages.map((message, index) => (
          <div key={index}>
            {message.role === 'ai' ? (
              <div className="space-y-2">
                {/* AI 消息行：头像 + 气泡 */}
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#0066B3] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <SparkleIcon size={14} color="white" />
                  </div>
                  <div className="flex-1 max-w-[85%]">
                    <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                      <div className="text-sm text-gray-800 leading-relaxed">
                        {renderContent(message.content)}
                      </div>
                    </div>
                  </div>
                </div>
                {/* 追问按钮 — 垂直列表 */}
                {message.followUps && message.followUps.length > 0 && (
                  <div className="flex flex-col gap-2 pl-10">
                    {message.followUps.map((followUp, fIndex) => (
                      <button
                        key={fIndex}
                        onClick={() => handleFollowUp(followUp)}
                        className="self-start bg-gray-100 border border-gray-200 text-[#0066B3] text-xs px-4 py-2 rounded-full text-left active:bg-blue-50 active:border-[#0066B3]"
                      >
                        {followUp.text}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* 用户气泡 */
              <div className="flex justify-end">
                <div className="max-w-[75%] bg-[#0066B3] rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm">
                  <p className="text-sm text-white leading-relaxed">{message.content}</p>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* 打字指示器 */}
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

        <div ref={messagesEndRef} />
      </div>

      {/* 底部输入区域 */}
      <div className="flex-shrink-0 bg-white border-t border-gray-100 px-3 py-2">
        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2">
          <SparkleIcon size={18} color="#0066B3" className="flex-shrink-0" />
          <input
            type="text"
            placeholder="输入或按住说话…"
            className="flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder-gray-400 min-w-0"
            disabled
          />
          <button className="flex-shrink-0 active:opacity-70">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="7" y="2" width="6" height="10" rx="3" stroke="#999" strokeWidth="1.3"/>
              <path d="M4 10C4 13.3 6.7 16 10 16C13.3 16 16 13.3 16 10" stroke="#999" strokeWidth="1.3" strokeLinecap="round"/>
              <path d="M10 16V18" stroke="#999" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <p className="text-center text-[10px] text-gray-400 mt-1.5">部分内容由AI生成，不构成投资建议</p>
      </div>
    </div>
  )
}
