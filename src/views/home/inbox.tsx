import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { Socket } from "socket.io-client";
import api from "../../service/api";

interface Membres {
  _id?: string;
  nom: string;
  prenom: string;
  email: string;
  telephone?: number;
  adresse?: string;
  origine?: string;
  image?: File;
  faculte?: string;
  sexe?: string;
  dateNaissance?: string

}
interface Derigeant {
  _id?: string;
  nom: string;
  prenom: string;
  email: string;
  telephone?: number;
  adresse?: string;
  origine?: string;
  image?: File;
  faculte?: string;
  sexe?: string;
  dateNaissance?: string
  club: Club[]

}
interface Club {
  _id?: string;
  nomClub: string;
  description: string;
  derigentClub?: Derigeant;
  logo?: File
  activitePrincipale?: string
  mission?: string
  vision?: string
  objectifs?: string
  status?: boolean;
  cotisation: number

}
const Inbox = () => {
  const [membres, setMembres] = useState<Membres[]>([]);
  const [derigeant, setDerigeant] = useState<Club>()
  const localStorageData = localStorage.getItem('userClub')
    ? JSON.parse(localStorage.getItem('userClub') as string)
    : null;

  const userId = localStorageData ? localStorageData.user?._id : null;
  const { id } = useParams()
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  // const [chatHistory, setChatHistory] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  // const socket = useSocket("http://localhost:5000");
  useEffect(() => {
    const socketInstance = io("http://localhost:5000", {
      transports: ["websocket"],
    });

    setSocket(socketInstance);

    const user = JSON.parse(localStorage.getItem("userClub") as string)?.user;
    if (user._id) {
      socketInstance.emit("registerUser", user._id);
      socketInstance.emit("joinUserRoom", { userId: user._id });
      socketInstance.emit("requestPrivateHistory",{
  sender: user._id,
  recepientId: selectedUserId});
    }

    socketInstance.on("privateChatHistory", (history: any[]) => {
  setMessages(history.filter(msg => msg.type === 'private'));
    });

    socketInstance.on("newPrivateMessage", (msg: any) => {
if (msg.type === 'private' && 
     (msg.sender._id === selectedUserId || msg.recepientId === selectedUserId)) {
    setMessages(prev => [...prev, msg]);
  }    });
  socketInstance.on("privateMessageSent", (msg: any) => {
    setMessages((prev) => [...prev, msg]);
  });
    return () => {
      socketInstance.disconnect();
    };
  }, [userId, selectedUserId]);

/*    useEffect(() => {
                  const user = JSON.parse(localStorage.getItem("userClub") as string)?.user;
  
    if (socket && user._id && selectedUserId) {
      socket.emit("joinUserRoom", { 
        userId: user._id,
        otherUserId: selectedUserId 
      });
      socket.emit("requestPrivateHistory", {
        senderId: user._id,
        recepientId: selectedUserId
      });
    }
  }, [selectedUserId, socket, userId]); */

  //envoyer le message
  const handleSendMessage = () => {
    if (!message.trim() || !socket || !selectedUserId) return;

    socket.emit("sendPrivateMessage", {
      sender: userId,
      recepientId: selectedUserId,
      content: message,
    });

    setMessage("");
  };

  //filter membre suivi club
  const getMembresByClub = async () => {
    try {
      const response = await api.getClub(id);
      const allMembre = response.data.getclub.membres;
      const membrePaid = allMembre
        .filter((membre: any) => membre.club.some(
          (c: any) => c.clubId === id && c.isPaid === true
        ))
        .filter((m: any) => m._id !== userId); // ⛔ exclure l'utilisateur connecté
      setMembres(membrePaid);
    } catch (error) {
      console.error(error);
    }
  };

  const getDerigeant = async () => {
    try {
      const response = await api.getClub(id);
      const dirigeant = response.data.getclub.derigentClub;
      if (dirigeant && dirigeant._id !== userId) { // ⛔ exclure si c'est l'utilisateur connecté
        setDerigeant(response.data.getclub);
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getMembresByClub()
    getDerigeant()
  }, [id])

  const getUserNameById = (id: string) => {
    if (!id) return "Inconnu";

    if (id === derigeant?.derigentClub?._id) {
      return `${derigeant?.derigentClub?.nom ?? ""} ${derigeant?.derigentClub?.prenom ?? ""}`;
    }

    if (membres.length === 0) {
      console.warn("Les membres ne sont pas encore chargés !");
    }

    const membre = membres.find((m) => m._id === id);
    console.log("nom de membre sélectionné", membre ? `${membre.prenom} ${membre.nom}` : "Inconnu");

    return membre ? `${membre.prenom} ${membre.nom}` : "Inconnu";
  };
  return (
    <div className="h-screen flex bg-gray-100">
      {/* Sidebar - Listes des conversations */}
      <div className="w-1/3 bg-white border-r p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Conversations</h2>
        <ul className="space-y-2">
          {derigeant?.derigentClub && (
            <li
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${selectedUserId === derigeant.derigentClub._id ? "bg-blue-100" : "hover:bg-gray-100"
                }`}
              onClick={() => setSelectedUserId(derigeant.derigentClub?._id || null)}
            >
              <img
                src={`http://localhost:5000/file/${derigeant.derigentClub.image}`}
                className="w-10 h-10 rounded-full"
                alt="avatar"
              />
              <div className="flex-1">
                <p className="text-sm font-medium">{derigeant.derigentClub.nom}</p>
                <p className="text-xs text-gray-500 truncate">Dirigeant du club</p>
              </div>
              <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">👑</span>
            </li>
          )}

          {membres.map((item, i) => (
            <li key={i}
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${selectedUserId === item._id
                  ? "bg-blue-100"
                  : "hover:bg-gray-100"
                }`}
              onClick={() => setSelectedUserId(item._id || null)}>
              <img
                src={`http://localhost:5000/file/${item.image}`}
                className="w-10 h-10 rounded-full"
                alt="avatar"
              />
              <div className="flex-1">
                <p className="text-sm font-medium">{item.nom}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Fenêtre de chat */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b p-4 flex items-center gap-3">
          {selectedUserId ? (
            <>
              <img
                src={`http://localhost:5000/file/${membres.find((m) => m._id === selectedUserId)?.image ||
                  (derigeant?.derigentClub?._id === selectedUserId
                    ? derigeant?.derigentClub?.image
                    : "")
                  }`}
                className="w-10 h-10 rounded-full"
                alt="avatar"
              />
              <div>
                <h3 className="text-sm font-semibold">
                  {getUserNameById(selectedUserId)}
                </h3>
                <p className="text-xs text-gray-500">En ligne</p>
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-500">Sélectionnez un utilisateur</p>
          )}
        </div>



        {/* Messages */}
       <div className="flex-1 overflow-y-auto p-4 space-y-4">
  {messages.map((msg, index) => (
    <div
      key={index}
      className={`flex ${msg.sender?._id === userId ? 'justify-end' : 'items-start gap-2'}`}
    >
      {msg.sender?._id !== userId && (
        <img
          src={`http://localhost:5000/file/${msg.sender?.image}`}
          className="w-8 h-8 rounded-full"
          alt="user"
        />
      )}
      <div
        className={`text-sm p-2 rounded-xl max-w-xs ${
          msg.sender?._id === userId
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-black'
        }`}
      >
        {msg.content}
      </div>
    </div>
  ))}
</div>


        {/* Input */}
        <div className="p-4 bg-white border-t">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Écrire un message..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-600"
            >
              Envoyer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
