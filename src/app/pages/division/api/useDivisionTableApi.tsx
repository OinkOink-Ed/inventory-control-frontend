import { kabinetControllerGetKabinetsByDivisionId } from "@/app/api/generated";
import { useQuery } from "@tanstack/react-query";
import { useMatch } from "react-router";

export const useDivisionTableApi = (id: number) => {
  return useQuery({
    queryKey: ["kabinets", id],
    queryFn: () => kabinetControllerGetKabinetsByDivisionId(id),
    enabled: !!useMatch({ path: "/division/:id", end: true }) && !!id,
  });
};
