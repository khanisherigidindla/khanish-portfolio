# Vercel Deployment Fixes - Buttons/Forms Not Working

## Current Status
- ✅ GitHub sync complete
- ❌ Vercel buttons broken (Experience View Details, Services Fill Form)

## Root Cause
- script.js functions exist but not loading (asset path issue)
- Mixed image paths causing 404s

## Implementation Plan (6 Steps)

### ✅ Step 1: Create TODO.md [DONE]
### ✅ Step 2: Edit index.html - Fix paths + script defer [DONE]
- Normalize skill icons: `/images/...` → `./*.png`
- `<script defer src="./script.js">`
- Consistent relative paths

### ⏳ Step 3: Create vercel.json static config [PENDING]
### ⏳ Step 4: Local test - npx serve [PENDING]
### ⏳ Step 5: Git commit/push [PENDING]
### ⏳ Step 6: Redeploy + verify [PENDING]

**Progress: 2/6 steps complete**

