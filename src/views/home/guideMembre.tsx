import React, { useEffect, useState } from 'react';
import api from '../../service/api';

interface Ressource {
    _id?: string;
    titre: string;
    contenu: string;
    type?: string;
    createdAt?: Date;
    category?: string;
    club?: {
        nomClub: string;
    };
}

const GuideMembre = () => {
    const [guides, setGuide] = useState<Ressource[]>([]);
    const localStorageData = localStorage.getItem('userClub')
        ? JSON.parse(localStorage.getItem('userClub') as string)
        : null;
    const userId = localStorageData?.user?._id || null;

    const getAllGuideRessource = async () => {
        try {
            const res = await api.getAllClub();
            const allClubs = res.data.listeclub;

            // Filter clubs followed by the current user
            const followedClubs = allClubs.filter((club: any) =>
                club.membres?.includes(userId)
            );

            console.log('Followed clubs:', followedClubs);

            const allGuides = followedClubs.flatMap((club: any) => club.guide || []);
            console.log('Extracted guide data:', allGuides);

            setGuide(allGuides);
        } catch (error) {
            console.error('Error fetching guides:', error);
        }
    };

    useEffect(() => {
        getAllGuideRessource();
    }, []);

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center text-purple-800 mb-10 mt-5">
                📘 Club Guides
            </h1>

            {guides.length === 0 ? (
                <p className="text-center text-gray-500">No guides available at the moment.</p>
            ) : (
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
                    {guides.map((guide, index) => (
                        <div
                            key={index}
                            className="relative bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300"
                        >
                            {guide.club?.nomClub && (
                                <p className="text-sm text-gray-500 mb-1">
                                    <span className="font-medium text-gray-600">🏛 Club:</span>{" "}
                                    {guide.club.nomClub}
                                </p>
                            )}

                            <h2 className="text-xl font-semibold text-purple-700 mb-2">
                                {guide.titre}
                            </h2>

                            {guide.category && (
                                <p className="text-sm text-gray-500 mb-1">
                                    <span className="font-medium text-gray-600">📂 Category:</span>{" "}
                                    {guide.category}
                                </p>
                            )}

                            <p className="text-gray-700 text-sm mb-2 leading-relaxed">
                                {guide.contenu}
                            </p>

                            {guide.createdAt && (
                                <p className="text-xs text-gray-400 italic">
                                    🕒 Published on {new Date(guide.createdAt).toLocaleDateString("en-GB")}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GuideMembre;
