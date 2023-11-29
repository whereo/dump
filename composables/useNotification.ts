import { computed, ref } from "vue";
import { AppNotification } from "../types";

const messages = ref<AppNotification[]>([]);

export const useNotification = () => {
  const addMessage = (notification: AppNotification) => {
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
    addMessage,
    listNotifications,
    deleteNotification,
  };
};
