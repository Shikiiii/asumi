# 🎌 Asumi

**The modern way to discover your next favorite anime. Swipe, match, and watch.**

Asumi transforms anime discovery into an engaging, Tinder-like experience. Connect your MyAnimeList or AniList account, swipe through personalized recommendations, and build your watchlist effortlessly.

<div align="center">
  <img src="/screenshots/1.png" alt="Swipe Page" width="1080"/>
</div>

## ✨ Features

- 🎯 **Smart Recommendations** - Discover anime tailored to your taste through intelligent matching algorithms
- ⚡ **Lightning Fast** - Swipe through recommendations instantly with smooth, responsive animations
- 👥 **Social Integration** - Connect with MyAnimeList and AniList to sync your watchlist seamlessly
- 🔒 **Privacy First** - Your data stays secure with OAuth authentication and minimal data collection
- 📱 **Mobile Optimized** - Perfect swiping experience on all devices
- 🔄 **Rewind Feature** - Made a mistake? Undo your last rejection with one tap

## 🚀 Demo

Try it live: [aniswipe.vercel.app](https://your-demo-link.com)

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Animations**: Framer Motion
- **APIs**: MyAnimeList API, AniList GraphQL
- **Authentication**: OAuth 2.0
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shikiiii/asumi.git
   cd asumi
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your API credentials:
   ```env
    NEXT_PUBLIC_MAL__CLIENT_ID="your_mal_client_id"
    NEXT_PUBLIC_MAL__CLIENT_SECRET="your_mal_client_secret"
    NEXT_PUBLIC_MAL__REDIRECT_URI="your_mal_redirect_url"
    
    NEXT_PUBLIC_ANILIST__CLIENT_ID="your_anilist_client_id"
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## 🔧 API Setup

### MyAnimeList API
1. Go to [MyAnimeList API](https://myanimelist.net/apiconfig)
2. Create a new application
3. Add your client ID and secret to `.env`

### AniList API
1. Go to [AniList Developer](https://anilist.co/settings/developer)
2. Create a new client
3. Add your client ID and secret to `.env`

## 🎮 How to Use

1. **Connect Your Account** - Link your MyAnimeList or AniList profile
2. **Start Swiping** - Browse through personalized anime recommendations
3. **Build Your List** - Swipe right to add to your watchlist, left to skip
4. **Discover More** - Get recommendations based on your preferences

## 📱 Screenshots

<div align="center">
  <img src="/screenshots/2.png" alt="Home Page" width="1080"/>
  <img src="/screenshots/3.png" alt="Profile Page" width="1080"/>
</div>

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [MyAnimeList](https://myanimelist.net/) for their comprehensive anime database
- [AniList](https://anilist.co/) for their excellent GraphQL API
- [Next.js](https://nextjs.org/) for the amazing React framework
- [Framer Motion](https://www.framer.com/motion/) for smooth animations

## 📞 Support

If you have any questions or run into issues, please [open an issue](https://github.com/Shikiiii/asumi/issues) on GitHub.

---

<div align="center">
  <p>Made with ❤️ for the anime community</p>
  <p>
    <a href="https://github.com/Shikiiii/asumi/issues">🐛 Report Bug</a> •
    <a href="https://github.com/Shikiiii/asumi/issues">✨ Request Feature</a>
  </p>
</div>
