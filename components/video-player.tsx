"use client"

import { useState } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VideoPlayerProps {
  videoId: string
  title: string
}

export function VideoPlayer({ videoId, title }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)

  // YouTube Kids embed URL with additional safety parameters
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?enablejsapi=1&modestbranding=1&rel=0&showinfo=0&color=white&iv_load_policy=3&playsinline=1&disablekb=1&origin=${typeof window !== "undefined" ? window.location.origin : ""}`

  const handlePlay = () => {
    setPlaying(true)
  }

  const handleToggleMute = () => {
    setMuted(!muted)
  }

  return (
    <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
      {!playing ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black/5">
          <div className="flex flex-col items-center gap-2 sm:gap-4">
            <Button
              onClick={handlePlay}
              className="rounded-full bg-primary p-3 sm:p-4 hover:bg-primary/90"
              aria-label="Play video"
            >
              <Play className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </Button>
            <p className="text-base sm:text-lg font-medium text-center px-4">{title}</p>
          </div>
        </div>
      ) : (
        <iframe
          src={`${embedUrl}${muted ? "&mute=1" : ""}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        ></iframe>
      )}

      {playing && (
        <div className="absolute bottom-4 right-4 flex gap-2">
          <Button
            onClick={() => setPlaying(false)}
            size="sm"
            variant="secondary"
            className="rounded-full h-8 w-8 p-0"
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button
            onClick={handleToggleMute}
            size="sm"
            variant="secondary"
            className="rounded-full h-8 w-8 p-0"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
        </div>
      )}
    </div>
  )
}
