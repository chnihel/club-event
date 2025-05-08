import React, { useEffect, useState } from 'react'
import api from '../../service/api';
import { useNavigate, useParams } from 'react-router-dom';
interface Membres {
    _id?: string;
    nom: string;
    prenom: string;
    email: string;
    telephone?: number;
    adresse?: string;
    origine?: string;
    image?:File;
    faculte?:string;
    sexe?:string;
    dateNaissance?:string
    club?: ClubStatus[]; // <-- c'est ici que tu pointeras isPaid

  }
  interface ClubStatus {
    isPaid: boolean;
    clubId?: string;
    _id?: string;

  }
const MembreSuivi = () => {
    const [membres, setMembres] = useState<Membres[]>([]);
   const {clubId}=useParams()
   const getIsPaidForClub = (membre: Membres): boolean => {
    const paidClub = membre.club?.find((c) => c.clubId === clubId);
    if (paidClub) return paidClub.isPaid;
  
    const fallbackClub = membre.club?.find((c) => c._id === clubId);
    return fallbackClub?.isPaid ?? true;
  };
    const getMembresByClub = async () => {
        try {
          const response = await api.getClub(clubId);
          setMembres(response.data.getclub.membres);
          console.log('List of membres suivi:', response.data);
        } catch (error) {
          console.error(error);
        }
      };
    
      useEffect(() => {
        getMembresByClub();
      }, []);

      //updateStatus membre for club(isPaid
       const updateStatusPaidForClub=async(membreId:string)=>{
              console.log('membreId envoyé:', membreId); 
      
              try {
                  const res=await api.updateMembreStatusForClub(membreId,clubId)
                  console.log('status paid updated',res)
                  getMembresByClub(); 
      
              } catch (error) {
                  console.log(error)
              }
          }
      
  return (
   <div className='min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-6'>
  <h4 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300 mt-5">
  List of Followed Members
    </h4>
  <div className="w-full mb-8 overflow-hidden rounded-lg shadow-xs">
    <div className="w-full overflow-x-auto">
      <table className="w-full whitespace-no-wrap">
      <thead>
                            <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                <th className="text-center py-3">Number</th>
                                <th className="text-center py-3">Name</th>
                                <th className="text-center py-3">Email</th>
                                <th className="text-center py-3">Phone</th>
                                <th className="text-center py-3">Address</th>
                                <th className="text-center py-3">Birth Date</th>
                                <th className="text-center py-3">Gender</th>
                                <th className="text-center py-3">Origin</th>
                                <th className="text-center py-3">Faculty</th>
                                <th className="text-center py-3">Status</th>
                                <th className="text-center py-3">updateStatus</th>

                            </tr>
                        </thead>
        <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
            {membres.map((item,index)=>{
                return(
                    <tr className="text-gray-700 dark:text-gray-400" key={index}>
                                                          <td className="px-4 py-3 text-sm text-center">{index + 1}</td>

                    <td className="px-4 py-3">
                      <div className="flex items-center text-sm">
                        {/* Avatar with inset shadow */}
                        <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                          <img className="object-cover w-full h-full rounded-full" src={`http://localhost:5000/file/${item.image}`}  loading="lazy" />
                          <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="font-semibold">{item.nom}_{item.prenom}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {item.email}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {item.telephone}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {item.adresse}
                    </td>
                    <td className="px-4 py-3 text-sm">
                    {item.dateNaissance?.slice(0, 10)}

                    </td>
                    <td className="px-4 py-3 text-sm">
                      {item.sexe}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {item.origine}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {item.faculte}
                    </td>
                    <td className="px-4 py-3 text-xs text-center">
                    <span
  className={`px-2 py-1 font-semibold leading-tight rounded-full 
    ${getIsPaidForClub(item)
      ? 'text-green-700 bg-green-100 dark:bg-green-700 dark:text-green-100'
      : 'text-red-700 bg-red-100 dark:bg-red-700 dark:text-red-100'
    }`}
>
  {getIsPaidForClub(item) ? 'Paid' : 'Not Paid'}
</span>
</td>
<td className="px-4 py-3 text-sm">
                     <button onClick={()=>updateStatusPaidForClub(item._id!)}>update</button>
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

export default MembreSuivi
