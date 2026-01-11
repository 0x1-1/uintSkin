# uintSkin

Electron app for managing custom League of Legends skins.

## Quick start
- Install deps: `pnpm install`
- Run in dev: `pnpm dev`
- Package Windows installer: `pnpm build:win` (outputs `dist/uintSkin-<version>-setup.exe`)

## Notes
- Builds use pnpm scripts; npm will emit warnings for unknown config keys.
- Mirrors for Electron/electron-builder can be set via `ELECTRON_MIRROR` and `ELECTRON_BUILDER_BINARIES_MIRROR` env vars if needed.
