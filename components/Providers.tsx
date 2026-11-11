"use client";

import React from "react";
import { LanguageProvider } from "@/context/LanguageContext";
import { VersionProvider } from "@/context/VersionContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <VersionProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </VersionProvider>
  );
}
