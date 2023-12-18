<template>
  <div
    v-if="listNotifications"
    class="fixed bottom-0 left-0 right-0 pointer-events-none"
  >
    <TransitionGroup
      tag="div"
      name="list"
      class="mb-4 flex flex-col gap-y-4 items-center pointer-events-auto"
    >
      <NotificationItem
        v-for="(notification, index) in listNotifications"
        :key="notification.content"
        :data-index="index"
        :notification="notification"
        @delete="deleteNotification(notification)"
      />
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
const { listNotifications, deleteNotification } = useNotification();
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
