export type AppNotification = {
  title: string;
  content?: string;
  action?: {
    name: string;
    callback: Function;
  };
};
