import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import NavBar from '../components/NavBar'
import AIHintBar from '../components/AIHintBar'
import { HOLDINGS } from '../data/scripts'

export default function FundHoldings() {
  const navigate = useNavigate()
  const { summary, equity, fixedIncome, cash } = HOLDINGS

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#0066B3]">
        <StatusBar dark />
        <NavBar title="基金持仓" onBack={() => navigate('/home')} />
      </div>

      {/* Summary bar */}
      <div className="bg-white px-4 py-3 flex items-center justify-around border-b border-gray-100">
        <SummaryItem label="昨日收益（元）" value={summary.yesterdayReturn} isReturn />
        <div className="w-px h-8 bg-gray-100" />
        <SummaryItem label="持仓收益（元）" value={summary.totalReturn} isReturn />
        <div className="w-px h-8 bg-gray-100" />
        <SummaryItem label="持仓收益率" value={`+${summary.totalReturnRate}%`} isReturnPct />
      </div>

      {/* Scrollable list */}
      <div className="flex-1 overflow-y-auto pb-4" style={{ WebkitOverflowScrolling: 'touch' }}>

        {/* Equity section */}
        <SectionHeader label="权益类" amount="127,040" count={equity.length} />
        {equity.map((fund) => (
          <FundCard key={fund.id} fund={fund} navigate={navigate} />
        ))}

        {/* Fixed income section */}
        <SectionHeader label="固收类" amount="145,190" count={fixedIncome.length} />
        {fixedIncome.map((fund, i) => (
          <FundCard key={i} fund={fund} navigate={navigate} />
        ))}

        {/* Cash section */}
        <SectionHeader label="现金类" amount="30,250" count={cash.length} />
        {cash.map((fund, i) => (
          <CashCard key={i} fund={fund} />
        ))}
      </div>
    </div>
  )
}

function SummaryItem({ label, value, isReturn, isReturnPct }) {
  let display = value
  let colorClass = 'text-gray-800'
  if (isReturn) {
    const num = typeof value === 'number' ? value : parseFloat(value)
    const formatted = Math.abs(num).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    display = `${num >= 0 ? '+' : '-'}${formatted}`
    colorClass = num >= 0 ? 'text-[#E5322D]' : 'text-[#07A063]'
  } else if (isReturnPct) {
    colorClass = 'text-[#E5322D]'
    display = value
  }
  return (
    <div className="flex flex-col items-center gap-0.5">
      <div className="text-[10px] text-gray-400">{label}</div>
      <div className={`text-sm font-semibold ${colorClass}`}>{display}</div>
    </div>
  )
}

function SectionHeader({ label, amount, count }) {
  return (
    <div className="flex items-center justify-between px-4 py-2 mt-2">
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-gray-500">{label}</span>
        <span className="text-xs text-gray-400">共{count}只</span>
      </div>
      <span className="text-xs text-gray-500">¥{amount}</span>
    </div>
  )
}

function FundCard({ fund, navigate }) {
  const isProfit = fund.totalReturn >= 0
  const isYesterdayProfit = fund.yesterdayReturn >= 0

  return (
    <div className="mx-3 mb-2 bg-white rounded-xl overflow-hidden shadow-sm">
      <button
        onClick={() => fund.id && navigate(`/chat/${fund.id}`)}
        className="w-full px-4 pt-3 pb-2 text-left active:bg-gray-50"
      >
        {/* Fund name row */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-800 flex-1 pr-2 leading-tight">{fund.name}</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
            <path d="M6 4L10 8L6 12" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Data row */}
        <div className="grid grid-cols-3 gap-2">
          <div>
            <div className="text-xs text-gray-400 mb-0.5">持仓金额</div>
            <div className="text-sm font-medium text-gray-800">
              {fund.amount.toLocaleString('zh-CN')}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-400 mb-0.5">昨日收益</div>
            <div className={`text-sm font-medium ${isYesterdayProfit ? 'text-[#E5322D]' : 'text-[#07A063]'}`}>
              {isYesterdayProfit ? '+' : ''}{fund.yesterdayReturn.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-400 mb-0.5">持仓收益</div>
            <div className={`text-sm font-medium ${isProfit ? 'text-[#E5322D]' : 'text-[#07A063]'}`}>
              {isProfit ? '+' : ''}{fund.totalReturn.toLocaleString('zh-CN')}
            </div>
            <div className={`text-xs ${isProfit ? 'text-[#E5322D]' : 'text-[#07A063]'}`}>
              {isProfit ? '+' : ''}{fund.totalReturnRate}%
            </div>
          </div>
        </div>
      </button>

      {/* AI hint bar */}
      {fund.aiTag && (
        <div className="px-3 pb-3">
          <AIHintBar tag={fund.aiTag} text={fund.aiText} sceneId={fund.id} />
        </div>
      )}
    </div>
  )
}

function CashCard({ fund }) {
  return (
    <div className="mx-3 mb-2 bg-white rounded-xl px-4 py-3 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-800">{fund.name}</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 4L10 8L6 12" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div>
          <div className="text-xs text-gray-400 mb-0.5">持仓金额</div>
          <div className="text-sm font-medium text-gray-800">{fund.amount.toLocaleString('zh-CN')}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-400 mb-0.5">昨日收益</div>
          <div className="text-sm font-medium text-[#E5322D]">+{fund.yesterdayReturn}</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-400 mb-0.5">持仓收益</div>
          <div className="text-sm text-gray-500">年化{fund.annualRate}%</div>
        </div>
      </div>
    </div>
  )
}
