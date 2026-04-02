import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import NavBar from '../components/NavBar'
import { SparkleIcon } from '../components/AIHintBar'

export default function TradeSuccess() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="bg-[#0066B3]">
        <StatusBar dark />
        <NavBar title="交易结果" onBack={() => navigate('/home')} />
      </div>

      <div className="flex-1 overflow-y-auto pb-6" style={{ WebkitOverflowScrolling: 'touch' }}>

        {/* Success icon + title */}
        <div className="flex flex-col items-center pt-8 pb-6 bg-white">
          <div className="w-16 h-16 rounded-full bg-[#0066B3] flex items-center justify-center mb-4 shadow-lg">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M8 16L13 21L24 11" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="text-xl font-semibold text-gray-900 mb-1">已提交申请 5,000.00元</div>
          <div className="text-sm text-gray-400">申购招商中证A500指数A（012713）</div>
        </div>

        {/* Timeline */}
        <div className="bg-white mt-2 px-5 py-4">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[7px] top-4 bottom-4 w-px bg-gray-200" />

            <TimelineStep
              active
              text="资金从账户扣除，交易申请将提交至基金公司，交易结果以基金公司确认为准"
              date="2026-04-01  17:20:00"
              note="2026-04-02 15:00前可通过[交易记录]进行撤单"
            />
            <TimelineStep text="预计基金公司确认" date="2026-04-03" />
            <TimelineStep text="预计可查看浮动盈亏" date="2026-04-04" last />
          </div>
        </div>

        {/* Feature actions */}
        <div className="bg-white mt-2">
          <ActionRow label="添加自选" type="toggle" />
          <ActionRow label="设置收益提醒" type="link" linkText="去设置" />
          <ActionRow label="关注招商基金" subtitle="专业投研，伴您财富成长" type="toggle" last />
        </div>

        {/* AI hint card */}
        <button
          onClick={() => navigate('/chat/trade-a500')}
          className="mx-3 mt-3 rounded-xl p-4 text-left w-[calc(100%-24px)] active:opacity-80"
          style={{ background: '#EFF4FF' }}
        >
          <div className="flex items-start gap-2">
            <SparkleIcon size={16} color="#0066B3" className="flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs text-gray-700 leading-relaxed">
                本次买入招商中证A500指数A后，您的QDII仓位占比从41%降至37%，组合分散度有所提升。点击查看完整持仓分析
              </p>
            </div>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 mt-0.5">
              <path d="M5 3.5L8.5 7L5 10.5" stroke="#0066B3" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
        </button>

        {/* Bottom buttons */}
        <div className="flex gap-3 px-4 mt-4">
          <button className="flex-1 h-11 border border-[#0066B3] rounded-full text-sm text-[#0066B3] font-medium active:opacity-70">
            查看交易详情
          </button>
          <button
            onClick={() => navigate('/home')}
            className="flex-1 h-11 bg-gray-800 rounded-full text-sm text-white font-medium active:opacity-70"
          >
            完成
          </button>
        </div>

      </div>
    </div>
  )
}

function TimelineStep({ active, text, date, note, last }) {
  return (
    <div className={`flex gap-4 ${!last ? 'pb-5' : ''}`}>
      {/* Dot */}
      <div className="flex flex-col items-center flex-shrink-0 mt-1">
        <div className={`w-3.5 h-3.5 rounded-full border-2 flex-shrink-0 ${
          active ? 'bg-[#0066B3] border-[#0066B3]' : 'bg-white border-gray-300'
        }`} />
      </div>
      {/* Content */}
      <div className="flex-1 pb-1">
        <p className={`text-xs leading-snug mb-1 ${active ? 'text-[#0066B3] font-medium' : 'text-gray-400'}`}>
          {text}
        </p>
        <p className={`text-xs ${active ? 'text-[#0066B3]' : 'text-gray-400'}`}>{date}</p>
        {note && (
          <div className="mt-2 border border-gray-200 rounded px-3 py-2">
            <p className="text-xs text-gray-500">{note}</p>
          </div>
        )}
      </div>
    </div>
  )
}

function ActionRow({ label, subtitle, type, linkText, last }) {
  return (
    <div className={`flex items-center justify-between px-4 py-3.5 ${!last ? 'border-b border-gray-100' : ''}`}>
      <div>
        <div className="text-sm text-gray-800">{label}</div>
        {subtitle && <div className="text-xs text-gray-400 mt-0.5">{subtitle}</div>}
      </div>
      {type === 'toggle' && (
        <div className="w-11 h-6 bg-gray-200 rounded-full relative">
          <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-sm" />
        </div>
      )}
      {type === 'link' && (
        <span className="text-sm text-[#0066B3]">{linkText}</span>
      )}
    </div>
  )
}
