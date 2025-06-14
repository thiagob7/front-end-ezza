import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";
import Home from "~/components/pages/Home";
import { authOptions } from "~/constants/auth-options";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return <Home />;
}
