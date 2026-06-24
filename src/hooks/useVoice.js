import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────────────────────────
   useVoice — Browser-native Text-to-Speech + Speech-to-Text
   Uses: window.speechSynthesis  (TTS)
         window.SpeechRecognition (STT)
   No external API keys required.
   Swap-in point: replace speak() body with ElevenLabs/OpenAI TTS call.
───────────────────────────────────────────────────────────── */

export default function useVoice() {
  const [isSpeaking, setIsSpeaking]   = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript]   = useState("");
  const [supported, setSupported]     = useState({ tts: false, stt: false });

  const synthRef      = useRef(null);
  const recognizerRef = useRef(null);
  const utteranceRef  = useRef(null);
  const onEndRef      = useRef(null);

  // ── Detect browser capabilities ──
  useEffect(() => {
    const hasTTS = typeof window !== "undefined" && "speechSynthesis" in window;
    const hasSpeechRecognition =
      typeof window !== "undefined" &&
      ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

    setSupported({ tts: hasTTS, stt: hasSpeechRecognition });

    if (hasTTS) synthRef.current = window.speechSynthesis;

    if (hasSpeechRecognition) {
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      const rec = new SR();
      rec.continuous      = false;
      rec.interimResults  = true;
      rec.lang            = "en-US";

      rec.onresult = (e) => {
        const t = Array.from(e.results)
          .map((r) => r[0].transcript)
          .join("");
        setTranscript(t);
      };

      rec.onend = () => setIsListening(false);
      rec.onerror = () => setIsListening(false);

      recognizerRef.current = rec;
    }

    return () => {
      if (synthRef.current) synthRef.current.cancel();
    };
  }, []);

  /* ── TTS: speak text ── */
  const speak = useCallback(
    (text, { rate = 0.95, pitch = 1.0, volume = 1.0, onEnd } = {}) => {
      if (!synthRef.current || !text) return;

      // Cancel any current speech
      synthRef.current.cancel();

      const utter          = new SpeechSynthesisUtterance(text);
      utter.rate           = rate;
      utter.pitch          = pitch;
      utter.volume         = volume;
      utteranceRef.current = utter;
      onEndRef.current     = onEnd;

      // Pick a natural English voice if available
      const voices = synthRef.current.getVoices();
      const preferred = voices.find(
        (v) =>
          v.lang.startsWith("en") &&
          (v.name.includes("Google") ||
            v.name.includes("Samantha") ||
            v.name.includes("Daniel") ||
            v.name.includes("Premium") ||
            v.name.includes("Enhanced"))
      );
      if (preferred) utter.voice = preferred;

      utter.onstart = () => setIsSpeaking(true);
      utter.onend   = () => {
        setIsSpeaking(false);
        if (onEndRef.current) onEndRef.current();
      };
      utter.onerror = () => setIsSpeaking(false);

      synthRef.current.speak(utter);
    },
    []
  );

  /* ── TTS: stop current speech ── */
  const stopSpeaking = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  }, []);

  /* ── STT: start listening ── */
  const startListening = useCallback(() => {
    if (!recognizerRef.current || isListening) return;
    setTranscript("");
    try {
      recognizerRef.current.start();
      setIsListening(true);
    } catch (_) {
      // already started — ignore
    }
  }, [isListening]);

  /* ── STT: stop listening ── */
  const stopListening = useCallback(() => {
    if (!recognizerRef.current) return;
    try {
      recognizerRef.current.stop();
    } catch (_) {}
    setIsListening(false);
  }, []);

  return {
    speak,
    stopSpeaking,
    startListening,
    stopListening,
    isSpeaking,
    isListening,
    transcript,
    setTranscript,
    supported,
  };
}
