import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { YanxuanChat } from '../components/YanxuanChat'
import { scenario1, scenario2, scenario3 } from '../data/yanxuan-scripts'
import { SparkleIcon } from '../components/AIHintBar'

// 按钮位置（百分比，与原版完全一致）
const BUTTON_POSITIONS = {
  entry1: { top: '0.26%', right: '2%' },
  entry2: { top: '14.2%', left: '8%', right: '8%' },
  entry3: { top: '48.40%', right: '18.5%' },
}

export default function YanxuanHome() {
  const navigate = useNavigate()
  const [activeScenario, setActiveScenario] = useState(null)

  const getScenario = (type) => {
    switch (type) {
      case 'scenario1': return scenario1
      case 'scenario2': return scenario2
      case 'scenario3': return scenario3
      default: return null
    }
  }

  const currentScenario = getScenario(activeScenario)

  return (
    <div className="relative min-h-screen bg-white">
      {/* 返回按钮（悬浮在图片上方） */}
      <button
        onClick={() => navigate('/home')}
        className="fixed top-10 left-3 z-40 w-8 h-8 rounded-full bg-black/30 flex items-center justify-center active:opacity-70"
        aria-label="返回"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M11 14L6 9L11 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* 首页长图容器 */}
      <div className="relative">
        {/* 首页长图 */}
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Picsew_20260331072543_%E5%89%AF%E6%9C%AC-iYtHPnF1iIpTu0EVryDPc1Wt9DnBxA.jpg"
          alt="建行严选首页"
          className="w-full h-auto"
        />

        {/* 入口1：右上角 AI帮你选 */}
        <button
          onClick={() => setActiveScenario('scenario1')}
          className="absolute z-10 flex items-center gap-1 px-2.5 py-1 rounded-full text-white text-base font-medium active:scale-95 transition-transform"
          style={{
            top: BUTTON_POSITIONS.entry1.top,
            right: BUTTON_POSITIONS.entry1.right,
            background: 'linear-gradient(90deg, #0066B3 0%, #0066B3E6 100%)',
            boxShadow: '0 4px 12px rgba(22,119,255,0.25)',
          }}
          aria-label="AI帮你选"
        >
          <SparkleIcon size={16} color="white" />
          <span>AI帮你选</span>
        </button>

        {/* 入口2：当月推荐卡片下方 去看看 + AI解读 */}
        <div
          style={{
            top: BUTTON_POSITIONS.entry2.top,
            left: BUTTON_POSITIONS.entry2.left,
            right: BUTTON_POSITIONS.entry2.right,
          }}
          className="absolute z-10 flex items-center gap-3"
        >
          <button className="flex-1 py-2 rounded-full text-white text-sm font-medium shadow-md active:scale-95 transition-transform"
            style={{ background: 'linear-gradient(90deg, #fb923c 0%, #f97316 100%)' }}>
            去看看
          </button>
          <button
            onClick={() => setActiveScenario('scenario2')}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-full text-white text-sm font-medium shadow-md active:scale-95 transition-transform"
            style={{ background: 'linear-gradient(90deg, #0066B3 0%, #3b82f6 100%)' }}
            aria-label="AI解读"
          >
            <SparkleIcon size={16} color="white" />
            <span>AI解读</span>
          </button>
        </div>

        {/* 入口3：收益进阶板块 AI帮你选 */}
        <button
          onClick={() => setActiveScenario('scenario3')}
          style={{
            top: BUTTON_POSITIONS.entry3.top,
            right: BUTTON_POSITIONS.entry3.right,
          }}
          className="absolute z-10 flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/95 text-[#0066B3] text-xs font-medium shadow-md border border-[#0066B3]/20 active:bg-[#0066B3] active:text-white transition-colors duration-200"
          aria-label="AI帮你选"
        >
          <SparkleIcon size={12} color="#0066B3" />
          <span>AI帮你选</span>
        </button>
      </div>

      {/* AI 对话弹层 */}
      {currentScenario && (
        <YanxuanChat
          scenario={currentScenario}
          onClose={() => setActiveScenario(null)}
        />
      )}
    </div>
  )
}
