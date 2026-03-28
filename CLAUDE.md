# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Vite dev server with --host (http://localhost:5173)
npm run build      # Type-check (tsc -b) + Vite production build
npm run lint       # ESLint
npm run preview    # Serve production dist locally
```

## Architecture

Single-page 3D portfolio built with React 18, TypeScript, Vite, Three.js, and GSAP.

### 3D Scene (`src/components/Character/`)

The 3D character scene uses **raw Three.js** — not React Three Fiber for scene composition. `Scene.tsx` manually creates a WebGLRenderer, Scene, Camera, and animation loop via `requestAnimationFrame`. Key utilities:

- `character.ts` — Loads an encrypted GLTF model (`public/models/character.enc`) via DRACOLoader, decrypts it, applies custom material colors, sets up shadow casting
- `animationUtils.ts` — Manages skeletal animations (intro, typing, blinking, eyebrow raise) via Three.js AnimationMixer with bone-level track filtering
- `lighting.ts` — HDR environment loading, directional + point lights
- `mouseUtils.ts` — Head bone rotation that lerp-tracks the cursor position
- `decrypt.ts` — Model file decryption

### Scroll Animations (`src/components/utils/`)

- `GsapScroll.ts` — Three GSAP ScrollTrigger timelines that drive character rotation, camera movement, and material opacity changes synced to scroll position
- `splitText.ts` / `initialFX.ts` — Text reveal and initial load animations

### Page Sections

`MainContainer.tsx` composes all sections. `CharacterModel` and `TechStack` are lazy-loaded via `React.lazy`. On mobile (<1024px), the 3D character is hidden.

### State Management

`LoadingProvider` (context) tracks global loading state with progress percentage during model load.

### Styling

Component-scoped CSS files in `src/components/styles/`. No CSS framework — vanilla CSS with responsive breakpoints at 1024px.

## Key Patterns

- Three.js scene lifecycle managed in `useEffect` with cleanup (dispose renderer, remove listeners)
- GSAP ScrollTrigger with `scrub: true` for scroll-linked animations
- Encrypted 3D model assets in `/public/models/`
- DRACO-compressed meshes with decoder files in `/public/draco/`
- Responsive: desktop renders 3D character, mobile hides it
