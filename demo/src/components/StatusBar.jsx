// Simulated iOS-style status bar
export default function StatusBar({ dark = false }) {
  const textColor = dark ? 'text-white' : 'text-gray-900'
  return (
    <div className={`flex items-center justify-between px-5 pt-3 pb-1 text-xs font-medium ${textColor}`} style={{ height: 44 }}>
      <span>18:06</span>
      <div className="flex items-center gap-1">
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
          <rect x="0" y="4" width="3" height="8" rx="1" opacity="0.4"/>
          <rect x="4.5" y="2.5" width="3" height="9.5" rx="1" opacity="0.6"/>
          <rect x="9" y="0.5" width="3" height="11.5" rx="1" opacity="0.8"/>
          <rect x="13.5" y="0" width="2.5" height="12" rx="1"/>
        </svg>
        <svg width="15" height="12" viewBox="0 0 15 12" fill="currentColor">
          <path d="M7.5 2.5C9.8 2.5 11.8 3.5 13.2 5.1L14.5 3.8C12.7 1.8 10.2 0.5 7.5 0.5C4.8 0.5 2.3 1.8 0.5 3.8L1.8 5.1C3.2 3.5 5.2 2.5 7.5 2.5Z" opacity="0.4"/>
          <path d="M7.5 5.5C9 5.5 10.3 6.1 11.3 7.1L12.6 5.8C11.2 4.4 9.4 3.5 7.5 3.5C5.6 3.5 3.8 4.4 2.4 5.8L3.7 7.1C4.7 6.1 6 5.5 7.5 5.5Z" opacity="0.7"/>
          <circle cx="7.5" cy="10" r="1.5"/>
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="currentColor">
          <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="currentColor" strokeOpacity="0.35" fill="none"/>
          <rect x="2" y="2" width="17" height="8" rx="2" fill="currentColor"/>
          <path d="M23 4.5V7.5C23.8 7.2 24.5 6.4 24.5 6C24.5 5.6 23.8 4.8 23 4.5Z" fill="currentColor" opacity="0.4"/>
        </svg>
      </div>
    </div>
  )
}
