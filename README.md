# 🐾 Animal Pokédex

**Gotta Catch 'Em All!** - A real-world animal collection app inspired by Pokémon.

![Animal Pokedex](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?logo=tailwind-css)

## 🎮 Features

- 📸 **Camera Capture** - Snap photos of real animals to "catch" them
- 🔍 **AI Recognition** - Identifies animals from your photos (demo mode uses random selection)
- 🃏 **Pokémon-style Cards** - Beautiful cards with stats, facts, and type badges
- 📚 **Collection Gallery** - View and manage all your captured animals
- 🎯 **Progress Tracking** - See how many species you've caught
- ✨ **Catch Animation** - Pokéball throwing and shaking animation
- 📱 **PWA Support** - Install on your phone like a native app
- 🎨 **Rarity System** - Common, Uncommon, Rare, and Legendary animals!

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Install as PWA

1. Open the app in Chrome/Safari on mobile
2. Tap "Add to Home Screen" in the browser menu
3. Launch from your home screen for the full experience!

## 🎯 How to Play

1. Tap the Pokéball button to open the camera
2. Point at any animal and capture a photo
3. Watch the catch animation
4. View your new animal's card with stats and facts
5. Build your collection by catching different species!

## 🏆 Animal Rarities

| Rarity | Color | Examples |
|--------|-------|----------|
| Common | Gray | Dog, Cat, Sparrow, Butterfly |
| Uncommon | Blue | Fox, Deer, Horse, Snake |
| Rare | Purple | Owl, Eagle, Wolf, Dolphin |
| Legendary | Gold | Lion, Tiger, Panda, Elephant |

## 🔧 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Storage**: localStorage (client-side)

## 🎨 Design System

The app uses a Pokémon-inspired design:

- **Primary Red**: `#DC0A2D` (Pokédex red)
- **Type Colors**: Each animal type has a unique color
- **Card Design**: Holographic-style with stat bars
- **Animations**: Smooth, game-like transitions

## 🤖 AI Recognition

Currently runs in **demo mode** (assigns random animals). To enable real recognition:

1. Sign up for [Google Cloud Vision](https://cloud.google.com/vision) or [Hugging Face](https://huggingface.co)
2. Add your API key to environment variables
3. Update `/api/identify/route.ts` to call the vision API

## 📄 License

MIT License - feel free to use this for learning or fun projects!

---

Built with ❤️ and Pokéballs 🎯
