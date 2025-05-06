import React, { useEffect, useState } from 'react'
import api from '../../service/api';


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
            const response = await api.getAllClub()
            const allClubs = response.data.listeclub;

            // Filtrer les clubs suivis par userId
            const clubsSuivis = allClubs.filter((club: any) =>
                club.membres?.includes(userId)
            );

            setClubs(clubsSuivis);
            console.log('list of club suivi', clubsSuivis);
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
                                        {item.derigentClub &&(
                                             <td className="px-4 py-3 text-sm">
                                             {item.derigentClub.nom}-{item.derigentClub.telephone}
                                         </td>
                                        )}
                                       



                                    </tr>
                                )
                            })}



                        </tbody>
                    </table>
                </div>
                <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
                    <span className="flex items-center col-span-3">
                        Showing 21-30 of 100
                    </span>
                    <span className="col-span-2" />
                    {/* Pagination */}
                    <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                        <nav aria-label="Table navigation">
                            <ul className="inline-flex items-center">
                                <li>
                                    <button className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple" aria-label="Previous">
                                        <svg aria-hidden="true" className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                            <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" fillRule="evenodd" />
                                        </svg>
                                    </button>
                                </li>
                                <li>
                                    <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                                        1
                                    </button>
                                </li>
                                <li>
                                    <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                                        2
                                    </button>
                                </li>
                                <li>
                                    <button className="px-3 py-1 text-white transition-colors duration-150 bg-purple-600 border border-r-0 border-purple-600 rounded-md focus:outline-none focus:shadow-outline-purple">
                                        3
                                    </button>
                                </li>
                                <li>
                                    <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                                        4
                                    </button>
                                </li>
                                <li>
                                    <span className="px-3 py-1">...</span>
                                </li>
                                <li>
                                    <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                                        8
                                    </button>
                                </li>
                                <li>
                                    <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                                        9
                                    </button>
                                </li>
                                <li>
                                    <button className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple" aria-label="Next">
                                        <svg className="w-4 h-4 fill-current" aria-hidden="true" viewBox="0 0 20 20">
                                            <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" fillRule="evenodd" />
                                        </svg>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ClubSuivi
