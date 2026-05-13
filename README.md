# Zen Audio Synth
Zen Audio Synth is a wabi-sabi inspired browser instrument that turns natural material presets into a playable acoustic garden.<br/>**Zen Audio Synth 是一个受侘寂美学启发的浏览器乐器，把自然材质预设转化为可演奏的声音庭园。**
## Overview
The current repository upgrades the original single-file prototype in origin/ into a Vite + React application while preserving the original handoff source for fallback and comparison.<br/>**当前仓库已将 origin/ 中的单文件原型升级为 Vite + React 应用，同时保留原始交接源码，便于回填和对照。**
## Features
- Five preset sound assets with remix-to-custom editing, inline renaming, and overwrite save flow.<br/>**提供 5 个预设声音资产，并支持提取为自定义资产、行内重命名和覆写保存。**
- A Tone.js synthesis engine separated from React view code, with fluid color feedback driven by the selected palette.<br/>**Tone.js 合成引擎已与 React 视图层分离，流体背景颜色反馈由所选调色板驱动。**
- Architecture boundaries prepared for future Unity migration through data, engine, hook, and screen/component layers.<br/>**通过 data、engine、hook、screen/component 分层，为未来迁移到 Unity 预留了清晰边界。**
## Architecture
- src/data stores presets, palette constants, slider metadata, and UI copy.<br/>**src/data 保存预设、调色板常量、滑块元数据和界面文案。**
- src/logic/engine contains the audio playback engine and the canvas fluid renderer as pure runtime services.<br/>**src/logic/engine 包含音频播放引擎和画布流体渲染器，作为纯运行时服务。**
- src/logic/hooks coordinates editor state, palette transitions, remix/save actions, and audio lifecycle bridging.<br/>**src/logic/hooks 负责编辑器状态、调色板过渡、提取/保存动作以及音频生命周期桥接。**
- src/view keeps the UI assembly inside screens and presentational components.<br/>**src/view 将界面组装限定在 screen 和展示组件中。**
## Development
- Install dependencies with npm install.<br/>**使用 npm install 安装依赖。**
- Start the verified development server with npm run dev.<br/>**使用已经验证可启动的 npm run dev 启动开发服务器。**
- Build the verified production bundle with npm run build.<br/>**使用已经验证可通过的 npm run build 生成生产构建。**
## Deployment
- GitHub Pages is configured through GitHub Actions and expects the repository base path /ZenAudioSynth/.<br/>**GitHub Pages 通过 GitHub Actions 部署，并已按仓库名配置 /ZenAudioSynth/ 作为基路径。**
- After pushing to main, switch the repository Pages source to GitHub Actions in GitHub Settings.<br/>**推送到 main 后，请在 GitHub 仓库设置中将 Pages Source 切换为 GitHub Actions。**
- The expected public URL is https://onovich.github.io/ZenAudioSynth/.<br/>**预期公开地址为 https://onovich.github.io/ZenAudioSynth/。**
## Origin
- The untouched original prototype and handover notes remain in origin/.<br/>**未改动的原始原型和交接说明仍保留在 origin/ 目录中。**