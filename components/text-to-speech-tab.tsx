"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { useToast } from "../hooks/use-toast"

export function TextToSpeechTab() {
  const [selectedLanguage, setSelectedLanguage] = useState("english")
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [audioProgress, setAudioProgress] = useState(0)
  const [audioDuration, setAudioDuration] = useState(0)
  const [selectedVoice, setSelectedVoice] = useState("samara")
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const { toast } = useToast()

  // Language-specific text content
  const languageTexts = {
    english: `In the ancient land of Eldoria, where skies shimmered and forests, whispered secrets to the wind, lived a dragon named Zephyros. [sarcastically] Not the "burn it all down" kind... [giggles] but he was gentle, wise, with eyes like old stars. [whispers] Even the birds fell silent when he passed.`,
    arabic: `في أرض إلدوريا القديمة، حيث تتلألأ السماء والغابات، همست الأسرار للريح، عاش تنين يُدعى زيفيروس. ليس من النوع الذي "يحرق كل شيء"... لكنه كان لطيفًا وحكيمًا، بعيون مثل النجوم القديمة. حتى الطيور سكتت عندما مر.`,
    spanish: `En la antigua tierra de Eldoria, donde los cielos brillaban y los bosques susurraban secretos al viento, vivía un dragón llamado Zephyros. No del tipo "quémalo todo"... sino que era gentil, sabio, con ojos como estrellas antiguas. Incluso los pájaros se quedaron en silencio cuando pasó.`,
  }

  const [text, setText] = useState(languageTexts.english)

  // Update text when language changes
  useEffect(() => {
    setText(languageTexts[selectedLanguage as keyof typeof languageTexts])
  }, [selectedLanguage])

  const handlePlay = async () => {
    if (isPlaying && audioRef.current) {
      // Pause current audio
      audioRef.current.pause()
      setIsPlaying(false)
      return
    }

    setIsLoading(true)

    try {
      // Call API to get audio URL based on selected language
      const response = await fetch(`/api/audio/${selectedLanguage}`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.audioUrl) {
        // Stop any existing audio
        if (audioRef.current) {
          audioRef.current.pause()
          audioRef.current = null
        }

        // Create new audio instance
        const audio = new Audio(data.audioUrl)
        audioRef.current = audio

        // Set up audio event listeners
        audio.addEventListener("loadedmetadata", () => {
          setAudioDuration(audio.duration)
        })

        audio.addEventListener("timeupdate", () => {
          if (audio.duration) {
            setAudioProgress((audio.currentTime / audio.duration) * 100)
          }
        })

        audio.addEventListener("ended", () => {
          setIsPlaying(false)
          setAudioProgress(0)
        })

        audio.addEventListener("error", (e) => {
          console.error("Audio playback error:", e)
        toast("Failed to play audio. Please try again.")
          setIsPlaying(false)
          setIsLoading(false)
        })

        // Start playback
        await audio.play()
        setIsPlaying(true)

        toast(`Now playing in ${selectedLanguage}`)
      }
    } catch (error) {
      console.error("Error playing audio:", error)
      toast("Failed to load audio. Please check your connection and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = async () => {
    try {
      const response = await fetch(`/api/audio/${selectedLanguage}`)
      const data = await response.json()

      if (data.audioUrl) {
        // Create a temporary link to download the audio
        const link = document.createElement("a")
        link.href = data.audioUrl
        link.download = `elevenlabs-${selectedLanguage}-audio.wav`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        toast(`Downloading ${selectedLanguage} audio file...`)
      }
    } catch (error) {
      console.error("Error downloading audio:", error)
      toast("Failed to download audio file.")
    }
  }

  const handleGenerate = async () => {
    if (!text.trim()) {
      toast("Please enter some text to generate audio.")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/generate-speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text.trim(),
          language: selectedLanguage,
          voice: selectedVoice,
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast(`New ${selectedLanguage} audio generated successfully!`)
      }
    } catch (error) {
      console.error("Error generating audio:", error)
      toast("Failed to generate new audio.")
    } finally {
      setIsLoading(false)
    }
  }

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-8 bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 border-0 shadow-lg">
        {/* Text Editor */}
        <div className="mb-6">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[200px] text-lg leading-relaxed border-gray-200 bg-white/80 backdrop-blur-sm"
            placeholder="Enter your text here..."
          />
        </div>

        {/* Voice Options */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6 auto-rows-fr">
          {[
            { name: "Samara", emoji: "👩", subtitle: "Narrate a story", id: "samara" },
            { name: "2 speakers", emoji: "👥", subtitle: "Create a dialogue", id: "dialogue" },
            { name: "Jessica", emoji: "👩‍💼", subtitle: "Provide customer support", id: "jessica" },
            { name: "Announcer", emoji: "📢", subtitle: "Voiceover a game", id: "announcer" },
            { name: "Sergeant", emoji: "🎖️", subtitle: "Play a drill sergeant", id: "sergeant" },
            { name: "Spuds", emoji: "🥔", subtitle: "Recount an old story", id: "spuds" },
          ].map((voice) => (
            <Button
              key={voice.name}
              variant="outline"
              onClick={() => setSelectedVoice(voice.id)}
              className={`h-auto p-3 flex flex-col items-center gap-2 text-center min-h-[100px] w-full overflow-hidden ${
                selectedVoice === voice.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <span className="text-2xl flex-shrink-0">{voice.emoji}</span>
              <div className="flex flex-col gap-1 w-full px-1">
                <div className="font-medium text-sm leading-tight break-words text-wrap-auto">{voice.name}</div>
                <div className="text-xs text-gray-500 leading-tight break-words text-wrap-auto">{voice.subtitle}</div>
              </div>
            </Button>
          ))}
        </div>

        <div className="space-y-4">
          {/* Progress Bar */}
          {isPlaying && (
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${audioProgress}%` }}
              />
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Language Selector */}
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-32">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">
                      {selectedLanguage === "english" ? "🇺🇸" : selectedLanguage === "arabic" ? "🇸🇦" : "🇪🇸"}
                    </span>
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">
                    <div className="flex items-center gap-2">
                      <span>🇺🇸</span>
                      <span>ENGLISH</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="arabic">
                    <div className="flex items-center gap-2">
                      <span>🇸🇦</span>
                      <span>ARABIC</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="spanish">
                    <div className="flex items-center gap-2">
                      <span>🇪🇸</span>
                      <span>SPANISH</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Play/Pause Button */}
              <Button
                onClick={handlePlay}
                disabled={isLoading}
                className="bg-black text-white hover:bg-gray-800 rounded-full w-12 h-12 p-0"
              >
                {isLoading ? (
                  <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                ) : isPlaying ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </Button>

              {/* Generate Button */}
              <Button
                onClick={handleGenerate}
                disabled={isLoading}
                variant="outline"
                className="flex items-center gap-2 bg-transparent"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Generate
              </Button>
            </div>

            {/* Download Button */}
            <Button onClick={handleDownload} variant="outline" className="flex items-center gap-2 bg-transparent">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download
            </Button>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-gray-600 mb-4">EXPERIENCE THE FULL AUDIO AI PLATFORM</p>
          <Button className="bg-black text-white hover:bg-gray-800 rounded-full px-8">SIGN UP</Button>
        </div>
      </Card>
    </div>
  )
}
