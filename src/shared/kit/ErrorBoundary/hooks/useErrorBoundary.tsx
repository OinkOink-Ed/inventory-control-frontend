import { useEffect, useState } from "react";
import { useNavigate, useRouteError } from "react-router";

export function useErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  const [redirectEnabled, setRedirectEnabled] = useState(true);

  useEffect(() => {
    if (!redirectEnabled) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          void navigate(-1);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [navigate, redirectEnabled]);

  const cancelRedirect = () => {
    setRedirectEnabled(false);
  };

  return { cancelRedirect, navigate, countdown, error };
}
