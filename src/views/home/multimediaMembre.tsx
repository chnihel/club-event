import React, { useEffect, useState } from "react";
import api from "../../service/api";
import ImageCarousel from "../../component/carousel";

interface Ressource {
  _id?: string;
  titre: string;
  contenu: string;
  type?: string;
  createdAt?: Date;
  format?: string[];
  club?: {
    nomClub: string;
  };
}

const MultimediaMembre = () => {
  const [multimedias, setMultimedia] = useState<Ressource[]>([]);
  //comment
  const [commentaire, setCommentaire] = useState<{ [key: string]: string }>({});
  const [commentaires, setCommentaires] = useState<{ [key: string]: any[] }>({});
  const [showComments, setShowComments] = useState<{ [key: string]: boolean }>({});
  const localStorageData = localStorage.getItem("userClub")
    ? JSON.parse(localStorage.getItem("userClub") as string)
    : null;
  const userId = localStorageData ? localStorageData.user?._id : null;

  const getAllMultimediaRessource = async () => {
    try {
      const res = await api.getAllClub();
      const allClubs = res.data.listeclub;

      const clubsSuivis = allClubs.filter((club: any) =>
        club.membres?.includes(userId)
      );

      const allMultimedias = clubsSuivis.flatMap(
        (club: any) => club.multimedia || []
      );
      setMultimedia(allMultimedias);
    } catch (error) {
      console.log(error);
    }
  };


  //get commenraire depuis multimedia
  const getCommentMultimedia = async (mediaId: string) => {
    try {
      const response = await api.getMultimediaById(mediaId);
      const commentairesDuMedia = response.data.getmutimedia.commentaire || [];
      console.log('comment', response.data.getmutimedia)
      setCommentaires(prev => ({
        ...prev,
        [mediaId]: commentairesDuMedia,
      }));

      console.log("Commentaires pour", mediaId, commentairesDuMedia);
    } catch (error) {
      console.error("Erreur de récupération des commentaires :", error);
    }
  };
  //add commentaire
  const handleCommentSubmit = async (mediaId: string | undefined) => {
    if (!mediaId || !userId) return;
    try {
      const content = commentaire[mediaId];
      if (!content) return;

      await api.addComment({
        content: content,
        membre: userId,
        multimedia: mediaId
      });
      setCommentaire({ ...commentaire, [mediaId]: "" });
      getCommentMultimedia(mediaId);
    } catch (error) {
      console.error("Erreur lors de l'envoi du commentaire :", error);
    }
  };

  useEffect(() => {
    getAllMultimediaRessource();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-purple-700 mb-12">
        📷 Club Visual Resources
      </h1>

      {multimedias.length === 0 ? (
        <p className="text-center text-gray-500 text-lg italic mt-5">
          Aucune ressource disponible.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-5 items-start">
          {multimedias.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg ring-1 ring-purple-100 transition duration-300 overflow-hidden flex flex-col"
            >
              {item.format && item.format.length > 0 && (
                <div className="p-4 border-b border-gray-100 bg-gray-50">
                  <ImageCarousel item={item} />
                </div>
              )}
              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <h2 className="text-xl font-bold text-purple-700 mb-2">
                    📷 {item.titre}
                  </h2>
                  <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                    {item.contenu}
                  </p>
                  {item.club?.nomClub && (
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium text-gray-700">🏛 Club :</span>{" "}
                      {item.club.nomClub}
                    </p>
                  )}
                </div>
                {item.createdAt && (
                  <p className="text-xs text-gray-400 italic mt-2">
                    🕒 Publié le{" "}
                    {new Date(item.createdAt).toLocaleDateString("fr-FR")}
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
                      getCommentMultimedia(item._id || "");
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



          ))}
        </div>
      )}


    </div>
  );
};

export default MultimediaMembre;
