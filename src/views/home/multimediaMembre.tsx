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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-5">
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultimediaMembre;
