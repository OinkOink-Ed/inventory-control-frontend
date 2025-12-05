import { useApiQuery } from "@/shared/api/hooks/useApi";
import { kabinetControllerGetKabinetsByDivisionId } from "@api/gen";
import { useMatch } from "react-router";

export const useDivisionTableApi = (id: number | undefined) => {
  return useApiQuery(
    () => {
      if (id) return kabinetControllerGetKabinetsByDivisionId(id);
      else throw new Error("ID - undefined");
    },
    {
      queryKey: ["kabinets", id],
      enabled: !!useMatch({ path: "/division/:id", end: true }) && !!id,
    }
  );
};
