import { type PropsWithChildren, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { usePreRequestWrapperForAccessApi } from "./api/usePreRequestWrapperForAccessApi";
import { Spinner } from "@/components/ui/spinner";

type PreRequestWrapperForAccessProps = PropsWithChildren;

export function PreRequestWrapperForAccess({
  children,
}: PreRequestWrapperForAccessProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { error, isSuccess } = usePreRequestWrapperForAccessApi(Number(id));

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        void navigate(-1);
      }, 0);
    }
  }, [navigate, error]);

  return isSuccess ? <>{children}</> : <Spinner />;
}
