"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, type KeyboardEvent, useRef, useState } from "react";

type UseSearchOptions = {
  onClose?: () => void;
  clearOnSubmit?: boolean;
};

export function useSearch(options: UseSearchOptions = {}) {
  const { onClose, clearOnSubmit = true } = options;
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const open = () => setIsOpen(true);

  const close = () => {
    setIsOpen(false);
    inputRef.current?.blur();
    onClose?.();
  };

  const reset = () => {
    setQuery("");
    close();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
      if (clearOnSubmit) {
        reset();
      } else {
        close();
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      close();
    }
  };

  return {
    isOpen,
    query,
    setQuery,
    inputRef,
    open,
    close,
    reset,
    handleSubmit,
    handleKeyDown,
  };
}
