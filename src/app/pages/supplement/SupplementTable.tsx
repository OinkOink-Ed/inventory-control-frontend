import { modelCartridgesControllerGetAll } from "@/app/api/generated";
import { useQuery } from "@tanstack/react-query";

export function SupplementTable() {
  const modelCarridges = useQuery({
    queryKey: ["modelsCartridges"],
    queryFn: modelCartridgesControllerGetAll,
    staleTime: 5 * 60 * 1000,
  });

  return modelCarridges.isSuccess ? (
    <div className="flex flex-grow">Table {}</div>
  ) : (
    <div>Загрузка</div>
  );
}
