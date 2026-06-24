import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────────────────────────
   useVoice — Browser-native Text-to-Speech + Speech-to-Text
   Uses: window.speechSynthesis  (TTS)
         window.SpeechRecognition (STT)
   Auto-play unlock: fires a silent utterance on the first user
   gesture so subsequent auto-speak calls work without needing
   an explicit user interaction per call.
───────────────────────────────────────────────────────────── */

/* ── Module-level auto-play unlock ── */
if (typeof window !== "undefined" && "speechSynthesis" in window) {
  const _unlock = () => {
    // Speak a zero-length utterance to prime the audio context
    const u = new SpeechSynthesisUtterance("");
    u.volume = 0;
    window.speechSynthesis.speak(u);
    window.speechSynthesis.cancel();
    ["click","touchstart","keydown","scroll"].forEach((e) =>
      window.removeEventListener(e, _unlock)
    );
  };
  ["click","touchstart","keydown","scroll"].forEach((e) =>
    window.addEventListener(e, _unlock, { once: true, passive: true })
  );
}

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

      // Cancel + resume fixes Chrome's stuck-synthesis bug
      synthRef.current.cancel();
      synthRef.current.resume();

      const utter          = new SpeechSynthesisUtterance(text);
      utter.rate           = rate;
      utter.pitch          = pitch;
      utter.volume         = volume;
      utteranceRef.current = utter;
      onEndRef.current     = onEnd;

      // Pick a natural English male voice if available
      const voices = synthRef.current.getVoices();
      const preferred = voices.find(
        (v) =>
          v.lang.startsWith("en") &&
          (v.name.includes("Google UK English Male") ||
            v.name.includes("Google US English") ||
            v.name.includes("Daniel") ||
            v.name.includes("Premium") ||
            v.name.includes("Enhanced") ||
            v.name.includes("Google"))
      );
      if (preferred) utter.voice = preferred;

      utter.onstart = () => setIsSpeaking(true);
      utter.onend   = () => {
        setIsSpeaking(false);
        if (onEndRef.current) onEndRef.current();
      };
      utter.onerror = () => {
        setIsSpeaking(false);
        // Retry once after a short delay (Chrome sometimes needs this)
        setTimeout(() => {
          if (synthRef.current && text) {
            synthRef.current.resume();
            const retry = new SpeechSynthesisUtterance(text);
            retry.rate   = rate;
            retry.pitch  = pitch;
            retry.volume = volume;
            if (preferred) retry.voice = preferred;
            retry.onstart = () => setIsSpeaking(true);
            retry.onend   = () => { setIsSpeaking(false); onEndRef.current?.(); };
            synthRef.current.speak(retry);
          }
        }, 250);
      };

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
