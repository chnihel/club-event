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
  const [commentaire, setCommentaire] = useState<{ [key: string]: string }>({});
  const [commentaires, setCommentaires] = useState<{ [key: string]: any[] }>({});
  const [showComments, setShowComments] = useState<{ [key: string]: boolean }>({});
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

      //get commenraire depuis tutoriel
      const getCommentTutoriel = async (tutorielId: string) => {
        try {
          const response = await api.gettutorielById(tutorielId);
          const commentairesDuMedia = response.data.gettutoriel.commentaire|| [];
          console.log('comment', response.data.gettutoriel)
          setCommentaires(prev => ({
            ...prev,
            [tutorielId]: commentairesDuMedia,
          }));
    
          console.log("Commentaires pour", tutorielId, commentairesDuMedia);
        } catch (error) {
          console.error("Erreur de récupération des commentaires :", error);
        }
      };
      //add commentaire
      const handleCommentSubmit = async (tutorielId: string | undefined) => {
        if (!tutorielId || !userId) return;
        try {
          const content = commentaire[tutorielId];
          if (!content) return;
    
          await api.addComment({
            content: content,
            membre: userId,
            tutoriel: tutorielId
          });
          setCommentaire({ ...commentaire, [tutorielId]: "" });
          getCommentTutoriel(tutorielId);
        } catch (error) {
          console.error("Erreur lors de l'envoi du commentaire :", error);
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

                             {/* Bouton Afficher les commentaires */}
              <div className="flex justify-end px-4 mb-2">
                <button
                  className="text-purple-600 hover:underline text-sm"
                  onClick={() => {
                    setShowComments(prev => ({
                      ...prev,
                      [item._id || ""]: !prev[item._id || ""],
                    }));
                    if (!commentaires[item._id || ""]) {
                      getCommentTutoriel(item._id || "");
                    }
                  }}
                >
                  💬 Voir les commentaires
                </button>
              </div>

              {/* Zone de commentaires */}
              {showComments[item._id || ""] && (
                <div className="px-4 pb-4 space-y-2">
                  {(commentaires[item._id || ""] || []).map((c, idx) => (
                    <div key={idx} className="text-sm bg-gray-100 p-2 rounded text-gray-700">
                      {c.membre.nom} {c.membre.prenom}: {c.content}
                    </div>
                  ))}

                  <input
                    type="text"
                    placeholder="Ajouter un commentaire..."
                    className="w-full mt-2 p-2 border rounded text-sm"
                    value={commentaire[item._id || ""] || ""}
                    onChange={(e) =>
                      setCommentaire({ ...commentaire, [item._id || ""]: e.target.value })
                    }
                  />
                  <button
                    onClick={() => handleCommentSubmit(item._id)}
                    className="mt-2 bg-purple-600 text-white text-sm px-3 py-1 rounded hover:bg-purple-700"
                  >
                    Send
                  </button>
                </div>
              )}

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
