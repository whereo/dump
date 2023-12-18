import { computed, ref } from "vue";
import type { AppNotification } from "@/types/types";

const messages = ref<AppNotification[]>([]);

export const useNotification = () => {
  const addNotification = (notification: AppNotification) => {
    messages.value.push(notification);
  };

  const listNotifications = computed(() => messages.value);

  const deleteNotification = (notification: AppNotification) => {
    const index = messages.value.findIndex((m) => m === notification);

    if (index !== -1) {
      messages.value.splice(index);
    }
  };

  return {
    addNotification,
    listNotifications,
    deleteNotification,
  };
};
