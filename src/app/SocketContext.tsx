import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { decryptedProfile } from "./helpers/decryptedProfile";
import { useProfileStore } from "./stores/profile/useProfileStore";
import { SocketContext } from "@/hooks/useSocket";
import {
  CreateKabinetEventType,
  DecomissioningCartrdigeEventType,
  DeliveryCartridgeEventType,
  MovementCartridgeEventType,
  ReceivingCartridgeEventType,
  UpdateUserEventType,
} from "./api/generated";

const SOCKET_URL = "http://localhost:3000";

export function SocketProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const token = useProfileStore((state) => state.access_token);
  const queryClient = useQueryClient();

  useEffect(() => {
    const user = decryptedProfile();
    if (!user) {
      return;
    }

    const newSocket = io(SOCKET_URL, {
      autoConnect: false,
      auth: { token: token },
      withCredentials: true,
    });

    newSocket.connect();

    newSocket.on("connect", () => {
      setIsConnected(true);
    });

    newSocket.on("disconnect", () => {
      setIsConnected(false);
      // обработка?
    });

    newSocket.on("connect_error", () => {
      //   обработка ошибок?
      // Можно добавить логику переподключения или выхода
    });

    registerEventListeners(newSocket, queryClient);

    setSocket(newSocket);

    return () => {
      newSocket.removeAllListeners();
      newSocket.disconnect();

      setSocket(null);
      setIsConnected(false);
    };
  }, [queryClient, token]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
}

// Подписки распределяются по ролям
function registerEventListeners(socket: Socket, queryClient: QueryClient) {
  const user = decryptedProfile();

  if (["staff", "user", "admin"].includes(user.role.roleName)) {
    socket.on("invalidateUserCard", async (data: UpdateUserEventType) => {
      const user = decryptedProfile();
      const { userId } = data;

      switch (user.role.roleName) {
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
          await queryClient.invalidateQueries({ queryKey: ["users", "table"] });
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
        switch (user.role.roleName) {
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
  }

  if (["user", "admin"].includes(user.role.roleName)) {
    socket.on("invalidateModelCartridges", async () => {
      await queryClient.invalidateQueries({
        queryKey: ["modelsCartridgesDetailed"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["modelsCartridges"],
      });
    });

    socket.on("invalidateKabinets", async (data: CreateKabinetEventType) => {
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
                (choice: { id: number }) => choice.id === data.division?.id,
              );
            }
          }
          return false;
        },
      });
    });

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
}
