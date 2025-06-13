"use client";

import { useParams } from "next/navigation";
import Monitor from "~/components/pages/Monitor";

export default function MonitorPage() {
  const params = useParams();
  const id = parseInt(params.id as string);

  return <Monitor id={id} />;
}
