import React, { useEffect, useState } from 'react'
import api from '../../service/api';
import { useNavigate, useParams } from 'react-router-dom';

interface Membres {
    id?: string;
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
    isPaid?: boolean;

}
interface Event {
    id?: string;
    nomEvent: string;
    dateEvent: Date;
    lieuEvent: string;
    frais?: number;
    membres: Membres[]

}
const ListMembreEvent = () => {

    const [membresPayants, setMembresPayants] = useState<Membres[]>([]);
    const { eventId } = useParams()

    const getMembresByEvent = async () => {
        try {
            const response = await api.getEvent(eventId);
            const membres = response.data.getevenement.membres;
    
            const membresAvecStatus = membres.map((m: any) => {
                const eventInfo = m.event?.find((e: any) => e.eventId === eventId);
                return {
                    ...m,
                    isPaid: eventInfo?.isPaid || false
                };
            });
    
            setMembresPayants(membresAvecStatus);
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        getMembresByEvent();
    }, []);
    return (
        <div className='min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-6'>
            <h4 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300 mt-5">
                Liste des membres ayant payé pour l’événement
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
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                            {membresPayants.map((membre, index) => (
                                <tr className="text-gray-700 dark:text-gray-400" key={index}>
                                    <td className="px-4 py-3 text-sm text-center">{index + 1}</td>
                                    <td className="px-4 py-3 text-sm text-center">
                                        <div className="flex items-center justify-center text-sm">
                                            <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                                                <img
                                                    className="object-cover w-full h-full rounded-full"
                                                    src={`http://localhost:5000/file/${membre.image}`}
                                                    alt="profil"
                                                    loading="lazy"
                                                />
                                            </div>
                                            <p className="font-semibold">{membre.nom} {membre.prenom}</p>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-center">{membre.email}</td>
                                    <td className="px-4 py-3 text-sm text-center">{membre.telephone}</td>
                                    <td className="px-4 py-3 text-sm text-center">{membre.adresse}</td>
                                    <td className="px-4 py-3 text-sm text-center">  {membre.dateNaissance?.slice(0, 10)}</td>
                                    <td className="px-4 py-3 text-sm text-center">{membre.sexe}</td>
                                    <td className="px-4 py-3 text-sm text-center">{membre.origine}</td>
                                    <td className="px-4 py-3 text-sm text-center">{membre.faculte}</td>
                                    <td className="px-4 py-3 text-xs text-center">
    {membre.isPaid ? (
        <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
            Paid
        </span>
    ) : (
        <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full dark:bg-red-700 dark:text-red-100">
            Not Paid
        </span>
    )}
</td>
                                </tr>
                            ))}
                            {membresPayants.length === 0 && (
                                <tr>
                                    <td colSpan={10} className="text-center py-4 text-gray-500">
                                        No members have paid for this event yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ListMembreEvent
