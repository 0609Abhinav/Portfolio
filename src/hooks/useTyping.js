import { useState, useEffect, useRef } from "react";

export function useTyping(words, typeSpeed = 90, deleteSpeed = 55, pauseMs = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState("typing"); // typing | pausing | deleting
  const pauseTimer = useRef(null);

  useEffect(() => {
    if (!words || !words.length) return;
    const current = words[wordIndex % words.length];

    if (phase === "typing") {
      if (displayed.length < current.length) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), typeSpeed);
        return () => clearTimeout(t);
      } else {
        // fully typed — pause then delete
        pauseTimer.current = setTimeout(() => setPhase("deleting"), pauseMs);
        return () => clearTimeout(pauseTimer.current);
      }
    }

    if (phase === "deleting") {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), deleteSpeed);
        return () => clearTimeout(t);
      } else {
        // fully deleted — move to next word
        setWordIndex((i) => (i + 1) % words.length);
        setPhase("typing");
      }
    }
  }, [displayed, phase, wordIndex, words, typeSpeed, deleteSpeed, pauseMs]);

  return displayed;
}
