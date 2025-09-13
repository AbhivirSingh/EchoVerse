import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TextToSpeechTab } from "@/components/text-to-speech-tab"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <span className="text-xl font-bold text-black">IIElevenLabs</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <div className="flex items-center space-x-1">
                <span className="text-gray-700 hover:text-black cursor-pointer">Creative Platform</span>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-gray-700 hover:text-black cursor-pointer">Agents Platform</span>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-gray-700 hover:text-black cursor-pointer">Developers</span>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-gray-700 hover:text-black cursor-pointer">Resources</span>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <span className="text-gray-700 hover:text-black cursor-pointer">Enterprise</span>
              <span className="text-gray-700 hover:text-black cursor-pointer">Pricing</span>
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-gray-700 hover:text-black">
                Log in
              </Button>
              <Button className="bg-black text-white hover:bg-gray-800 rounded-full px-6">Sign up</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 text-balance">
            The most realistic voice AI platform
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto text-pretty">
            AI voice models and products powering millions of developers, creators, and enterprises. From low-latency
            conversational agents to the leading AI voice generator for voiceovers and audiobooks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-black text-white hover:bg-gray-800 rounded-full px-8 py-3 text-lg">SIGN UP</Button>
            <Button
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full px-8 py-3 text-lg bg-transparent"
            >
              CONTACT SALES
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Tabs */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="text-to-speech" className="w-full">
            <TabsList className="grid w-full grid-cols-7 bg-gray-100 rounded-lg p-1 mb-8">
              <TabsTrigger value="text-to-speech" className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728"
                  />
                </svg>
                TEXT TO SPEECH
              </TabsTrigger>
              <TabsTrigger value="agents" className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                AGENTS
              </TabsTrigger>
              <TabsTrigger value="music" className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                  />
                </svg>
                MUSIC
              </TabsTrigger>
              <TabsTrigger value="speech-to-text" className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                SPEECH TO TEXT
              </TabsTrigger>
              <TabsTrigger value="dubbing" className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0v16a2 2 0 002 2h6a2 2 0 002-2V4"
                  />
                </svg>
                DUBBING
              </TabsTrigger>
              <TabsTrigger value="voice-cloning" className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                VOICE CLONING
              </TabsTrigger>
              <TabsTrigger value="elevenreader" className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                ELEVENREADER
              </TabsTrigger>
            </TabsList>

            <TabsContent value="text-to-speech">
              <TextToSpeechTab />
            </TabsContent>

            <TabsContent value="agents">
              <div className="text-center py-20 text-gray-500">Agents functionality coming soon...</div>
            </TabsContent>

            <TabsContent value="music">
              <div className="text-center py-20 text-gray-500">Music functionality coming soon...</div>
            </TabsContent>

            <TabsContent value="speech-to-text">
              <div className="text-center py-20 text-gray-500">Speech to Text functionality coming soon...</div>
            </TabsContent>

            <TabsContent value="dubbing">
              <div className="text-center py-20 text-gray-500">Dubbing functionality coming soon...</div>
            </TabsContent>

            <TabsContent value="voice-cloning">
              <div className="text-center py-20 text-gray-500">Voice Cloning functionality coming soon...</div>
            </TabsContent>

            <TabsContent value="elevenreader">
              <div className="text-center py-20 text-gray-500">ElevenReader functionality coming soon...</div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
