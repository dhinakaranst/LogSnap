import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BackgroundBeams } from "./ui/shadcn-io/background-beams";

export default function Hero() {
  return (

    

    
    <div className="relative h-screen overflow-hidden">
      <BackgroundBeams className="absolute inset-0" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl font-bold text-black">
          LogSnap
        </h1>

        <p className="mt-4 max-w-xl text-black-300">
          Centralized logging platform to ingest, monitor, and understand logs
          faster.
        </p>

        
        <div className="mt-8 flex gap-4">
          <Link href="/login">
          <Button size="lg">Get Started</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
