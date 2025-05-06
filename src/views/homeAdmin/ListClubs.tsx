import React, { useEffect, useState } from 'react'
import api from '../../service/api'
import { FaEdit, FaInfoCircle, FaTrash } from 'react-icons/fa';
import type { JSX } from "react";


interface Club {
    _id?: string;
    nomClub: string;
    description: string;
    
derigentClub?: DerigeantClub;
    logo?: File
    activitePrincipale?: string
    mission?: string
    vision?: string
    objectifs?: string
    cotisation: number
    status: boolean
}
interface DerigeantClub {
    nom: string
    prenom: string
    email: string
    telephone: number
    faculte: string

}

const FaTrashIcon = FaTrash as unknown as () => JSX.Element;
const FaEditttIcon = FaEdit as unknown as () => JSX.Element;

const FaEditIcon = FaInfoCircle as unknown as () => JSX.Element;
const ListClubs = () => {
      const [club, setClub] = useState<Club[]>([])
        const [openModalDetail, setOpenModalDetails] = useState(false)
        const [selectedDerigeant, setSelectedDerigeant] = useState<DerigeantClub | null>(null)
    
        const handleOpenDetails = (derigentClub: DerigeantClub | undefined) => {
            if (derigentClub) {
                setSelectedDerigeant(derigentClub);
                setOpenModalDetails(true);
            }
            console.log('not club derigeant')
        };
    
    
        const updateStatus=async(id:any)=>{
            try {
                const response=await api.updateClubStatus(id)
                console.log('update status',response.data)
                getAllClub()
            } catch (error) {
                console.log(error)
            }
        }
    
        const deleteClub=async(id:any)=>{
            try {
                const response=await api.supprimerClub(id)
                console.log('supprission de club',response)
                getAllClub()
            } catch (error) {
                console.log(error)
            }
        }
        const getAllClub = async () => {
            try {
                const response = await api.getAllClub()
                console.log('les club creer', response.data)
                setClub(response.data.listeclub)
            } catch (error) {
                console.log(error)
            }
        }
        useEffect(() => {
            getAllClub()
        }, [])
  return (
    <div>
       <div className="w-full overflow-x-auto">
                        <table className="w-full whitespace-no-wrap">
                            <thead>
                                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                    <th className="text-start px-5 py-3">Name</th>
                                    <th className="text-center px-5 py-3">Mission</th>
                                    <th className="text-center py-3">Vision</th>
                                    <th className="text-center py-3">Objectifs</th>
                                    <th className="text-center py-3">Cotisation</th>
                                    <th className="text-center py-3">Status</th>
                                    <th className="text-center py-3">DerigeantClub</th>
                                    <th className="text-center py-3">Action</th>

                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                                {club.map((item, index) => {
                                    return (
                                        <tr className="text-gray-700 dark:text-gray-400">
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
                                                {item.mission}
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                {item.vision}
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                {item.objectifs}
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                {item.cotisation}
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                            {item.status ? '✅ Actif' : '❌ Inactif'}
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                <button
                                                    onClick={() => handleOpenDetails(item.derigentClub)}
                                                    className="text-blue-500 hover:text-blue-700"
                                                    title="Voir détails dirigeant"
                                                >
                                                    <FaEditIcon />
                                                </button>
                                            </td>

                                            <td className="px-4 py-3 text-xs">
                                                <button className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100"
                                                onClick={()=>updateStatus(item._id)}>
                                                       <FaEditttIcon />
                                                </button>

                                                <button
                  onClick={() => deleteClub(item._id)}
                  className="text-red-500 hover:text-red-700"
                  title="Delete Event"
                >
                  <FaTrashIcon />
                </button>
                                            </td>
                                        </tr>
                                    )
                                })}



                            </tbody>
                        </table>
                        {openModalDetail && selectedDerigeant && (
                            <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
                                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                                    <h2 className="text-xl font-semibold mb-4">Détails du Dirigeant</h2>
                                    <p><strong>Nom :</strong> {selectedDerigeant.nom}</p>
                                    <p><strong>Prénom :</strong> {selectedDerigeant.prenom}</p>
                                    <p><strong>Email :</strong> {selectedDerigeant.email}</p>
                                    <p><strong>Téléphone :</strong> {selectedDerigeant.telephone}</p>
                                    <p><strong>Faculté :</strong> {selectedDerigeant.faculte}</p>
                                    <div className="mt-4 flex justify-end">
                                        <button
                                            onClick={() => setOpenModalDetails(false)}
                                            className="bg-gray-300 hover:bg-gray-400 transition-all duration-300 text-gray-800 font-semibold py-2 px-5 rounded-lg"
                                        >
                                            Fermer
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
    </div>
  )
}

export default ListClubs
