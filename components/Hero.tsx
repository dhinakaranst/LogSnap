import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { BackgroundBeams } from "./ui/shadcn-io/background-beams";

export default function Hero() {
  return (
    <div className="relative h-screen overflow-hidden flex items-center justify-center">
      <BackgroundBeams className="absolute inset-0" />

      {/* CARD WRAPPER */}
      <Card className="relative z-10 w-full max-w-xl shadow-lg">
        <CardContent className="flex flex-col items-center justify-center text-center p-10">
          
          <h1 className="text-5xl font-bold text-black">
            LogSnap
          </h1>

          <p className="mt-4 max-w-md text-gray-600">
            Centralized logging platform to ingest, monitor, and understand logs
            faster.
          </p>

          <div className="mt-8">
            <Link href="/login">
              <Button size="lg">Get Started</Button>
            </Link>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
