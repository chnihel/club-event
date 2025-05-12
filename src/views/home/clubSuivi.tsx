import React, { useEffect, useState } from 'react'
import api from '../../service/api';
import { useNavigate } from 'react-router-dom';


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
    datePaiement: string
        isPaid?: boolean; 


}
interface Derigeant {
    _id?: string;
    nom: string;
    email: string;
    telephone?: number;
}
const ClubSuivi = () => {
    const [clubs, setClubs] = useState<Club[]>([]);
    const localStorageData = localStorage.getItem('userClub')
        ? JSON.parse(localStorage.getItem('userClub') as string)
        : null;
    const userId = localStorageData ? localStorageData.user?._id : null;
    const getAllClubSuivi = async () => {
        try {
            await api.updateIsPaid();

            const response = await api.getMembre(userId);
            const membre = response.data;

            console.log('Membre récupéré:', membre);

            if (!Array.isArray(membre.data.club)) {
                console.warn("membre.club n'est pas un tableau :", membre.data.club);
            }

            const clubsPayes = Array.isArray(membre.data.club)
                ? membre.data.club
                    .filter((club: any) => 
                         club.clubId
                    )
                    .map((club: any) => {
                        console.log('Club filtré', club.clubId);
                        return {
                            ...club.clubId,
                            datePaiement: club.datePaiement,
                              isPaid: club.isPaid,
                        };
                    })
                : [];

            console.log('Liste des clubIds payés:', clubsPayes);
            setClubs(clubsPayes);
        } catch (error) {
            console.error('Erreur générale dans getAllClubSuivi:', error);
        }
    };
    const navigate=useNavigate()
const suiviClub=async(clubId:any)=>{
    try {
      const response=await api.suiviClub(userId,clubId)
      console.log('membre suivi un evenemt et passe a paiement',response)
      navigate(`/homeMembre/paiement/${clubId}/${userId}`);
    } catch (error) {
      console.log(error)
    }
  }



    useEffect(() => {
        getAllClubSuivi()
    }, [])

    return (
        <div className='min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-6'>
            <h4 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300 mt-5">
                List of Club Suivi
            </h4>
            <div className="w-full mb-8 overflow-hidden rounded-lg shadow-xs">
                <div className="w-full overflow-x-auto">
                    <table className="w-full whitespace-no-wrap">
                        <thead>
                            <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                <th className="text-center py-3">Number</th>
                                <th className="text-start py-3 px-5">Club</th>
                                <th className="text-center py-3">Cotisation</th>
                                <th className="text-center py-3">Objectifs</th>
                                <th className="text-center py-3">Mission</th>
                                <th className="text-center py-3">Derigeant</th>
                                <th className="text-center py-3">Date de paiement</th>

                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                            {clubs.map((item, index) => {
                                return (
                                    <tr className="text-gray-700 dark:text-gray-400" key={index}>
                                        <td className="px-4 py-3 text-sm text-center">{index + 1}</td>

                                        <td className="px-4 py-3">
                                            <div className="flex items-center text-sm">
                                                {/* Avatar with inset shadow */}
                                                <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                                                    <img className="object-cover w-full h-full rounded-full" src={`http://localhost:5000/file/${item.logo}`} loading="lazy" />
                                                    <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold">{item.nomClub}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            {item.cotisation}
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            {item.objectifs}
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            {item.mission}
                                        </td>
                                        {item.derigentClub && (
                                            <td className="px-4 py-3 text-sm">
                                                {item.derigentClub.nom}-{item.derigentClub.telephone}
                                            </td>
                                        )}


                                        <td className="px-4 py-3 text-sm text-center">
                                            {new Date(item.datePaiement).toLocaleDateString("fr-FR")}
                                        </td>

                                        <td className="px-4 py-3 text-sm text-center">
    {item.isPaid ? (
        <span className="text-green-600 font-bold">✅ Payé</span>
    ) : (
        <span className="text-red-600 font-bold">❌ Expiré</span>
    )}
</td>
<td className="px-4 py-3 text-sm text-center">
    {!item.isPaid && (
        <button
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      onClick={()=>suiviClub(item._id)}>
        
            Renouveler
        </button>
    )}
</td>


                                    </tr>
                                )
                            })}



                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default ClubSuivi
