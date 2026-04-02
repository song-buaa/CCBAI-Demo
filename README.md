# 手机银行投后陪伴功能 Demo

### 项目概述

这是一个移动端 H5 应用，展示手机银行 APP 中的"投后陪伴"功能原型。通过 AI 理财助理为用户提供智能化的持仓解读、市场分析和投资建议，覆盖从财富首页到交易成功全链路的 AI 能力触点。

---

### 核心功能

#### 1. 财富首页 (`/home`)
- 金色主调，展示用户总资产（302,480 元）和昨日收益
- 金刚位快速入口（存款、理财、基金、保险、贵金属等）
- 第二排 Demo 导航（建行严选、基金持仓、财富全景、交易成功）
- 左上角 AI 理财助理入口

#### 2. 基金持仓页 (`/holdings`)
- 展示 10 只基金持仓，分权益类、固收类、现金类三组
- 5 只产品卡片附带 AI 提示条（市场解读 / 风险提示 / 投资锦囊）
- 点击提示条进入对应的 AI 对话场景

#### 3. 财富全景页 (`/overview`)
- 资产总览与分布，顶部 AI 提示条（组合集中度诊断）
- 资产配置结构条形图（权益 42% / 固收 48% / 现金 10%）
- 可展开的分组资产列表

#### 4. 交易成功页 (`/trade-success`)
- 申购招商中证 A500 指数 A 5,000 元场景
- 三节点交易进度时间线
- 底部 AI 分析卡片，解读本次交易对组合的影响

#### 5. 消息中心页 (`/messages`)
- 置顶：AI 理财助理 + 专属客户经理
- 时间流消息列表，4 条 AI 消息混排（持仓播报、市场解读、收益提醒等）
- 点击 AI 消息进入对应对话场景

#### 6. AI 理财助理对话页 (`/chat/:scene`)
- 统一对话界面，支持 12 个预设场景
- 建行蓝 Header（返回 + AI 图标 + 标题 + 副标题）
- 逐字打字动画 + 快捷回复按钮
- 底部输入框（展示用）+ 免责声明

#### 7. 建行严选页 (`/yanxuan`)
- 长图滚动页，3 处 AI 入口悬浮按钮
- 点击进入全屏 AI 对话弹层（树状 followUp 逻辑）
- 场景：AI 帮你选 / AI 解读黄金策略 / 收益进阶板块

---

### 技术栈

- **框架**：React 19 + Vite
- **样式**：Tailwind CSS v4（`@tailwindcss/vite` 插件）
- **路由**：React Router v7（HashRouter）
- **构建目标**：`es2015`，兼容微信内置浏览器

---

### 设计系统

#### 颜色规范
| 变量 | 色值 | 用途 |
|------|------|------|
| `--ccb-blue` | `#0066B3` | 建行标准蓝，Header / 主交互色 |
| `--ccb-gold` | `#C8973A` | 建行金，财富首页卡片 |
| `--ccb-light-blue` | `#EFF4FF` | AI 提示条背景 |
| `--ccb-red` | `#E5322D` | 收益红 |
| `--ccb-green` | `#07A063` | 回撤绿 |

#### AI 图标
全局统一使用 Lucide 风格 Sparkles 图标（大四角星 + 两个小十字星），蓝底白图（Header）/ 蓝色描边（提示条）。

---

### AI 对话系统

#### 预设场景（12 个）

**持仓页**：
- `holdings-nasdaq` — 广发纳斯达克 100 下跌解读
- `holdings-energy` — 新能源板块风险提示
- `holdings-a500` — 招商 A500 市场解读
- `holdings-dividend` — 红利低波投资锦囊
- `holdings-balanced` — 易方达平衡视野混合解读
- `holdings-bond` — 易方达稳鑫短债债市解读

**财富全景页**：
- `overview-concentration` — 组合集中度诊断

**交易成功页**：
- `trade-a500` — A500 申购后组合影响分析

**消息中心**：
- `msg-nasdaq-crash` — 纳指大跌播报
- `msg-energy-alert` — 新能源风险提示
- `msg-bond-rally` — 债市回暖提醒
- `msg-profit-milestone` — 收益里程碑

**通用入口**：
- `msg-general` — 财富首页 AI 助理通用入口

#### 对话结构
所有预设回复遵循三段式：
1. **发生了什么？** — 事实陈述
2. **是否重要？** — 风险评估
3. **可以怎么做？** — 行动建议

---

### 建行严选对话脚本

独立脚本文件 `src/data/yanxuan-scripts.js`，包含三个场景：
- `scenario1`：AI 帮你选（20+ 对话节点，涵盖黄金/债基/混合基金推荐）
- `scenario2`：AI 解读黄金策略（5 节点）
- `scenario3`：收益进阶（8 节点）

采用树状 followUp 结构，每条 AI 消息附带追问按钮，`nextKey: 'back_home'` 关闭弹层。

---

### 页面路由

| 路径 | 页面 |
|------|------|
| `/home` | 财富首页 |
| `/holdings` | 基金持仓 |
| `/overview` | 财富全景 |
| `/trade-success` | 交易成功 |
| `/messages` | 消息中心 |
| `/chat/:scene` | AI 对话（12 个场景） |
| `/yanxuan` | 建行严选 |

---

### 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产包
npm run build

# 访问应用
open http://localhost:5173
```

---

### 项目结构

```
├── src/
│   ├── pages/
│   │   ├── WealthHome.jsx        # 财富首页
│   │   ├── FundHoldings.jsx      # 基金持仓页
│   │   ├── WealthOverview.jsx    # 财富全景页
│   │   ├── TradeSuccess.jsx      # 交易成功页
│   │   ├── MessageCenter.jsx     # 消息中心页
│   │   ├── AIChat.jsx            # AI 对话页（通用）
│   │   └── YanxuanHome.jsx       # 建行严选页
│   ├── components/
│   │   ├── AIHintBar.jsx         # AI 提示条 + SparkleIcon
│   │   ├── YanxuanChat.jsx       # 建行严选全屏对话弹层
│   │   ├── BottomTab.jsx         # 底部 Tab 栏
│   │   ├── StatusBar.jsx         # 状态栏模拟
│   │   └── NavBar.jsx            # 顶部导航栏
│   ├── data/
│   │   ├── scripts.js            # 12 个通用对话场景脚本
│   │   └── yanxuan-scripts.js    # 建行严选对话脚本
│   ├── App.jsx                   # 路由配置
│   ├── main.jsx                  # 入口
│   └── index.css                 # 全局样式 + CSS 变量
├── docs/                         # 产品文档（PRD、UI规范、脚本）
├── public/
├── index.html
├── vite.config.js
└── package.json
```

---

### 关键设计原则

- **事件触发型 AI**：不是每个产品都显示 AI 提示，只有满足触发条件的才展示，避免信息过载
- **轻入口 → 深交互**：页面上是一行轻提示，点击后进入完整对话界面
- **纯静态脚本**：所有对话内容预设，无需真实 AI API，Demo 展示稳定可靠
- **统一 AI 形象**：全局一致的 Sparkles 图标 + 建行蓝配色
- **移动端优化**：最大宽度 390px，适配手机屏幕，兼容微信浏览器

---

### 免责声明

本 Demo 仅供产品展示和内部学习之用，所有数据均为模拟数据，不代表真实投资意见。
