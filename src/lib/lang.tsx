import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { L } from "@/content/site";

export type Lang = "en" | "jp";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (v: L | string) => string;
  fading: boolean;
};

const LangContext = createContext<Ctx>({
  lang: "en",
  setLang: () => {},
  t: (v) => (typeof v === "string" ? v : v.en),
  fading: false,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("ohayo-lang") as Lang | null;
    if (saved === "jp" || saved === "en") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    if (l === lang) return;
    setFading(true);
    window.setTimeout(() => {
      setLangState(l);
      window.localStorage.setItem("ohayo-lang", l);
      setFading(false);
    }, 260);
  };

  const t = (v: L | string) => (typeof v === "string" ? v : lang === "jp" ? v.jp : v.en);

  return (
    <LangContext.Provider value={{ lang, setLang, t, fading }}>{children}</LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
