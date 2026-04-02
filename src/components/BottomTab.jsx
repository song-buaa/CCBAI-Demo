import { useNavigate, useLocation } from 'react-router-dom'

const TABS = [
  { path: '/', label: '首页', icon: HomeIcon },
  { path: '#', label: '信用卡', icon: CreditCardIcon },
  { path: '/home', label: '财富', icon: WealthIcon, active: ['/home', '/holdings', '/overview', '/trade-success'] },
  { path: '#', label: '生活', icon: LifeIcon },
  { path: '#', label: '我的', icon: MeIcon },
]

export default function BottomTab() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="flex items-center justify-around bg-white border-t border-gray-100 h-14 safe-area-pb">
      {TABS.map((tab) => {
        const isActive = tab.active
          ? tab.active.some(p => location.pathname.startsWith(p))
          : location.pathname === tab.path
        const Icon = tab.icon
        return (
          <button
            key={tab.label}
            onClick={() => tab.path !== '#' && navigate(tab.path)}
            className={`flex flex-col items-center gap-0.5 px-4 py-1 active:opacity-70 ${isActive ? 'text-[#0066B3]' : 'text-gray-400'}`}
          >
            <Icon active={isActive} />
            <span className="text-[10px]">{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}

function HomeIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M3 9.5L11 3L19 9.5V19H14V14H8V19H3V9.5Z"
        stroke="currentColor" strokeWidth="1.8" fill={active ? 'currentColor' : 'none'} strokeLinejoin="round"/>
    </svg>
  )
}

function WealthIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="3" y="6" width="16" height="13" rx="2" stroke="currentColor" strokeWidth="1.8" fill={active ? 'currentColor' : 'none'}/>
      <path d="M7 6V5C7 3.9 7.9 3 9 3H13C14.1 3 15 3.9 15 5V6" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M3 11H19" stroke={active ? 'white' : 'currentColor'} strokeWidth="1.8"/>
    </svg>
  )
}

function LifeIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.8" fill={active ? 'currentColor' : 'none'}/>
      <path d="M11 7V11L14 14" stroke={active ? 'white' : 'currentColor'} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )
}

function CreditCardIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="2" y="5" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" fill={active ? 'currentColor' : 'none'}/>
      <path d="M2 9H20" stroke={active ? 'white' : 'currentColor'} strokeWidth="1.8"/>
      <rect x="5" y="13" width="4" height="1.5" rx="0.75" fill={active ? 'white' : 'currentColor'}/>
    </svg>
  )
}

function MeIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" fill={active ? 'currentColor' : 'none'}/>
      <path d="M4 19C4 15.7 7.1 13 11 13C14.9 13 18 15.7 18 19"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )
}
