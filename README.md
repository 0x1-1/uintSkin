# uintSkin

League of Legends skin manager. Electron code is still present, but the app now has a Tauri scaffold and a renderer shim so you can start running it under Tauri while we continue porting functionality.

## Quick start
- Install deps: `pnpm install`
- Run Tauri dev: `pnpm tauri:dev` (starts Vite on :1420 and launches the Tauri window)
- Build Tauri bundle: `pnpm tauri:build`

## Notes
- The renderer runs via Vite (`vite.config.ts`) and exposes a stubbed `window.api` in `src/renderer/src/tauri-api.ts` to keep the UI working without Electron IPC. Most native functionality is still TODO.
- Electron-specific scripts remain removed from `package.json`; Tauri commands live under `pnpm tauri:*`.
