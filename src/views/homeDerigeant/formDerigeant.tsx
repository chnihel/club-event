import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../service/api";
import useSocket from "../../hooks/useSocket";
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
    club:Club[]

}
interface Club {
    _id?: string
    nomClub: string
    logo: File
  
  }

const ForumDerigeant = () => {
    const [membres, setMembres] = useState<Membres[]>([]);
    const [derigeant, setDerigeant] = useState<Derigeant>()
    const localStorageData = localStorage.getItem('userClub')
        ? JSON.parse(localStorage.getItem('userClub') as string)
        : null;

    const userId = localStorageData ? localStorageData.user?._id : null;

    const { clubId } = useParams()

    //send message
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<any[]>([]);
    const [socket, setSocket] = useState<Socket | null>(null);
        const [chatHistory, setChatHistory] = useState([]);
   // const socket = useSocket("http://localhost:5000");
   useEffect(() => {
    const socketInstance = io("http://localhost:5000", {
      transports: ["websocket"],
    });
  
    setSocket(socketInstance);
  
    const user = JSON.parse(localStorage.getItem("userClub") as string)?.user;
    if (user && user._id) {
      socketInstance.emit("registerUser", user._id);
      socketInstance.emit("joinClub", { clubId }); 
      socketInstance.emit("requestHistory", clubId);
    }
  
    socketInstance.on("chatHistory", (history: any[]) => {
  setMessages(history.filter(msg => msg.type === 'club'));
    });
  
    socketInstance.on("newMessage", (msg: any) => {
 if (msg.type === 'club') {
    setMessages(prev => [...prev, msg]);
  }    });
  
    return () => {
      socketInstance.disconnect();
    };
  }, [clubId]);
  // Envoyer message
  const handleSendMessage = () => {
    if (!message.trim() || !socket) return;
  
    socket.emit("sendMessage", {
      sender: userId,
      content: message,
      clubId,
    });
  
    setMessage("");
  };
  

      
     
    //filter membre suivi club
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
    return (
        <div className="h-screen flex bg-gray-100">
            {/* Sidebar - Listes des conversations */}
            <div className="w-1/3 bg-white border-r p-4 overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Conversations</h2>
                <ul className="space-y-2">
                    {derigeant && (
                        <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                            <img
                                src={`http://localhost:5000/file/${derigeant.image}`}
                                className="w-10 h-10 rounded-full"
                                alt="avatar"
                            />
                            <div className="flex-1">
                                <p className="text-sm font-medium">{derigeant.nom}</p>
                                <p className="text-xs text-gray-500 truncate">Dernier message aperçu...</p>
                            </div>
                            <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">2</span>
                        </li>
                    )}
                    {membres.map((item, i) => (
                        <li key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
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
                {derigeant?.club.map((item,index)=>(
                    <div className="bg-white border-b p-4 flex items-center gap-3">
                    <img src={`http://localhost:5000/file/${item.logo}`} className="w-10 h-10 rounded-full" alt="avatar" />
                    <div>
                    <h3 className="text-sm font-semibold">{item.nomClub || 'Nom du Club'}</h3>
                    <p className="text-xs text-gray-500">En ligne</p>
                    </div>
                </div>
                ))}
                

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
  {messages.map((msg, i) => (
    <div key={i} className={`flex ${msg.sender?._id === userId ? 'justify-end' : 'items-start gap-2'}`}>
      {msg.sender !== userId && (
         <img
         src={`http://localhost:5000/file/${msg.sender?.image}`}
         className="w-8 h-8 rounded-full"
         alt="user"
       />
      )}
      <div className={`text-sm p-2 rounded-xl max-w-xs ${msg.sender === userId ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
        <strong>{msg.sender?.prenom}:</strong>{msg.content}
      </div>
    </div>
  ))}
</div>


                {/* Input */}
                <div className="p-4 bg-white border-t">
                    <div className="flex items-center gap-2">
                        <input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            type="text"
                            placeholder="Écrire un message..."
                            className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm"
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

export default ForumDerigeant;
