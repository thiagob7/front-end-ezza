"use client";

import { useFindManyMonitors } from "~/@core/application/queries/monitor/use-find-many-monitors";
import Home from "~/components/pages/Home";

export default function HomePage() {
  const { data: monitors } = useFindManyMonitors();

  if (!monitors) return;

  return <Home monitors={monitors} />;
}
