import { type NextRequest, NextResponse } from "next/server"

// Mock audio data - in production, this would come from MongoDB
const mockAudioData = {
  english: {
    audioUrl: "https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav",
    language: "english",
    text: "In the ancient land of Eldoria, where skies shimmered and forests, whispered secrets to the wind, lived a dragon named Zephyros. Not the 'burn it all down' kind... but he was gentle, wise, with eyes like old stars. Even the birds fell silent when he passed.",
  },
  arabic: {
    audioUrl: "https://www2.cs.uic.edu/~i101/SoundFiles/PinkPanther30.wav",
    language: "arabic",
    text: "في أرض إلدوريا القديمة، حيث تتلألأ السماء والغابات، همست الأسرار للريح، عاش تنين يُدعى زيفيروس. ليس من النوع الذي 'يحرق كل شيء'... لكنه كان لطيفًا وحكيمًا، بعيون مثل النجوم القديمة.",
  },
  spanish: {
    audioUrl: "https://www2.cs.uic.edu/~i101/SoundFiles/StarWars3.wav",
    language: "spanish",
    text: "En la antigua tierra de Eldoria, donde los cielos brillaban y los bosques susurraban secretos al viento, vivía un dragón llamado Zephyros. No del tipo 'quémalo todo'... sino que era gentil, sabio, con ojos como estrellas antiguas.",
  },
}

export async function GET(request: NextRequest, { params }: { params: { language: string } }) {
  try {
    const { language } = params
    const audioFile = mockAudioData[language.toLowerCase() as keyof typeof mockAudioData]

    if (!audioFile) {
      return NextResponse.json({ error: "Audio file not found for this language" }, { status: 404 })
    }

    return NextResponse.json({
      audioUrl: audioFile.audioUrl,
      language: audioFile.language,
      text: audioFile.text,
    })
  } catch (error) {
    console.error("Error fetching audio:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
