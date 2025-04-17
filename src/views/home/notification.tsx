import React from "react";
import { Bell, CheckCircle, XCircle } from "lucide-react"; // Icônes sympas

const notifications = [
  {
    id: 1,
    title: "Nouvelle tâche assignée",
    description: "Tu as une nouvelle tâche dans le projet ITGATE.",
    time: "Il y a 2 minutes",
    type: "info",
  },
  {
    id: 2,
    title: "Message de Salem",
    description: "Salut ! Peux-tu checker le dernier commit ?",
    time: "Il y a 10 minutes",
    type: "message",
  },
  {
    id: 3,
    title: "Tâche terminée",
    description: "Yves a complété la tâche : Intégration calendrier.",
    time: "Il y a 1 heure",
    type: "success",
  },
  {
    id: 4,
    title: "Erreur détectée",
    description: "Une erreur a été détectée dans la build de production.",
    time: "Il y a 3 heures",
    type: "error",
  },
];

const getIcon = (type: string) => {
  switch (type) {
    case "success":
      return <CheckCircle className="text-green-500 w-6 h-6" />;
    case "error":
      return <XCircle className="text-red-500 w-6 h-6" />;
    case "message":
      return <Bell className="text-blue-400 w-6 h-6" />;
    default:
      return <Bell className="text-gray-400 w-6 h-6" />;
  }
};

const Notifications = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Notifications</h2>
        <div className="space-y-4">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-100 transition"
            >
              {getIcon(notif.type)}
              <div>
                <h3 className="font-semibold text-sm">{notif.title}</h3>
                <p className="text-xs text-gray-600">{notif.description}</p>
                <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
