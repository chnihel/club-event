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
          {event.map((item, index) => (
       
              <div key={index} className="relative bg-white shadow-md rounded-xl overflow-hidden">
              
                {item.club && (
                  <div className="relative">
                    <img src={`http://localhost:5000/file/${item.club.logo}`}
                      className="w-full object-cover h-[30px]" />
                    <button className="absolute top-0 right-5 bg-black text-white text-xs px-2 py-1 rounded-full"   onClick={handleFollow}>FOLLOW</button>
                  </div>
                )}

  
  <div className="p-4 space-y-3">
          <div className="flex justify-between">
            <span className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full">{item.lieuEvent}</span>
            <span className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full">{item.frais} DT</span>
          </div>

          <h3 className="text-base font-semibold">{item.nomEvent}</h3>

          {item.derigeantClub && (
            <div className="flex items-center gap-3">
              <img
                src={`http://localhost:5000/file/${item.derigeantClub.image}`}
                alt="Dirigeant"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-sm font-medium">{item.derigeantClub.nom}</p>
                <p className="text-xs text-gray-500">{item.derigeantClub.telephone}</p>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 mt-3">
            {item.club && (
             <div className="flex flex-col sm:flex-row flex-wrap gap-2 mt-3">
             <Link to={`/homevisiteur/detailsClub/${item.club._id}`} className="w-full sm:w-auto">
               <button className="w-full sm:w-auto bg-purple-600 text-white text-xs px-4 py-2 rounded-full hover:bg-indigo-700 transition">
                 📄 Details
               </button>
             </Link>
           
             <Link to={`/homevisiteur/gallerie/${item.club._id}`} className="w-full sm:w-auto">
               <button className="w-full sm:w-auto bg-teal-600 text-white text-xs px-4 py-2 rounded-full hover:bg-teal-700 transition">
                 🖼️ Gallerie
               </button>
             </Link>
           
             <button
               onClick={handleJoin}
               className="w-full sm:w-auto bg-red-600 text-white text-xs px-4 py-2 rounded-full hover:bg-red-700 transition flex items-center justify-center"
             >
               <span className="mr-1">&#10132;</span> JOIN NOW
             </button>
           </div>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
  )
}

export default ListEvent
