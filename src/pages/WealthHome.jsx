import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import BottomTab from '../components/BottomTab'
import { SparkleIcon } from '../components/AIHintBar'

export default function WealthHome() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col h-screen bg-[#F5F0E8]">
      {/* Status bar */}
      <StatusBar dark={false} />

      {/* Top bar — fixed, not scrollable */}
      <div className="flex items-center px-4 pb-2 gap-2 flex-shrink-0">
        {/* AI Assistant icon */}
        <button
          onClick={() => navigate('/chat/msg-general')}
          className="flex-shrink-0 w-7 h-7 rounded-full bg-[#0066B3] flex items-center justify-center active:opacity-80 shadow-sm"
        >
          <SparkleIcon size={14} color="white" />
        </button>
        {/* Search bar */}
        <div className="flex-1 flex items-center bg-white/80 rounded-full px-3 py-2 gap-2">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="6" cy="6" r="4.5" stroke="#999" strokeWidth="1.3"/>
            <path d="M9.5 9.5L12 12" stroke="#999" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
          <span className="text-xs text-gray-400">理财方向</span>
        </div>
        {/* Message icon */}
        <button
          onClick={() => navigate('/messages')}
          className="flex-shrink-0 flex flex-col items-center active:opacity-70"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M4 4H18V15H4V4Z" stroke="#666" strokeWidth="1.5" fill="none"/>
            <path d="M7 8H15M7 11H12" stroke="#666" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
          <span className="text-[10px] text-gray-500">消息</span>
        </button>
      </div>

      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto" style={{ WebkitOverflowScrolling: 'touch' }}>

      {/* Gold asset card */}
      <div className="mx-3 mb-3 rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #C8973A 0%, #E8BF6A 50%, #C8973A 100%)' }}>
        <div className="px-5 pt-4 pb-5">
          {/* Asset title row */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-yellow-100">总资产（元）</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6" stroke="rgba(255,255,255,0.6)" strokeWidth="1"/>
                <path d="M5 7H9M7 5V9" stroke="rgba(255,255,255,0.6)" strokeWidth="1" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7C2 4.2 4.2 2 7 2C9.8 2 12 4.2 12 7C12 9.8 9.8 12 7 12" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
          {/* Main numbers */}
          <div className="flex items-end gap-8 mb-3">
            <div>
              <div className="text-3xl font-bold text-white tracking-tight">302,480.16</div>
              <div className="text-xs text-yellow-100 mt-0.5">总资产</div>
            </div>
            <div>
              <div className="text-xl font-semibold text-white flex items-center gap-1">
                <span className="text-sm">-</span>1,521.33
              </div>
              <div className="text-xs text-yellow-100 mt-0.5">昨日收益（元）</div>
            </div>
          </div>
          {/* Quick stats */}
          <div className="flex gap-2">
            <div className="flex-1 bg-white/20 rounded-lg px-3 py-1.5">
              <div className="text-xs text-yellow-100">持仓收益</div>
              <div className="text-sm font-semibold text-white">+11,888</div>
            </div>
            <div className="flex-1 bg-white/20 rounded-lg px-3 py-1.5">
              <div className="text-xs text-yellow-100">持仓收益率</div>
              <div className="text-sm font-semibold text-white">+4.09%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick nav grid — row 1 (original) */}
      <div className="mx-3 bg-white rounded-xl px-2 py-3 mb-2">
        <div className="grid grid-cols-5 gap-1">
          {[
            { label: '存款产品', icon: <BankIcon /> },
            { label: '理财产品', icon: <ChartIcon /> },
            { label: '基金投资', icon: <FundIcon /> },
            { label: '保险', icon: <ShieldIcon /> },
            { label: '贵金属', icon: <GoldIcon /> },
          ].map(item => (
            <button key={item.label} className="flex flex-col items-center gap-1 py-1 active:opacity-70">
              <div className="w-11 h-11 flex items-center justify-center">
                {item.icon}
              </div>
              <span className="text-[10px] text-gray-600">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 mx-2 my-2" />

        {/* Row 2 — Demo navigation */}
        <div className="grid grid-cols-5 gap-1">
          <NavButton label="建行严选" icon={<StarIcon />} color="#C8973A" onClick={() => navigate('/yanxuan')} />
          <NavButton label="基金持仓" icon={<HoldingsIcon />} color="#0066B3" onClick={() => navigate('/holdings')} />
          <NavButton label="财富全景" icon={<PieIcon />} color="#0066B3" onClick={() => navigate('/overview')} />
          <NavButton label="交易成功" icon={<CheckIcon />} color="#0066B3" onClick={() => navigate('/trade-success')} />
          <NavButton label="更多" icon={<MoreIcon />} color="#999999" onClick={() => {}} />
        </div>
      </div>

      {/* Wealth products section */}
      <div className="mx-3 bg-white rounded-xl overflow-hidden mb-2">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50">
          <span className="text-sm font-medium text-gray-800">财富好品</span>
          <button className="flex items-center gap-1 text-xs text-gray-400">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 2L6 10M2 6H10" stroke="#999" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            我的关注
          </button>
        </div>
        {/* Product tabs */}
        <div className="flex border-b border-gray-100">
          {['多享系列', '品牌专区', '日常钱包', '猜你喜欢'].map((tab, i) => (
            <button key={tab} className={`flex-1 py-2 text-xs ${i === 0 ? 'text-[#C8973A] border-b-2 border-[#C8973A] font-medium' : 'text-gray-400'}`}>
              {tab}
            </button>
          ))}
        </div>
        {/* Product cards */}
        <div className="grid grid-cols-2 gap-3 p-4">
          {[
            { name: '日日享', rate: '2.34%', note: '成立以来年化' },
            { name: '周周享', rate: '2.96%', note: '成立以来年化' },
            { name: '月月享', rate: '3.39%', note: '成立以来年化' },
            { name: '年年享', rate: '4.07%', note: '成立以来年化' },
          ].map(p => (
            <button key={p.name} className="border border-gray-100 rounded-xl p-3 text-left active:bg-gray-50">
              <div className="text-sm font-medium text-gray-800 mb-1">{p.name}</div>
              <div className="text-xl font-bold text-[#E5322D]">{p.rate}</div>
              <div className="text-[10px] text-gray-400 mt-0.5">{p.note}</div>
            </button>
          ))}
        </div>
      </div>

      </div>{/* end scrollable area */}

      {/* Bottom tab */}
      <BottomTab />
    </div>
  )
}

function NavButton({ label, icon, color, onClick }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1 py-1 active:opacity-70">
      <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${color}15` }}>
        <div style={{ color }}>{icon}</div>
      </div>
      <span className="text-[10px] text-gray-600">{label}</span>
    </button>
  )
}

// Simple icon SVGs
function BankIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="10" width="18" height="10" rx="1" fill="#E8BF6A" opacity="0.3"/>
    <path d="M3 10L12 4L21 10H3Z" fill="#C8973A" opacity="0.7"/>
    <rect x="7" y="13" width="3" height="4" fill="#C8973A"/>
    <rect x="14" y="13" width="3" height="4" fill="#C8973A"/>
    <rect x="3" y="20" width="18" height="1.5" rx="0.5" fill="#C8973A"/>
  </svg>
}
function ChartIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="4" y="12" width="4" height="8" rx="1" fill="#0066B3" opacity="0.5"/>
    <rect x="10" y="8" width="4" height="12" rx="1" fill="#0066B3" opacity="0.7"/>
    <rect x="16" y="4" width="4" height="16" rx="1" fill="#0066B3"/>
  </svg>
}
function FundIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="8" stroke="#07A063" strokeWidth="2" fill="none"/>
    <path d="M12 8V12L15 15" stroke="#07A063" strokeWidth="2" strokeLinecap="round"/>
  </svg>
}
function ShieldIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 3L4 7V13C4 17.4 7.6 21.5 12 22C16.4 21.5 20 17.4 20 13V7L12 3Z" fill="#FF6B35" opacity="0.2" stroke="#FF6B35" strokeWidth="1.5"/>
    <path d="M9 12L11 14L15 10" stroke="#FF6B35" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
}
function GoldIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="8" fill="#C8973A" opacity="0.2"/>
    <text x="12" y="16" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#C8973A">金</text>
  </svg>
}
function StarIcon() {
  return <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M11 2L13.5 8.5H20.5L14.8 12.5L17 19L11 15L5 19L7.2 12.5L1.5 8.5H8.5L11 2Z" fill="#C8973A" opacity="0.8"/>
  </svg>
}
function HoldingsIcon() {
  return <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <rect x="3" y="5" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M7 10H15M7 14H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M7 3V7M15 3V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
}
function PieIcon() {
  return <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M11 11L11 3C15.4 3 19 6.6 19 11H11Z" fill="currentColor" opacity="0.8"/>
    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
  </svg>
}
function CheckIcon() {
  return <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <path d="M7.5 11L10 13.5L14.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
}
function MoreIcon() {
  return <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle cx="6" cy="11" r="1.5" fill="currentColor"/>
    <circle cx="11" cy="11" r="1.5" fill="currentColor"/>
    <circle cx="16" cy="11" r="1.5" fill="currentColor"/>
  </svg>
}
