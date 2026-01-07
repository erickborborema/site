"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LayoutTextFlipProps {
  text: string;
  words: string[];
  duration?: number;
}

export function LayoutTextFlip({
  text,
  words,
  duration = 3000,
}: LayoutTextFlipProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [words.length, duration]);

  // Encontrar a palavra mais longa para manter o tamanho consistente
  const longestWord = words.reduce((a, b) => (a.length > b.length ? a : b), "");

  return (
    <span className="inline-block">
      {text}{" "}
      <span className="relative inline-block text-accent">
        <AnimatePresence mode="wait">
          <motion.span
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="inline-block"
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
        <span className="invisible inline-block">{longestWord}</span>
      </span>
    </span>
  );
}

