# ElevenLabs Clone

A Next.js application that replicates the ElevenLabs text-to-speech interface with MongoDB backend integration.

## Features

- 🎯 **Pixel-perfect UI** - Matches the original ElevenLabs design
- 🎵 **Audio Playback** - Play audio files in multiple languages (English, Arabic, Spanish)
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🎵 **Audio Playback** - Stream audio files directly
- 🔄 **Real-time Progress** - Audio playback progress tracking
- 📥 **Download Support** - Download generated audio files
- 🎛️ **Voice Selection** - Multiple voice options and characters

## Tech Stack

- **Frontend**: Next.js 14, React 19, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Audio**: Web Audio API with mock data
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+

### Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Endpoints

- `GET /api/audio/[language]` - Get audio file by language
- `POST /api/generate-speech` - Generate new speech (simulated)

## Features

The application uses mock audio data for demonstration purposes. Audio files are served from external URLs and the application provides a complete text-to-speech interface with:

## Usage

1. **Select Language**: Choose from English, Arabic, or Spanish
2. **Choose Voice**: Pick from available voice characters
3. **Enter Text**: Type or paste your text in the editor
4. **Play Audio**: Click the play button to hear the generated speech
5. **Download**: Save the audio file to your device
6. **Generate New**: Create new audio with different settings

## Deployment

This app is ready for deployment on Vercel:

1. Push to GitHub
2. Connect to Vercel
3. Deploy

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for learning and development.
