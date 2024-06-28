"use client";

import { cn } from "../lib/utils";
import { grotesk } from "@/lib/fonts";

export default function Home() {
  

  return (
    <div>
      <div className="w-full h-screen bg-aqua-neon-light absolute z-[-10] rounded-t-3xl">
        <h1
          className={cn(
            "inset-y-0 px-16 mt-48 flex items-center justify-center text-center leading-relaxed text-6xl md:text-9xl font-grotesk font-bold",
            grotesk.variable
          )}
        >
          We generate <br /> Codes & Docs!
        </h1>
      </div>
    </div>
  );
}
