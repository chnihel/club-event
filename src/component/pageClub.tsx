import React from "react"

interface Member {
  name: string
  role: string
  email: string
  phone: string
  avatarUrl?: string
}

interface ClubDetailsProps {
  name: string
  mission: string
  vision: string
  objectives: string[]
  activities: string[]
  leaders: Member[]
}

const ClubDetails: React.FC<ClubDetailsProps> = ({
  name,
  mission,
  vision,
  objectives,
  activities,
  leaders,
}) => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
      <h1 className="text-3xl font-bold text-center text-blue-700">{name}</h1>

      <div className="space-y-6 text-center flex flex-col items-center">
  {/* Mission + Vision */}
  <div className="flex flex-col md:flex-row md:gap-8 justify-center items-start">
    <div className="md:w-1/2 space-y-1">
      <h2 className="text-xl font-semibold text-gray-800">🎯 Mission</h2>
      <p className="text-gray-600">{mission}</p>
    </div>

    <div className="md:w-1/2 space-y-1 mt-4 md:mt-0">
      <h2 className="text-xl font-semibold text-gray-800">👁️ Vision</h2>
      <p className="text-gray-600">{vision}</p>
    </div>
  </div>

  {/* Objectifs + Activités principales */}
  <div className="flex flex-col md:flex-row md:gap-8 justify-center items-start">
    <div className="md:w-1/2 space-y-1">
      <h2 className="text-xl font-semibold text-gray-800">🎯 Objectifs</h2>
      <p className="text-gray-600">{mission}</p>
    </div>

    <div className="md:w-1/2 space-y-1 mt-4 md:mt-0">
      <h2 className="text-xl font-semibold text-gray-800">📌 Activités principales</h2>
      <p className="text-gray-600">{vision}</p>
    </div>
  </div>
</div>





      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">👥 Membres dirigeants</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {leaders.map((leader, index) => (
            <div key={index} className="flex items-center bg-gray-100 p-4 rounded-lg shadow">
              <img
                src={leader.avatarUrl || "https://via.placeholder.com/80"}
                alt={leader.name}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <p className="font-semibold">{leader.name}</p>
                <p className="text-sm text-gray-600">{leader.role}</p>
                <p className="text-sm text-gray-500">📧 {leader.email}</p>
                <p className="text-sm text-gray-500">📞 {leader.phone}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ClubDetails
