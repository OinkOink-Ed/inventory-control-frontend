// import type {
//   ProfileActions,
//   ProfileStore,
// } from "@features/auth/model/store/profile/types.ts";
// import { create } from "zustand";
// import { persist, createJSONStorage } from "zustand/middleware";

// export const useProfileStore = create<ProfileStore & ProfileActions>()(
//   persist(
//     (set) => ({
//       access_token: "",
//       refresh_token: "",
//       setProfile: (res) => {
//         set({
//           access_token: res.access_token,
//           refresh_token: res.refresh_token,
//         });
//       },
//       clearProfile: () => {
//         set({ access_token: "", refresh_token: "" });
//         useProfileStore.persist.clearStorage();
//       },
//     }),
//     {
//       name: "profileStorage",
//       storage: createJSONStorage(() => localStorage),
//     },
//   ),
// );

import type { ProfileActions, ProfileStore } from "./types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Экспортируем store как именованный экспорт
export const profileStore = create<ProfileStore & ProfileActions>()(
  persist(
    (set) => ({
      access_token: "",
      refresh_token: "",
      setProfile: (res) => {
        set({
          access_token: res.access_token,
          refresh_token: res.refresh_token,
        });
      },
      clearProfile: () => {
        set({ access_token: "", refresh_token: "" });
        // Очищаем persisted storage
        useProfileStore.persist.clearStorage();
      },
    }),
    {
      name: "profileStorage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

// Для обратной совместимости оставляем useProfileStore
export const useProfileStore = profileStore;
