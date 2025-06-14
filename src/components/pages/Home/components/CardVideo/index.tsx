import { useRouter } from "next/navigation";
import { FiVideo } from "react-icons/fi";
import { MonitorModel } from "~/modules/monitor/model/monitor-model";

interface CardVideoProps {
  monitor: MonitorModel;
}

export default function CardVideo({ monitor }: CardVideoProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/monitor/${monitor.id}`)}
      className="rounded-lg overflow-hidden bg-gray-800 w-full shadow cursor-pointer"
    >
      <div className="h-[250px] bg-gray-700 flex items-center justify-center">
        {/* {videoUrl ? (
          <video
            src={videoUrl}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
        )} */}
        <div className="text-gray-400">
          <FiVideo size={80} />
        </div>
      </div>

      <div className="bg-teal-600 px-4 py-2">
        <span className="text-white text-2xl truncate">{monitor.name}</span>
      </div>
    </div>
  );
}
