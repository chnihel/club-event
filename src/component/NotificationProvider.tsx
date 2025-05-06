import { useState, useEffect, createContext, ReactNode } from "react";
import { messaging, onMessageListener, requestFCMToken } from "../firebase";
import { onMessage } from "firebase/messaging";

interface NotificationPayload {
    notification: {
      title: string;
      body: string;
    };
  }
  
  interface NotificationContextType {
    fcmToken: string | null;
  }
  
  export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);
  
  interface NotificationProviderProps {
    children: ReactNode;
  }
  
  const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
    const [fcmToken, setFcmToken] = useState<string | null>(null);
  
    useEffect(() => {
      console.log("Début de la récupération du token FCM");
      const localStorageData = localStorage.getItem('userClub')
        ? JSON.parse(localStorage.getItem('userClub') as string)
        : null;

      const tokenJwt = localStorageData ? localStorageData.tokens?.refreshToken: null;
      console.log('Club manager ID:', tokenJwt);
      // Récupération du token FCM
      requestFCMToken().then((token) => {
        if (token) {
          console.log("FCM Token reçu:", token);  // Log le token récupéré
          setFcmToken(token);

          //enregister fcmToken
          fetch('http://localhost:5000/membre/fcm-token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${tokenJwt}`, 
            },
            body: JSON.stringify({fcmToken:token }),
          })
            .then(async res => {
              if (!res.ok) throw new Error('Erreur HTTP');
              const text = await res.text() 
              console.log("Réponse brute du backend:", text);
            })
            .catch(error => {
              console.error("Erreur lors de l'envoi du token au backend:", error);
            });
        } else {
          console.log("Aucun token FCM reçu");
        }
      }).catch((error) => {
        console.error("Erreur lors de la récupération du token FCM:", error);
      });
  
      // Vérification de la fonction onMessage
      if (messaging) {
        console.log("Écoute des notifications avec onMessage...");
        onMessage(messaging, (payload) => {
          console.log("Message reçu via onMessage:", payload); 
          const notificationPayload = payload as NotificationPayload;
  
          if (notificationPayload.notification) {
            console.log(`Notification reçue : ${notificationPayload.notification.title}`);
            alert(`Notification reçue : ${notificationPayload.notification.title}`);
          } else {
            console.log("Pas de notification dans le message reçu", notificationPayload);
          }
        });
      } else {
        console.log("Messaging n'est pas initialisé");
      }
    }, []);
  
    return (
      <NotificationContext.Provider value={{ fcmToken }}>
        {children}
      </NotificationContext.Provider>
    );
  };
  
  export default NotificationProvider;