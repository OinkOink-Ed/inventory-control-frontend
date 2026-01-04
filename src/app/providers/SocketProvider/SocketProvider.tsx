import { useQueryClient } from "@tanstack/react-query";
import { type PropsWithChildren, useCallback, useEffect } from "react";
import { io, Socket } from "socket.io-client";

import type {
  CreateKabinetEventType,
  DecomissioningCartrdigeEventType,
  DeliveryCartridgeEventType,
  MovementCartridgeEventType,
  ReceivingCartridgeEventType,
  UpdateUserEventType,
} from "@api/gen";
import { useProfileStore } from "@features/auth";
import { useLogout } from "@/lib/hooks";
import { useProfileContext } from "@/shared/providers";
import { SocketContext } from "@app-providers/SocketProvider/socketContext.ts";

export function SocketProvider({ children }: PropsWithChildren) {
  const token = useProfileStore((state) => state.access_token);
  const logoutHandler = useLogout();
  const { role } = useProfileContext();
  const queryClient = useQueryClient();

  const registerEventListeners = useCallback(
    (socket: Socket) => {
      if (role?.roleName === undefined) {
        return;
      }

      if (["staff", "user", "admin"].includes(role.roleName)) {
        socket.on("invalidateUserCard", async (data: UpdateUserEventType) => {
          const { userId } = data;

          switch (role.roleName) {
            case "staff":
              await queryClient.invalidateQueries({
                queryKey: ["userCard", userId],
              });
              await queryClient.invalidateQueries({
                queryKey: ["profileCard"],
              });
              break;
            case "user":
            case "admin":
              await queryClient.invalidateQueries({
                queryKey: ["userCard", userId],
              });
              await queryClient.invalidateQueries({
                queryKey: ["profileCard"],
              });
              await queryClient.invalidateQueries({
                queryKey: ["users", "table"],
              });
              await queryClient.invalidateQueries({
                queryKey: ["usersByWarehouse"],
              });
              break;
          }
        });

        socket.on(
          "invalidateCartridgeOfDelivery",
          async (data: DeliveryCartridgeEventType) => {
            await queryClient.invalidateQueries({
              queryKey: ["accepted-cartridge", data.userId],
            });
            switch (role.roleName) {
              case "user":
              case "admin":
                await queryClient.invalidateQueries({
                  queryKey: ["cartridges", data.divisionId],
                });
                await queryClient.invalidateQueries({
                  queryKey: ["dashboard"],
                });
                break;
            }
          },
        );

        socket.on("logoutUser", () => {
          void logoutHandler();
        });
      }

      if (["user", "admin"].includes(role.roleName)) {
        socket.on("invalidateModelCartridges", async () => {
          await queryClient.invalidateQueries({
            queryKey: ["modelsCartridgesDetailed"],
          });
          await queryClient.invalidateQueries({
            queryKey: ["modelsCartridges"],
          });
        });

        socket.on(
          "invalidateKabinets",
          async (data: CreateKabinetEventType) => {
            await queryClient.invalidateQueries({
              queryKey: ["kabinets", data.division?.id],
            });
            await queryClient.invalidateQueries({
              predicate: (query) => {
                const queryKey = query.queryKey;
                if (queryKey[0] === "kabinetsByUserIdForCreateUser") {
                  const userChoices = queryKey[1];
                  if (Array.isArray(userChoices)) {
                    return userChoices.some(
                      (choice: { id: number }) =>
                        choice.id === data.division?.id,
                    );
                  }
                }
                return false;
              },
            });
          },
        );

        socket.on(
          "invalidateCartridgesOfDecomissioning",
          async (data: DecomissioningCartrdigeEventType) => {
            await queryClient.invalidateQueries({
              queryKey: ["cartridges", data.warehouseId],
            });
            await queryClient.invalidateQueries({
              queryKey: ["dashboard"],
            });
          },
        );

        socket.on(
          "invalidateCartridgeOfMovement",
          async (data: MovementCartridgeEventType) => {
            await queryClient.invalidateQueries({
              queryKey: ["cartridges", data.oldDivisionId],
            });
            await queryClient.invalidateQueries({
              queryKey: ["cartridges", data.newDivisionId],
            });
            await queryClient.invalidateQueries({
              queryKey: ["dashboard"],
            });
          },
        );

        socket.on(
          "invalidateCartridgeOfReceiving",
          async (data: ReceivingCartridgeEventType) => {
            await queryClient.invalidateQueries({
              queryKey: ["cartridges", data.warehouseId],
            });
            await queryClient.invalidateQueries({
              queryKey: ["dashboard"],
            });
          },
        );
      }
    },
    [role, logoutHandler, queryClient],
  );

  useEffect(() => {
    if (role?.roleName === undefined || !token) {
      return;
    }

    const newSocket = io({
      autoConnect: false,
      auth: { token: token },
      withCredentials: true,
      transports: ["websocket", "polling"],
    });

    newSocket.connect();

    const handleConnect = () => {
      console.log("connect");
    };

    const handleDisconnect = () => {
      console.log("disconnect");
    };

    const handleConnectError = () => {
      console.log("connect_error");
    };

    newSocket.on("connect", handleConnect);

    newSocket.on("disconnect", handleDisconnect);

    newSocket.on("connect_error", handleConnectError);

    registerEventListeners(newSocket);

    return () => {
      newSocket.removeAllListeners();
      newSocket.disconnect();
      newSocket.close();
    };
  }, [token, registerEventListeners, role]);

  return <SocketContext value={undefined}>{children}</SocketContext>;
}
