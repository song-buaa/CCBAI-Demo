import { useNavigate } from 'react-router-dom'

const TAG_COLORS = {
  '市场解读': 'text-[#0066B3]',
  '风险提示': 'text-[#E5322D]',
  '投资锦囊': 'text-[#07A063]',
  '收益提醒': 'text-[#C8973A]',
}

export default function AIHintBar({ tag, text, sceneId, className = '' }) {
  const navigate = useNavigate()
  const tagColor = TAG_COLORS[tag] || 'text-[#0066B3]'

  return (
    <button
      onClick={() => navigate(`/chat/${sceneId}`)}
      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left active:opacity-70 ${className}`}
      style={{ background: '#EFF4FF' }}
    >
      <SparkleIcon size={14} color="#0066B3" className="flex-shrink-0" />
      <span className={`text-xs font-semibold ${tagColor} flex-shrink-0`}>{tag}</span>
      <span className="text-xs text-gray-600 truncate flex-1">{text}</span>
      <ChevronIcon />
    </button>
  )
}

export function SparkleIcon({ size = 16, color = '#0066B3', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
      <path d="M20 3v4"/>
      <path d="M22 5h-4"/>
      <path d="M4 17v2"/>
      <path d="M5 18H3"/>
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="flex-shrink-0">
      <path d="M4.5 3L7.5 6L4.5 9" stroke="#0066B3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
