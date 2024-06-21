import Image from "next/image";
import {cn} from "../lib/utils"
import { grotesk } from "@/lib/fonts";

export default function Home() {
  return (
    <div className="w-full h-screen bg-purple-neon-light">
        <h1 className={cn("absolute inset-y-0 px-16 pt-32 flex items-center justify-center text-center leading-relaxed text-6xl md:text-9xl font-grotesk font-bold", grotesk.variable)}>We generate Codes & Docs!</h1>
    </div>
  );
}
