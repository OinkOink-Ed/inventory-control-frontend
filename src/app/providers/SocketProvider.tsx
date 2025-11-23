import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useProfileStore } from "../stores/profile/useProfileStore";
import { SocketContext } from "@/app/providers/hooks/useSocketContext";
import {
  CreateKabinetEventType,
  DecomissioningCartrdigeEventType,
  DeliveryCartridgeEventType,
  MovementCartridgeEventType,
  ReceivingCartridgeEventType,
  UpdateUserEventType,
} from "../api/generated";
import { useLogout } from "../../hooks/useLogout";
import { useRoleContext } from "@/app/providers/hooks/useRoleContext";

export function SocketProvider({ children }: PropsWithChildren) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const token = useProfileStore((state) => state.access_token);
  const queryClient = useQueryClient();
  const logoutHandler = useLogout();

  const { roleName } = useRoleContext();

  const registerEventListeners = useCallback(
    (socket: Socket, queryClient: QueryClient) => {
      if (roleName === undefined) {
        return;
      }
      if (["staff", "user", "admin"].includes(roleName)) {
        socket.on("invalidateUserCard", async (data: UpdateUserEventType) => {
          const { userId } = data;

          switch (roleName) {
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
            switch (roleName) {
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

      if (["user", "admin"].includes(roleName)) {
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
    [roleName, logoutHandler],
  );

  useEffect(() => {
    if (roleName === undefined || !token) {
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
      setIsConnected(true);
    };

    const handleDisconnect = () => {
      setIsConnected(false);
      console.log("disconnect");
    };

    const handleConnectError = () => {
      console.log("connect_error");
    };

    newSocket.on("connect", handleConnect);

    newSocket.on("disconnect", handleDisconnect);

    newSocket.on("connect_error", handleConnectError);

    registerEventListeners(newSocket, queryClient);

    setSocket(newSocket);

    return () => {
      newSocket.removeAllListeners();
      newSocket.disconnect();
      newSocket.close();

      setSocket(null);
      setIsConnected(false);
    };
  }, [queryClient, token, registerEventListeners, roleName]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
}
