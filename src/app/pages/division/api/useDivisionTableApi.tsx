import { kabinetControllerGetKabinetsByDivisionId } from "@/app/api/generated";
import { useApiQuery } from "@/hooks/useApi";
import { useMatch } from "react-router";

export const useDivisionTableApi = (id: number) => {
  return useApiQuery({
    queryKey: ["kabinets", id],
    queryFn: () => kabinetControllerGetKabinetsByDivisionId(id),
    enabled: !!useMatch({ path: "/division/:id", end: true }) && !!id,
  });
};
