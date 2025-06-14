"use client";

import { useParams } from "next/navigation";
import Monitor from "~/components/pages/Monitor";

type Params = {
  id: string;
};

export default function MonitorPage() {
  const params = useParams<Params>();

  return <Monitor id={params.id} />;
}
