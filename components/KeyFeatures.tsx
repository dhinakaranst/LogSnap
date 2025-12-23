import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Search, BarChart2, Cloud } from "lucide-react";

export default function KeyFeatures() {
  return (
    <section
      id="features"
      className="py-24 px-6 text-center bg-white"
    >
      {/* Section title */}
      <h2 className="text-3xl font-semibold mb-4">
        Key Features
      </h2>

      {/* Divider */}
      <div className="mx-auto mb-16 h-px w-24 bg-gray-300" />

      {/* Cards */}
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
        
        {/* Card 1 */}
        <Card className="border shadow-sm">
          <CardContent className="flex flex-col items-center p-8">
            <Search className="mb-4 h-8 w-8 text-black" />

            <h3 className="mb-2 font-semibold">
              Real-time Monitoring
            </h3>

            <p className="text-sm text-gray-600">
              Track logs as they happen with live dashboards.
            </p>
          </CardContent>
        </Card>

        {/* Card 2 */}
        <Card className="border shadow-sm">
          <CardContent className="flex flex-col items-center p-8">
            <BarChart2 className="mb-4 h-8 w-8 text-black" />

            <h3 className="mb-2 font-semibold">
              Advanced Analytics
            </h3>

            <p className="text-sm text-gray-600">
              Gain insights with powerful search and visualization tools.
            </p>
          </CardContent>
        </Card>

        {/* Card 3 */}
        <Card className="border shadow-sm">
          <CardContent className="flex flex-col items-center p-8">
            <Cloud className="mb-4 h-8 w-8 text-black" />

            <h3 className="mb-2 font-semibold">
              Scalable Ingestion
            </h3>

            <p className="text-sm text-gray-600">
              Handle petabytes of data effortlessly and reliably.
            </p>
          </CardContent>
        </Card>

      </div>
    </section>
  );
}
