"use client";

import { createContext, useState } from "react";
import { NotificationType } from "@/model/notification.model";

export const NotificationContext = createContext({
  notification: [] as NotificationType[],
  setNotification: (notification: NotificationType[]) => {
    [] as NotificationType[];
  },
});

export const NotificationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notification, setNotification] = useState<NotificationType[]>([]);

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
