import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

}
const InboxDerigeant = () => {
    const [membres, setMembres] = useState<Membres[]>([]);
    const [derigeant,setDerigeant]=useState<Derigeant>()
    const localStorageData = localStorage.getItem('userClub')
    ? JSON.parse(localStorage.getItem('userClub') as string)
    : null;

  const userId = localStorageData ? localStorageData.user?._id : null;

    const { clubId } = useParams()
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
    const getDerigenant=async()=>{
        try {
            const response=await api.getDerigeantByClub(userId)
            setDerigeant(response.data.data)
            console.log('derigeant de ce club',response.data)
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
                                <p className="text-sm font-medium">User {i + 1}</p>
                                <p className="text-xs text-gray-500 truncate">Dernier message aperçu...</p>
                            </div>
                            <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">2</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Fenêtre de chat */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="bg-white border-b p-4 flex items-center gap-3">
                    <img src="https://i.pravatar.cc/150?img=6" className="w-10 h-10 rounded-full" alt="avatar" />
                    <div>
                        <h3 className="text-sm font-semibold">User 1</h3>
                        <p className="text-xs text-gray-500">En ligne</p>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {/* Message reçu */}
                    <div className="flex items-start gap-2">
                        <img src="https://i.pravatar.cc/150?img=6" className="w-8 h-8 rounded-full" alt="user" />
                        <div className="bg-gray-200 text-sm p-2 rounded-xl max-w-xs">Salut, tu es dispo ?</div>
                    </div>

                    {/* Message envoyé */}
                    <div className="flex justify-end">
                        <div className="bg-blue-500 text-white text-sm p-2 rounded-xl max-w-xs">Oui, je suis là !</div>
                    </div>
                </div>

                {/* Input */}
                <div className="p-4 bg-white border-t">
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Écrire un message..."
                            className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-600">
                            Envoyer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InboxDerigeant;
