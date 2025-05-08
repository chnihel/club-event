import React, { useEffect, useState } from "react";
import api from "../../service/api";

interface Ressource {
  _id?: string;
  titre: string;
  contenu: string;
  type?: string;
  createdAt?: Date;
  version?: string;
  club?: {
    nomClub: string;
  };
}

const ReglementMembre = () => {
  const [reglements, setreglement] = useState<Ressource[]>([]);

  const localStorageData = localStorage.getItem("userClub")
    ? JSON.parse(localStorage.getItem("userClub") as string)
    : null;
  const userId = localStorageData ? localStorageData.user?._id : null;

  const getAllreglementRessource = async () => {
    try {
      const res = await api.getAllClub();
      const allClubs = res.data.listeclub;

      const clubsSuivis = allClubs.filter((club: any) =>
        club.membres?.includes(userId)
      );

      const allreglements = clubsSuivis.flatMap((club: any) => club.reglement || []);
      setreglement(allreglements);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllreglementRessource();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-purple-800 mb-10">
        📘 Règlements des Clubs
      </h1>

      {reglements.length === 0 ? (
        <p className="text-center text-gray-500 text-lg italic mt-8">
          Aucun règlement disponible pour le moment.
        </p>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
          {reglements.map((reglement, index) => (
            <div
              key={index}
              className="relative bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl ring-1 ring-purple-100 transition duration-300 p-6"
            >
              <h2 className="text-xl font-bold text-purple-700 mb-3">
                📄 {reglement.titre}
              </h2>

              {reglement.version && (
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium text-gray-700">📂 Version :</span>{" "}
                  {reglement.version}
                </p>
              )}

              <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                {reglement.contenu}
              </p>

              {reglement.club?.nomClub && (
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium text-gray-700">🏛 Club :</span>{" "}
                  {reglement.club.nomClub}
                </p>
              )}

              {reglement.createdAt && (
                <p className="text-xs text-gray-400 italic">
                  🕒 Publié le{" "}
                  {new Date(reglement.createdAt).toLocaleDateString("fr-FR")}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReglementMembre;
