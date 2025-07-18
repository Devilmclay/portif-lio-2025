   // components/ThemeBackground.tsx
   "use client";

   import { useState, useEffect } from "react";
   import { useTheme } from "next-themes";
   import { AnimatedStarrySky } from "./AnimatedStarrySky";
   import { AnimatedDaySky } from "./AnimatedDaySky";

   export const ThemeBackground = () => {
     const [mounted, setMounted] = useState(false);
     const { resolvedTheme } = useTheme();

     useEffect(() => {
       setMounted(true);
     }, []);

     if (!mounted) {
       return null;
     }

     return resolvedTheme === "dark" ? <AnimatedStarrySky /> : <AnimatedDaySky />;
   };
   