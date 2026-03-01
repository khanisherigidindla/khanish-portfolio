# Asset Setup Instructions for Vercel Deployment

## What I've Fixed:

1. ✅ Updated all image paths in `index.html` to use `/images/` prefix (correct for Vercel)
2. ✅ Created `public/images/` directory structure
3. ✅ Updated Vite configuration to properly handle public assets
4. ✅ Added `vercel.json` for proper Vercel configuration
5. ✅ Added `.vercelignore` to optimize build

## What You Need to Do:

### Move These Files to `public/images/` Folder:

```
From: c:\Users\khani\Documents\Portfolio_website\
To:   c:\Users\khani\Documents\Portfolio_website\public\images\

Files to move:
- dp-pic.jpg  →  public/images/dp-pic.jpg
- thank-you.png  →  public/images/thank-you.png
- beach.jpg  →  public/images/beach.jpg (if used)
```

### Move Resume to `public/` Folder:

```
From: c:\Users\khani\Documents\Portfolio_website\KHANISH_RESUME___Fresher_2025.pdf
To:   c:\Users\khani\Documents\Portfolio_website\public\KHANISH_RESUME___Fresher_2025.pdf
```

## Folder Structure After Setup:

```
Portfolio_website/
├── public/
│   ├── KHANISH_RESUME___Fresher_2025.pdf
│   └── images/
│       ├── dp-pic.jpg
│       ├── thank-you.png
│       └── beach.jpg
├── src/
├── index.html
├── styles.css
├── script.js
├── vite.config.ts
├── vercel.json
├── package.json
└── ...
```

## Testing Locally:

```bash
npm run dev
```

Then visit `http://localhost:5173` and verify:
- Profile image displays in hero section
- Resume download link works
- Thank you image appears at bottom

## Deploying to Vercel:

```bash
git add .
git commit -m "Fix asset paths for Vercel deployment"
git push
```

Vercel will automatically build and deploy. The build will copy everything from the `public/` folder to the root of the deployed site.

## CSS Note:

Your `styles.css` uses external images from Pexels, which is fine. Make sure you're also checking for any local image references in your CSS that need updating to `/images/filename`.

---

**Why This Works on Vercel:**
- Vercel automatically copies the `public/` folder to the root
- Images referenced as `/images/filename` will be accessible
- The absolute path prevents issues in single-page applications
