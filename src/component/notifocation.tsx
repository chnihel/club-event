// utils/notifications.tsx
import { useContext, useEffect } from 'react';
import { NotificationContext } from './NotificationProvider';

export const useSendNotification = () => {
  const notificationContext = useContext(NotificationContext);
  const fcmToken = notificationContext?.fcmToken;

  useEffect(() => {
    if (fcmToken) {
      console.log("FCM Token disponible :", fcmToken);
    }
  }, [fcmToken]);

  const sendNotification = async (title: string, body: string) => {
    if (fcmToken) {
      try {
        const response = await fetch('http://localhost:5000/notification', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            body,
            deviceIds: [fcmToken],
          }),
        });

        const result = await response.json();
        console.log("Notification envoyée :", result);
      } catch (error) {
        console.error("Erreur lors de l'envoi de la notification", error);
      }
    } else {
      console.log('Aucun token FCM disponible');
    }
  };

  return { sendNotification };
};
