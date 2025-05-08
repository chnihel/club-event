import React, { useEffect, useState } from 'react'
import api from '../../service/api';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
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
  
  const ListEvent: React.FC = () => {
    const [event, setEvent] = useState<Event[]>([]);
    const navigate=useNavigate()
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
    const handleJoin = () => {
        if (!membreId) {
            Swal.fire({
                icon: 'info',
                title: 'Login Required',
                text: 'Please log in as a member to follow a club.',
                confirmButtonText: 'Login',
                confirmButtonColor: '#6b46c1',
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate('/login')};})
          
          return;
        }
      };
      
      const handleFollow = () => {
        if (!membreId) {
            Swal.fire({
                icon: 'warning',
                title: 'Access Denied',
                text: 'You must create a member account to join this event.',
                confirmButtonText: 'Login',
                confirmButtonColor: '#6b46c1',
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate('/login');
                }
              });
          
          return;
        }
      };
  
    useEffect(() => {
      getAllEvent();
  
    }, []);
  
  
 
  
  
  
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
                    <button className="absolute top-0 right-5 bg-black text-white text-xs px-2 py-1 rounded-full"   onClick={handleFollow}>FOLLOW</button>
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
  
                    {item.club && (
                      <Link to={`/homeVisiteur/detailsClub/${item.club._id}`}>
                        <button className="bg-purple-600 text-white text-xs px-4 py-2 rounded-full font-bold hover:bg-blue-700 transition">
                          📄 Details
                        </button>
                      </Link>
                    )}
                    {item.club && (
                        <button className="bg-red-600 text-white text-xs px-4 py-2 rounded-full font-bold flex items-center gap-1 hover:bg-red-700 transition"
                        onClick={handleJoin}>
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
  )
}

export default ListEvent
