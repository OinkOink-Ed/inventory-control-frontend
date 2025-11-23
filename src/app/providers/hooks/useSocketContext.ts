import { createContext /*useContext*/ } from "react";
import { Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

export const SocketContext = createContext<SocketContextType | undefined>(
  undefined,
);

//Пока что мне негде и не для чего получать контекст сокета

// export const useSocket = () => {
//   const context = useContext(SocketContext);
//   if (!context) {
//     throw new Error("Сокет должен использоваться вместе с Сокет провадйером");
//   }
//   return context;
// };
