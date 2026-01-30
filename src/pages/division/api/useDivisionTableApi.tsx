import { useApiSuspenseQuery } from "@/shared/api";
import { kabinetControllerGetKabinetsByDivisionId } from "@api/gen";

export const useDivisionTableApi = (id: number | undefined) => {
  return useApiSuspenseQuery(
    () => {
      if (id) return kabinetControllerGetKabinetsByDivisionId(id);
      else throw new Error("ID - undefined");
    },
    {
      queryKey: ["kabinets", id],
    },
  );
};
