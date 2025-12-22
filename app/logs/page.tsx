"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BackgroundBeams } from "../../components/ui/shadcn-io/background-beams";


export default function LogsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") return <div>Loading...</div>;
  if (!session) return null;

  return <div>Logs page</div>;
}
