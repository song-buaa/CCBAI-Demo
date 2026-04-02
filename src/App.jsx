import { MemoryRouter, Routes, Route, Navigate } from 'react-router-dom'
import WealthHome from './pages/WealthHome'
import FundHoldings from './pages/FundHoldings'
import WealthOverview from './pages/WealthOverview'
import TradeSuccess from './pages/TradeSuccess'
import MessageCenter from './pages/MessageCenter'
import AIChat from './pages/AIChat'
import YanxuanHome from './pages/YanxuanHome'

function App() {
  return (
    <MemoryRouter initialEntries={['/home']}>
      <div className="app-shell">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<WealthHome />} />
          <Route path="/holdings" element={<FundHoldings />} />
          <Route path="/overview" element={<WealthOverview />} />
          <Route path="/trade-success" element={<TradeSuccess />} />
          <Route path="/messages" element={<MessageCenter />} />
          <Route path="/chat/:scene" element={<AIChat />} />
          <Route path="/yanxuan" element={<YanxuanHome />} />
        </Routes>
      </div>
    </MemoryRouter>
  )
}

export default App
