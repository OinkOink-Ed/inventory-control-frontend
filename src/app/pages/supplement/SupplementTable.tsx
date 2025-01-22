import { modelCartridgesControllerGetAll } from "@/app/api/generated";
import { useQuery } from "@tanstack/react-query";

export function SupplementTable() {
  const modelCartridges = useQuery({
    queryKey: ["modelsCartridges"],
    queryFn: modelCartridgesControllerGetAll,
    staleTime: 5 * 60 * 1000,
    // select: (data) => {
    //   return data.data.map((item) => ({
    //     ...item,
    //     createdAt: new Date(item.createdAt),
    //     updatedAt: new Date(item.updatedAt),
    //   }));
    // },
  });

  console.log(modelCartridges.data?.data);

  return modelCartridges.isSuccess ? (
    <div className="flex flex-grow">Table</div>
  ) : (
    //Можно отображать скелетон пока идёт загрузка
    <div>Загрузка</div>
  );
}
