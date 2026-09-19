# Rohit — AI/ML Engineer Portfolio

A personal portfolio website built with **React + TypeScript + Vite**, showcasing machine learning and deep learning projects through an editorial, typography-first design with an interactive neural-network (perceptron) hero animation.

**Design theme:** Dark, minimal, "Moritz-style" editorial layout — plain text over icons/logos, monospace metadata, and scroll-triggered project visuals instead of static screenshots.

---

## ✨ Features

- **Interactive Hero Section** — A custom-built animated perceptron/neural-network canvas (`PerceptronCanvas.tsx`) that reacts to mouse movement, simulating forward signal flow between nodes.
- **Live Clock** — Navbar displays the current time in Kolkata (IST), updated every second.
- **About Section** — Short bio and a plain-text "Core Technologies" stack listing.
- **Selected Systems (Projects)** — Six featured ML/DL projects, each with:
  - A bespoke animated SVG/Canvas visualization unique to that project (dehazing before/after slider, exoplanet transit light-curve, FIFA win-probability bars, AI companion terminal log, dark-pattern attention highlighting, and vector similarity graph).
  - Metrics badges (e.g., PSNR/SSIM scores, accuracy, similarity scores).
  - Tags for the tech stack used.
  - A direct link to the project's GitHub repository.
- **Contact/Footer Section** — Plain-text links to Email, LinkedIn, Instagram, and GitHub.
- **Smooth scroll animations** powered by `framer-motion` (fade/slide-in on scroll, animated progress bars, animated path drawing).
- **Fully responsive** — Mobile-first Tailwind CSS layout.

---

## 🗂️ Featured Projects Shown on the Site

| # | Project | Highlights |
|---|---------|-----------|
| 01 | **AOD-Net: From-Scratch Atmospheric Dehazing** | Custom PyTorch dehazing CNN, 20.30 dB PSNR / 0.811 SSIM, diagnosed and fixed a dying-ReLU bug |
| 02 | **Exoplanet Habitability Predictor** | NASA Kepler/TESS data, custom Earth Similarity Index (ESI), SVM & Random Forest ensemble, Streamlit UI |
| 03 | **FIFA World Cup 2026 Match Predictor** | Monte Carlo simulation, Elo-based team strength ratings, ~55% historical accuracy |
| 04 | **Desktop AI Pet "Rio"** | LLM-driven desktop companion, Mem0 long-term memory, ambient state engine, voice pipeline |
| 05 | **Dark Pattern Language Detector** | Fine-tuned DistilBERT for detecting manipulative UX copy, served via FastAPI |
| 06 | **Movie Recommendation Engine** | Content-based recommender using TF-IDF/cosine similarity over metadata embeddings, Streamlit interface |

*(Each project card links out to its own GitHub repository — update the `githubUrl` fields in `src/components/Projects.tsx` as individual project repos go live.)*

---

## 🛠️ Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS 3 + `tailwind-merge` + `clsx`
- **Animation:** Framer Motion
- **Linting:** Oxlint

---

## 📁 Project Structure

```
Rohit's_protfolio/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/                    # Images (hero.png, etc.)
│   ├── components/
│   │   ├── Navbar.tsx             # Sticky header with live IST clock
│   │   ├── Hero.tsx               # Landing section with name/title
│   │   ├── PerceptronCanvas.tsx   # Interactive animated neural-net background
│   │   ├── About.tsx              # Bio + tech stack
│   │   ├── Projects.tsx           # Project list + custom SVG visualizations
│   │   └── Footer.tsx             # Contact links
│   ├── App.tsx                    # Assembles all sections
│   ├── main.tsx                   # React entry point
│   └── App.css / index.css        # Global + component styles
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── tsconfig*.json
```

---

## 🚀 Getting Started (Run Locally)

### Prerequisites
- [Node.js](https://nodejs.org/) v18+ and npm installed

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/Rohitghosh14/<your-repo-name>.git
cd <your-repo-name>

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The site will be available at `http://localhost:5173` (Vite's default port).

### Other scripts

```bash
npm run build     # Type-checks and builds a production bundle into dist/
npm run preview   # Serves the production build locally for a final check
npm run lint       # Runs Oxlint
```

---

## 🌐 Deployment

This is a static Vite build (`dist/` folder), so it can be deployed to any static host:

- **Vercel** — Import the GitHub repo → framework preset "Vite" → deploy (zero config needed).
- **Netlify** — Build command: `npm run build`, publish directory: `dist`.
- **GitHub Pages** — Build with `npm run build`, then publish the `dist/` folder using `gh-pages` or a GitHub Actions workflow.

---


---

## 📌 Notes / TODO

- Update placeholder GitHub links in `Projects.tsx` (`githubUrl: 'https://github.com/Rohitghosh14'`) to point to each project's actual dedicated repository once it's live.
- Replace the placeholder Instagram link in `Footer.tsx` with your actual profile URL, or remove it.
- `hero.png` in `src/assets/` is currently unused by any component — remove it if not needed, or wire it in if it was meant to appear somewhere.

---

## 📄 License

Personal portfolio — feel free to reference the structure, but please don't republish the content (bio, project descriptions) as your own.

---

**Author:** Rohit — AI/ML Engineering Student, Kolkata, India
**GitHub:** [@Rohitghosh14](https://github.com/Rohitghosh14)
