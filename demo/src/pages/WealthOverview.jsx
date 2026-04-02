import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import NavBar from '../components/NavBar'
import { SparkleIcon } from '../components/AIHintBar'

export default function WealthOverview() {
  const navigate = useNavigate()
  const [fundExpanded, setFundExpanded] = useState(false)

  const funds = [
    { name: '广发纳斯达克100ETF联接(QDII)C', amount: '52,600', totalReturn: '+7,480', yesterdayReturn: '-1,588', isNeg: false },
    { name: '南方红利低波50ETF联接A', amount: '28,400', totalReturn: '+2,472', yesterdayReturn: '+284', isNeg: false },
    { name: '易方达平衡视野混合A', amount: '20,200', totalReturn: '-768', yesterdayReturn: '-61', isNeg: true },
    { name: '招商中证A500指数A', amount: '15,800', totalReturn: '+632', yesterdayReturn: '+95', isNeg: false },
    { name: '景顺长城新能源产业股票A', amount: '10,040', totalReturn: '-1,806', yesterdayReturn: '-50', isNeg: true },
    { name: '易方达稳鑫30天滚动持有短债债券A', amount: '60,200', totalReturn: '+1,445', yesterdayReturn: '+33', isNeg: false },
    { name: '华泰柏瑞中证同业存单AAA指数7天持有期', amount: '42,800', totalReturn: '+856', yesterdayReturn: '+23', isNeg: false },
    { name: '建信中短债纯债C', amount: '17,190', totalReturn: '+309', yesterdayReturn: '+9', isNeg: false },
  ]

  const visibleFunds = fundExpanded ? funds : funds.slice(0, 3)

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="bg-[#0066B3]">
        <StatusBar dark />
        <NavBar title="账户总览" onBack={() => navigate('/home')} />
      </div>

      <div className="flex-1 overflow-y-auto pb-6" style={{ WebkitOverflowScrolling: 'touch' }}>

        {/* AI hint bar */}
        <button
          onClick={() => navigate('/chat/overview-concentration')}
          className="flex items-center gap-2 px-4 py-3 bg-white border-b border-gray-100 w-full text-left active:bg-gray-50"
        >
          <SparkleIcon size={14} color="#0066B3" className="flex-shrink-0" />
          <span className="text-xs text-gray-600 flex-1 leading-snug">
            您的权益仓位里QDII基金占比41%，当前海外市场波动较大，组合风险值得关注
          </span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="flex-shrink-0">
            <path d="M4.5 3L7.5 6L4.5 9" stroke="#0066B3" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Total asset card */}
        <div className="bg-[#0066B3] px-4 py-4">
          <div className="flex items-center gap-1 mb-1">
            <span className="text-xs text-blue-100">总资产（元）</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="rgba(255,255,255,0.5)">
              <circle cx="6" cy="6" r="5" stroke="rgba(255,255,255,0.6)" strokeWidth="1" fill="none"/>
              <text x="6" y="9" textAnchor="middle" fontSize="7" fill="white">i</text>
            </svg>
          </div>
          <div className="text-2xl font-bold text-white mb-3">302,480.16</div>
          <div className="flex items-center gap-4">
            <div>
              <div className="text-xs text-blue-100">总负债（元）</div>
              <div className="text-base font-semibold text-white">0</div>
            </div>
            <div className="w-px h-8 bg-blue-300/40" />
            <div>
              <div className="text-xs text-blue-100">昨日收益（元）</div>
              <div className="text-base font-semibold text-green-300">-1,521.33</div>
            </div>
          </div>
        </div>

        {/* Asset allocation bar */}
        <div className="bg-white mx-3 mt-3 rounded-xl p-4 shadow-sm">
          <div className="text-xs font-medium text-gray-500 mb-3">资产配置概览</div>
          <div className="flex rounded-full overflow-hidden h-3 mb-3">
            <div className="bg-[#0066B3]" style={{ width: '42%' }} />
            <div className="bg-[#07A063]" style={{ width: '48%' }} />
            <div className="bg-[#C8973A]" style={{ width: '10%' }} />
          </div>
          <div className="flex justify-around text-center">
            <LegendItem color="#0066B3" label="权益类" pct="42%" amt="127,040" />
            <LegendItem color="#07A063" label="固收类" pct="48%" amt="145,190" />
            <LegendItem color="#C8973A" label="现金类" pct="10%" amt="30,250" />
          </div>
        </div>

        {/* 活钱 */}
        <GroupCard title="活钱" total="30,251.62">
          <AssetRow name="龙钱宝1号" amount="30,250.00" sub="昨日收益 +1.62" />
          <AssetRow name="活期存款" amount="1.62" sub="" last />
        </GroupCard>

        {/* 投资-理财 */}
        <GroupCard title="理财" total="25,875.00">
          <AssetRow
            name="招银理财招睿稳健成长一年定开1号"
            amount="25,000.00"
            sub="持仓收益 +875"
            last
          />
        </GroupCard>

        {/* 投资-基金 */}
        <GroupCard title="基金" total="176,667.00">
          {visibleFunds.map((f, i) => (
            <AssetRow
              key={i}
              name={f.name}
              amount={f.amount}
              sub={`持仓收益 ${f.totalReturn}`}
              sub2={`昨日 ${f.yesterdayReturn}`}
              isNeg={f.isNeg}
              last={i === visibleFunds.length - 1 && fundExpanded}
            />
          ))}
          {!fundExpanded && (
            <button
              onClick={() => setFundExpanded(true)}
              className="w-full py-2 text-xs text-[#0066B3] text-center border-t border-gray-50 active:bg-gray-50"
            >
              查看更多 &gt;
            </button>
          )}
        </GroupCard>

        {/* 债券 */}
        <GroupCard title="债券" total="103.56">
          <AssetRow name="21债信04" amount="103.56" sub="月均收益" last />
        </GroupCard>

        {/* 个人养老金 */}
        <GroupCard title="个人养老金" total="13,374.12">
          <AssetRow name="专项基金" amount="7,203.56" sub="" />
          <AssetRow name="专项理财" amount="6,169.70" sub="" />
          <AssetRow name="可用余额" amount="0.86" sub="" last />
        </GroupCard>

      </div>
    </div>
  )
}

function LegendItem({ color, label, pct, amt }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <div className="flex items-center gap-1">
        <div className="w-2 h-2 rounded-full" style={{ background: color }} />
        <span className="text-xs text-gray-500">{label}</span>
      </div>
      <span className="text-sm font-semibold text-gray-800">{pct}</span>
      <span className="text-xs text-gray-400">¥{amt}</span>
    </div>
  )
}

function GroupCard({ title, total, children }) {
  return (
    <div className="mx-3 mt-3 bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50">
        <span className="text-sm font-medium text-gray-700">{title}</span>
        <span className="text-sm font-semibold text-gray-800">{total}</span>
      </div>
      {children}
    </div>
  )
}

function AssetRow({ name, amount, sub, sub2, isNeg, last }) {
  return (
    <div className={`flex items-center justify-between px-4 py-3 ${!last ? 'border-b border-gray-50' : ''}`}>
      <div className="flex-1 pr-2">
        <div className="text-xs text-gray-700 leading-tight">{name}</div>
        {sub && (
          <div className={`text-xs mt-0.5 ${isNeg ? 'text-[#07A063]' : 'text-[#07A063]'} ${sub.includes('+') ? 'text-[#E5322D]' : ''}`}>
            {sub}
          </div>
        )}
      </div>
      <div className="text-right">
        <div className="text-sm font-medium text-gray-800">{amount}</div>
        {sub2 && (
          <div className={`text-xs ${sub2.includes('+') ? 'text-[#E5322D]' : 'text-[#07A063]'}`}>{sub2}</div>
        )}
      </div>
    </div>
  )
}
