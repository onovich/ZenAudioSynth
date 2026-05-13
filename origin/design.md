📂 项目交接文档 (Project Handover Document)

1. 项目基础信息 (Project Overview)

中文名称： 侘寂之声

英文名称： Zen Audio Synth

项目定位： 一款极简、现代、带有日式侘寂（Wabi-Sabi）美学与疗愈（Zen/Chill）属性的实验性网页音频合成器。

核心架构： 基于 Web Audio API (Tone.js) 的单文件（Single-file）前端应用。

2. 需求设计文档 (Requirements & Design Document)

2.1 核心产品理念

系统不直接向普通用户暴露复杂的物理声学参数，而是提供一种“声音盆景”的体验。通过“中等粒度”的自然界声音资产（如木头、水滴、沙流）作为交互起点，允许高阶用户向下“解构”并探索物理波形的奥秘。

2.2 核心功能模块 (Core Features)

资产花园 (Asset Garden)： 以有机形态的几何体展示预设声音资产（空钵、朽木、流沙、露滴、纸息）。

动态联觉系统 (Synesthesia Engine)： 触发音频时，底层 Canvas 背景会根据该声音的“色彩属性”进行流体插值渐变，声音结束后缓慢回落至默认灰度。

声音解构面板 (Deconstruct Panel)： 提供经典模拟合成器风格的 UI，将自然声音拆解为 11 个核心物理参数。

重构与自定义 (Remix & Customization)： 支持将预设资产提取（Remix）为自定义资产。自定义资产支持实时调参、覆写保存以及点击标题进行行内重命名。

2.3 声学资产逻辑 (Acoustic Logic)

声音的生成遵循“底层原子波形 + 塑形参数”的公式：

波形混音 (Source Mix)： Noise (白/粉噪), Impulse (脉冲), Sine (正弦波), FM (频率调制), Saw (锯齿波)。

声音塑形 (Shape & Tone)： Freq (基频), Filter (全局低通滤波), ADSR (Attack 起音, Decay 衰减, Sustain 保持, Release 释放)。

3. 技术文档 (Technical Document)

3.1 技术栈 (Tech Stack)

核心语言： HTML5, CSS3, Vanilla JavaScript (ES6+)。

音频引擎： Tone.js (v14.8.49) - 用于处理精准的时序、波形生成和效果器链。

视觉渲染： HTML5 <canvas> 2D API (流体渐变) + CSS backdrop-filter (磨砂玻璃) + SVG Filter (全局纸质噪点)。

样式框架： Tailwind CSS (通过 CDN 引入，用于快速布局结构)，结合原生 CSS (用于复杂动画和自定义滑块)。

3.2 核心模块说明

initAudio(): 音频上下文初始化。包含一个 Master Volume (主音量)、Reverb (混响效果器)、Global Filter (全局滤波器)，以及 5 个基础合成器实例（Tone.Synth, Tone.FMSynth, Tone.MembraneSynth, Tone.NoiseSynth）。

drawFluid(): 基于 requestAnimationFrame 的画布渲染循环。使用数学函数 (Math.sin, Math.cos) 计算随时间变化的径向渐变（Radial Gradient）坐标，实现无需 WebGL 的有机流体动画。

playSound(assetData): 音频触发控制器。读取资产的 params，将其映射到 5 个底层合成器的音量、频率和包络上，并同时触发背景颜色的状态变更。

状态管理：

presets: 只读的系统预设数组。

customAssets: 用户创建的自定义资产数组。

state.editingAsset: 当前正在被解构/编辑的资产深拷贝（Deep Copy），确保在点击“保存”前不污染原数据。

4. 启动指南 (Startup Guide)

本项目采用零构建 (Zero-build) 架构，对开发环境要求极低。

文件说明： 所有代码（HTML、Tailwind 引用、自定义 CSS、JS 逻辑）均封装在唯一的 index.html 文件中。

运行方式：

直接在现代浏览器（Chrome, Safari, Edge）中双击打开 index.html。

注意： 由于浏览器的自动播放策略（Autoplay Policy），页面加载后需由用户进行第一次物理交互（点击屏幕中央的 [ 触碰以苏醒 ]）才能激活 Tone.js 的 AudioContext。

后续开发建议： 如果未来需要引入外部音频采样文件（.wav 或 .mp3），由于跨域限制（CORS），必须通过本地服务器运行（例如使用 VS Code 的 Live Server 插件，或运行 python -m http.server）。目前纯代码合成版本无此限制。

5. 美术与视觉约束 (Art & Aesthetic Constraints)

⚠️ 极其重要：接手此项目的 AI 请严格遵循以下审美约束，任何 UI 的新增或修改都不得破坏“侘寂”基调。

5.1 视觉情绪板 (Mood Board)

Chill、极简 (Minimalist)、禅意 (Zen)、放松、高级感、日式侘寂、物理模拟感。

5.2 色彩规范 (Color Palette)

绝对禁止： 任何高饱和度霓虹色、纯黑 (#000000)、纯白 (#FFFFFF)。

背景主色： 温暖的骨白色/亚麻色 (#EAE7E0)。

文本颜色： 柔和的深灰 (#4A4A4A) 和浅灰 (#8A8A8A)。

流体调色板 (和色系)： 枯木褐 (#7A6B5D)、青苔绿 (#8A9A86)、沙石米黄 (#D4C4A8)、水滴灰蓝 (#A0B4B7)。颜色变化必须通过 lerpColor 进行极慢速的插值过渡。

5.3 排版与字体 (Typography)

主标题/强调语： 使用 Cormorant Garamond (Serif 衬线体)，搭配 italic (斜体) 和极宽的字间距 (tracking-widest)，营造诗意与文学感。

界面 UI 字体： 使用 Inter (Sans-serif 无衬线体)，保持功能性文本的极简与现代感。英文全部使用 uppercase 配合宽间距。

5.4 形态与质感 (Shapes & Textures)

有机的形状： 避免尖锐的直角。资产图标（Orb）使用 CSS @keyframes morph 配合复杂的 border-radius 实现类似水滴或细胞的缓慢呼吸形变。

纸张/胶片质感： 全局覆盖一个透明度极低 (0.12) 的 SVG 湍流噪声（Fractal Noise），混合模式为 multiply。修改 UI 时不得遮挡或破坏此全局滤镜层。

模拟合成器 UI： 下方的解构面板需克制。滑块使用细线条和极简的圆形推子（Thumb），不得使用任何拟物化的 3D 阴影，仅通过半透明的磨砂玻璃 (backdrop-filter) 来区分层级。

End of Document.