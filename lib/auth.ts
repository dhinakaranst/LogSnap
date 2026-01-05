import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function requireSession() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.projectId) {
    throw new Error("Unauthorized");
  }

  return {
    user: session.user,
    projectId: session.user.projectId,
  };
}
