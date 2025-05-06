import React, { useEffect, useState } from "react";
import api from "../../service/api";

interface Ressource {
    _id?: string;
    titre: string;
    contenu: string;
    type?: string;
    createdAt?: Date;
    video?: File;
    niveau: string;
    duree: string;
    club?: {
        nomClub: string;
    };
}

const TutorielMembre = () => {
    const [tutoriels, setTutoriel] = useState<Ressource[]>([]);

    const localStorageData = localStorage.getItem('userClub')
        ? JSON.parse(localStorage.getItem('userClub') as string)
        : null;

    const userId = localStorageData?.user?._id;

    const getAllTutorielRessource = async () => {
        try {
            const res = await api.getAllClub();
            const allClubs = res.data.listeclub;

            // Filtrer les clubs suivis par userId
            const clubsSuivis = allClubs.filter((club: any) =>
                club.membres?.includes(userId)
            );

            const allTutoriels = clubsSuivis.flatMap((club: any) => club.tutoriel || []);
            setTutoriel(allTutoriels);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllTutorielRessource();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-4xl font-bold text-center text-purple-700 mb-12">
            🎥 Tutoriels des Clubs
            </h1>
            {tutoriels.length === 0 ? (
        <p className="text-center text-gray-500 text-lg italic mt-5">
          Aucune ressource disponible.
        </p>
      ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-5">
                {tutoriels.length > 0 ? (
                    tutoriels.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg ring-1 ring-purple-100 transition duration-300 overflow-hidden flex flex-col"
                        >
                            {item.video && (
                                <video
                                    controls
                                    className="w-full h-48 object-cover"
                                >
                                    <source src={`http://localhost:5000/file/${item.video}`} type="video/mp4" />
                                    Votre navigateur ne prend pas en charge la vidéo.
                                </video>
                            )}
                            <div className="p-5">
                                <h2 className="text-xl font-bold text-purple-800 mb-2">
                                🎥 {item.titre}
                                </h2>
                                <p className="text-sm text-gray-600 mb-1">
                                    <span className="font-semibold text-gray-700">🎓 Niveau :</span> {item.niveau}
                                </p>
                                <p className="text-sm text-gray-600 mb-3">
                                    {item.contenu}
                                </p>
                                {item.club?.nomClub && (
                                    <p className="text-sm text-gray-500 mb-1">
                                        <span className="font-semibold text-gray-700">🏛 Club :</span> {item.club.nomClub}
                                    </p>
                                )}
                                {item.createdAt && (
                                    <p className="text-xs text-gray-400 italic">
                                        🕒 Publié le {new Date(item.createdAt).toLocaleDateString("fr-FR")}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center col-span-full text-gray-500 text-lg">
                        Aucune ressource disponible.
                    </p>
                )}
            </div>
      )}
        </div>
    );
};

export default TutorielMembre;
