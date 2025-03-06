import { ReactNode, useCallback, useLayoutEffect } from "react";

import { useVerifyTokenMutation } from "@/store/queries/auth";
import { clearLoginToken, loginFromToken } from "@/store/slices/auth";
import { useAppDispatch } from "@/utils/redux";

interface AuthProvider {
  children: ReactNode;
}

export default function AuthProvider({ children }: Readonly<AuthProvider>) {
  const [verifyToken] = useVerifyTokenMutation();
  const dispatch = useAppDispatch();

  const handleVerify = useCallback(async () => {
    try {
      const user = await verifyToken(null).unwrap();

      if (user?.user_id) {
        dispatch(loginFromToken(user));
      } else if ((user as any).statusCode) {
        dispatch(clearLoginToken());
      }
    } catch {
      dispatch(clearLoginToken());
    }
  }, []);

  useLayoutEffect(() => {
    handleVerify();
  }, []);

  return <>{children}</>;
}
