import { usePreRequestWrapperForAccessApi } from "@router/usePreRequestWrapperForAccessApi.tsx";
import { useLayoutEffect, type PropsWithChildren } from "react";
import { useNavigate, useParams } from "react-router";

export function CanEditGuard({ children }: PropsWithChildren) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { error } = usePreRequestWrapperForAccessApi(Number(id));

  useLayoutEffect(() => {
    if (error) {
      void navigate(-1);
    }
  }, [error, navigate]);

  return <>{children}</>;
}
