'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Function to handle popup visibility
    const handlePopup = () => {
      setShowPopup(true);
      // Hide popup after 2 seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
    };

    // Show popup immediately
    handlePopup();

    // Set up interval to show popup every 5 seconds
    const interval = setInterval(handlePopup, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/music/me.mp3');
      audioRef.current.loop = true;
      
      // Add error handling
      audioRef.current.onerror = () => {
        setHasError(true);
        toast.error("Music file not found. Please add classical.mp3 to the /public/music directory.");
      };
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((error) => {
        setHasError(true);
        toast.error("Failed to play music. Please check if the file exists.");
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div
        className={`absolute bottom-16 left-0 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg border border-border transition-all duration-500 transform ${
          showPopup 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <p className="text-sm text-foreground whitespace-nowrap">
          Unmute for luxury ambiance
        </p>
      </div>
      <Button
        onClick={toggleMusic}
        variant="outline"
        size="icon"
        className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90"
        disabled={hasError}
      >
        {hasError ? (
          <AlertCircle className="h-5 w-5 text-destructive" />
        ) : isPlaying ? (
          <Volume2 className="h-5 w-5" />
        ) : (
          <VolumeX className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
} 