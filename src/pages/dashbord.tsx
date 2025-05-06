import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../service/api";

interface Event {
  _id?: string;
  nomEvent: string;
  dateEvent: Date;
  lieuEvent: string;
  derigeantClub?: DerigeantClub;
  club: Club
  frais: number
}
interface DerigeantClub {
  _id: string;
  nom: string;
  prenom: string;
  image: string;
  telephone: number
}
interface Club {
  _id?: string
  nomClub: string
  logo: File

}

const Dashboard: React.FC = () => {
  const [event, setEvent] = useState<Event[]>([]);
  const [selectedEvent,setSelectedEvent]=useState<Event | null>(null)
  const localStorageData = localStorage.getItem('userClub')
    ? JSON.parse(localStorage.getItem('userClub') as string)
    : null;
  const membreId = localStorageData ? localStorageData.user?._id : null;
  const getAllEvent = async () => {
    try {
      const response = await api.listEvent();
      setEvent(response.data.listeevenement
      );
      console.log('List events:', response.data.listeevenement
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllEvent();

  }, []);
const navigate=useNavigate()
  const suiviEvent=async(eventId:any)=>{
    try {
      const response=await api.suiviEvent(membreId,eventId)
      console.log('membre suivi un evenemt et passe a paiement',response)
      navigate(`/homeMembre/paiement/event/${eventId}/${membreId}`);
    } catch (error) {
      console.log(error)
    }
  }

  const suiviClub=async(clubId:any)=>{
    try {
      const response=await api.suiviClub(membreId,clubId)
      console.log('membre suivi un evenemt et passe a paiement',response)
      navigate(`/homeMembre/paiement/${clubId}/${membreId}`);
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-6">Accueil</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {event.map((item, index) => {
          return (
            <div className="relative bg-white shadow-md rounded-xl overflow-hidden">
            
              {item.club && (
                <div className="relative">
                  <img src={`http://localhost:5000/file/${item.club.logo}`}
                    className="w-full object-cover h-[30px]" />
                  <button onClick={()=>suiviEvent(item._id!)} className="absolute top-0 right-5 bg-black text-white text-xs px-2 py-1 rounded-full">FOLLOW</button>
                </div>
              )}

              <div className="p-4 space-y-2">
                <span className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full">{item.lieuEvent}</span>

                <span className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full">{item.frais}</span>
                <h3 className="text-sm font-semibold">{item.nomEvent}</h3>
                <div className="flex items-center justify-between">
                  {item.derigeantClub && (
                    <div className="flex items-center gap-2">
                      <img
                        src={`http://localhost:5000/file/${item.derigeantClub.image}`}
                        className="w-8 h-8 rounded-full"
                        alt="Author"
                      />
                      <div>
                        <p className="text-xs font-medium">{item.derigeantClub.nom}</p>
                        <p className="text-xs text-gray-500">{item.derigeantClub.telephone}</p>
                      </div>
                    </div>
                  )}


                  {/* Bouton */}

                  {item.club && (
                    <Link to={`/homeMembre/detailsClub/${item.club._id}`}>
                      <button className="bg-purple-600 text-white text-xs px-4 py-2 rounded-full font-bold hover:bg-blue-700 transition">
                        📄 Details
                      </button>
                    </Link>
                  )}
                  {item.club && (
                      <button className="bg-red-600 text-white text-xs px-4 py-2 rounded-full font-bold flex items-center gap-1 hover:bg-red-700 transition"
                      onClick={()=>suiviClub(item.club._id)}>
                        <span>&#10132;</span> JOIN NOW
                      </button>
                  )}



                </div>

              </div>
            </div>
          )
        })}


      </div>

    </div>
  );
};

export default Dashboard;
