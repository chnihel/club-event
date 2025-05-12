import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../service/api";
import { io } from "socket.io-client";
import { Socket } from "socket.io-client";

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

}
const InboxDerigeant = () => {
    const [membres, setMembres] = useState<Membres[]>([]);
    const [derigeant, setDerigeant] = useState<Derigeant>()
    const localStorageData = localStorage.getItem('userClub')
        ? JSON.parse(localStorage.getItem('userClub') as string)
        : null;

    const userId = localStorageData ? localStorageData.user?._id : null;

    const { clubId } = useParams()

    //send message a un membre specifique
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<any[]>([]);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

    useEffect(() => {
        const socketInstance = io("http://localhost:5000", {
            transports: ["websocket"],
        });

        setSocket(socketInstance);

        const user = JSON.parse(localStorage.getItem("userClub") as string)?.user;
        if (user && user._id) {
    socketInstance.emit("registerUser", user._id);
    socketInstance.emit("joinUserRoom", { userId: user._id });
    
    if (selectedUserId) {
      socketInstance.emit("requestPrivateHistory", {
        sender: user._id,
        recepientId: selectedUserId
      });
    }
  }

        socketInstance.on("privateChatHistory", (history: any[]) => {
            setMessages(history.filter(msg => msg.type === 'private'));
        });

        
  socketInstance.on("newPrivateMessage", (msg: any) => {
    if (msg.type === 'private' && 
     (msg.sender._id === selectedUserId || msg.recepientId === selectedUserId)) {
    setMessages(prev => [...prev, msg]);
  }
  });

  socketInstance.on("privateMessageSent", (msg: any) => {
    setMessages((prev) => [...prev, msg]);
  });

        return () => {
            socketInstance.disconnect();
        };
    }, [userId, selectedUserId]);

/*     useEffect(() => {
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

    //getMembre for this club
    const getMembresByClub = async () => {
        try {
            const response = await api.getClub(clubId);
            const allMembre = response.data.getclub.membres
            const membrePaid = allMembre.filter((membre: any) => membre.club.some(
                (c: any) => c.clubId === clubId && c.isPaid === true
            ));
            setMembres(membrePaid);
            console.log('List of membres suivi: et paid', membrePaid);
        } catch (error) {
            console.error(error);
        }
    };
    const getDerigenant = async () => {
        try {
            const response = await api.getDerigeantByClub(userId)
            setDerigeant(response.data.data)
            console.log('derigeant de ce club', response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getMembresByClub();
        getDerigenant()
    }, []);

    const getUserNameById = (id: string) => {
        if (id === derigeant?._id) return `${derigeant.prenom} ${derigeant.nom}`;
        const membre = membres.find((m) => m._id === id);
        return membre ? `${membre.prenom} ${membre.nom}` : "Inconnu";
    };
    return (
        <div className="h-screen flex bg-gray-100">
            {/* Sidebar */}
            <div className="w-1/3 bg-white border-r p-4 overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Conversations</h2>
                <ul className="space-y-2">
                    {membres.map((item, i) => (
                        <li
                            key={i}
                            className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${selectedUserId === item._id
                                    ? "bg-blue-100"
                                    : "hover:bg-gray-100"
                                }`}
                            onClick={() => setSelectedUserId(item._id || null)}
                        >
                            <img
                                src={`http://localhost:5000/file/${item.image}`}
                                className="w-10 h-10 rounded-full"
                                alt="avatar"
                            />
                            <div className="flex-1">
                                <p className="text-sm font-medium">{item.nom}</p>
                                <p className="text-xs text-gray-500 truncate">
                                    Dernier message aperçu...
                                </p>
                            </div>
                            <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">
                                2
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="bg-white border-b p-4 flex items-center gap-3">
                    {selectedUserId ? (
                        <>
                            <img
                                src={`http://localhost:5000/file/${membres.find((m) => m._id === selectedUserId)?.image || ""
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

export default InboxDerigeant;
