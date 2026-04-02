import { useNavigate } from 'react-router-dom'

export default function NavBar({ title, subtitle, dark = true, onBack }) {
  const navigate = useNavigate()
  const handleBack = onBack || (() => navigate(-1))
  const bgClass = dark ? 'bg-[#0066B3]' : 'bg-white'
  const textClass = dark ? 'text-white' : 'text-gray-900'
  const subClass = dark ? 'text-blue-100' : 'text-gray-500'

  return (
    <div className={`flex items-center px-4 h-12 ${bgClass}`}>
      <button onClick={handleBack} className={`${textClass} p-1 -ml-1 active:opacity-70`}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <div className="flex-1 text-center">
        <div className={`text-base font-medium leading-tight ${textClass}`}>{title}</div>
        {subtitle && <div className={`text-xs ${subClass}`}>{subtitle}</div>}
      </div>
      <div className="w-8" />
    </div>
  )
}
