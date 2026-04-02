import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import { SparkleIcon } from '../components/AIHintBar'
import { MESSAGES } from '../data/scripts'

export default function MessageCenter() {
  const navigate = useNavigate()

  const aiMessages = MESSAGES.filter(m => m.type === 'ai')
  const sysMessages = MESSAGES.filter(m => m.type === 'system')

  // Merge and sort for timeline display
  const timelineMessages = MESSAGES.filter(m => m.id !== 'msg-general')

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <StatusBar dark={false} />
        {/* Header */}
        <div className="flex items-center justify-between px-4 pb-3">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-gray-600 active:opacity-70">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <span className="text-base font-medium text-gray-900">消息</span>
          <div className="flex items-center gap-3">
            <button className="text-xs text-gray-500 active:opacity-70">一键已读</button>
            <button className="active:opacity-70">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="5" r="1.5" fill="#666"/>
                <circle cx="10" cy="10" r="1.5" fill="#666"/>
                <circle cx="10" cy="15" r="1.5" fill="#666"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ WebkitOverflowScrolling: 'touch' }}>

        {/* Pinned: AI Assistant */}
        <button
          onClick={() => navigate('/chat/msg-general')}
          className="w-full flex items-center gap-3 px-4 py-4 bg-white border-b border-gray-100 active:bg-gray-50"
        >
          <div className="w-10 h-10 rounded-full bg-[#0066B3] flex items-center justify-center flex-shrink-0">
            <SparkleIcon size={20} color="white" />
          </div>
          <div className="flex-1 text-left">
            <div className="text-sm font-medium text-gray-900">AI理财助理</div>
            <div className="text-xs text-gray-400 mt-0.5 leading-snug">
              您好，我是您的AI理财助理，随时为您提供专业的理财分析与建议
            </div>
          </div>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 3.5L8.5 7L5 10.5" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Pinned: Human advisor */}
        <div className="flex items-center gap-3 px-4 py-4 bg-white border-b border-gray-100">
          <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-[#4B5563]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="3.5" fill="white"/>
              <path d="M5 20C5 16.4 8.1 13.5 12 13.5C15.9 13.5 19 16.4 19 20" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="flex-1 text-left">
            <div className="text-sm font-medium text-gray-900">客户经理</div>
            <div className="text-xs text-gray-400 mt-0.5">我是您的专属客户经理，欢迎咨询</div>
          </div>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 3.5L8.5 7L5 10.5" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Timeline message list */}
        {timelineMessages.map((msg) => (
          msg.type === 'ai' ? (
            <AIMessageRow key={msg.id} msg={msg} navigate={navigate} />
          ) : (
            <SysMessageRow key={msg.id} msg={msg} />
          )
        ))}

      </div>
    </div>
  )
}

function AIMessageRow({ msg, navigate }) {
  return (
    <button
      onClick={() => navigate(`/chat/${msg.id}`)}
      className="w-full flex items-start gap-3 px-4 py-4 bg-white border-b border-gray-100 active:bg-gray-50"
    >
      {/* AI avatar with optional badge */}
      <div className="relative flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-[#0066B3] flex items-center justify-center">
          <SparkleIcon size={18} color="white" />
        </div>
        {msg.isUrgent && (
          <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-[#E5322D] rounded-full border border-white" />
        )}
      </div>
      <div className="flex-1 text-left">
        <div className="flex items-center justify-between mb-0.5">
          <span className="text-sm font-medium text-gray-900">{msg.category}</span>
          <span className="text-xs text-gray-400">{msg.date}</span>
        </div>
        <div className="text-xs text-gray-500 leading-snug line-clamp-2">{msg.preview}</div>
      </div>
    </button>
  )
}

function SysMessageRow({ msg }) {
  return (
    <div className="flex items-start gap-3 px-4 py-4 bg-white border-b border-gray-100">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white text-base"
        style={{ background: msg.iconBg }}
      >
        {typeof msg.icon === 'string' && msg.icon.length <= 2 ? msg.icon : (
          <span className="text-sm font-bold">¥</span>
        )}
      </div>
      <div className="flex-1 text-left">
        <div className="flex items-center justify-between mb-0.5">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-900">{msg.category}</span>
            {msg.isTop && (
              <span className="text-[10px] text-[#E5322D] border border-[#E5322D] px-1 rounded">置顶</span>
            )}
          </div>
          <span className="text-xs text-gray-400">{msg.date}</span>
        </div>
        <div className="text-xs text-gray-500">{msg.preview}</div>
      </div>
    </div>
  )
}
