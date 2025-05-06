import React from "react"

interface Member {
  nom: string
  role: string
  image: File
}

interface ClubDetailsProps {
  nomClub: string
  description: string
  logo?: string | File | null
  mission: string
  vision: string
  objectifs: string
  activitePrincipale: string
  leaders: Member[]
}

const ClubDetails: React.FC<ClubDetailsProps> = ({
  nomClub,
  logo,
  mission,
  vision,
  objectifs,
  activitePrincipale,
  leaders,
}) => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
      <h1 className="text-3xl font-bold text-center text-blue-700">{nomClub}</h1>

      <div className="space-y-6 flex flex-col items-center">
        {/* Mission + Vision */}
        <div className="w-full flex justify-center">
          <div className="w-full max-w-4xl flex flex-col md:flex-row md:gap-7 justify-between items-start">
            <div className="md:w-1/2 space-y-1 text-center">
              <h2 className="text-xl font-semibold text-gray-800">🎯 Mission</h2>
              <p className="text-gray-600">{mission}</p>
            </div>

            <div className="md:w-1/2 space-y-1 mt-4 md:mt-0 text-center">
              <h2 className="text-xl font-semibold text-gray-800">👁️ Vision</h2>
              <p className="text-gray-600 text-center">{vision}</p>
            </div>
          </div>
        </div>

        {/* Objectifs + Activités principales */}
        <div className="w-full flex justify-center">
          <div className="w-full max-w-4xl flex flex-col md:flex-row md:gap-7 justify-between items-start">
            <div className="md:w-1/2 space-y-1">
              <h2 className="text-xl font-semibold text-gray-800">🎯 Objectifs</h2>
              <p className="text-gray-600 text-center">{objectifs}</p>
            </div>

            <div className="md:w-1/2 space-y-1 mt-4 md:mt-0 text-right">
              <h2 className="text-xl font-semibold text-gray-800">📌 Activités </h2>
              <p className="text-gray-600">{activitePrincipale}</p>
            </div>
          </div>
        </div>

      </div>





      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">👥 Membres dirigeants</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {leaders.map((leader, index) => (
            <div key={index} className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow">
              <div className="w-32 h-32 overflow-hidden rounded-full">
                <img
                  src={`http://localhost:5000/file/${leader.image}`}
                  alt={nomClub}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center mt-2">
                <p className="font-semibold">{leader.nom}</p>
                <p className="text-sm text-gray-600">{leader.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ClubDetails
