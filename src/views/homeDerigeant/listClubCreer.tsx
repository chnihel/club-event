import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../service/api';
import { Nut } from 'lucide-react';

// Define the Club interface
interface Club {
  _id?: string;
  nomClub: string;
  description: string;
  derigeantClub?: string;
  logo?: File
  activitePrincipale?: string
  mission?: string
  vision?: string
  objectifs?: string
  status?: boolean; 
  cotisation:number

}

const ListClubsDirigeant: React.FC = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [newClub, setNewClub] = useState<Club>({ description: "", nomClub: "", activitePrincipale: "" ,cotisation:0});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const localStorageData = localStorage.getItem('userClub')
    ? JSON.parse(localStorage.getItem('userClub') as string)
    : null;
  const userId = localStorageData ? localStorageData.user?._id : null;
  console.log('Club manager ID:', userId);

  const getAllClubsByManager = async () => {
    try {
      const response = await api.getDerigeantByClub(userId);
      const filteredClubs = response.data.data.club.filter((club: Club) => club.status === true);
    setClubs(filteredClubs);
    console.log('Clubs managed by user:', filteredClubs);
      console.log('Clubs managed by user:', response.data.data.club);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userId) {
      getAllClubsByManager();
    }
  }, [userId]);

  const onChangeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewClub({ ...newClub, logo: e.target.files[0] });
    }
  };
  const handleCreateClub = async () => {
    try {
      /* const clubData = {
        ...newClub,
        derigeantClub: userId,
      }; */
      const formData = new FormData();
      formData.append("nomClub", newClub.nomClub);
      formData.append("description", newClub.description);
      formData.append("derigentClub", userId);
      formData.append("mission", newClub.mission ?? "");
      formData.append("vision", newClub.vision ?? "");
      formData.append("objectifs", newClub.objectifs ?? "");
      formData.append("activitePrincipale", newClub.activitePrincipale ?? "");
      formData.append("cotisation", newClub.cotisation.toString());



      if (newClub.logo) {
        formData.append("logo", newClub.logo);

      }

      const response = await api.createClub(formData);

      console.log('Club created:', response);
     // await getAllClubsByManager();
      setIsModalOpen(false);
      setNewClub({ nomClub: '', description: '' ,cotisation:0});
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectClub = (clubId: any) => {
    navigate(`/homeDerigeant/${clubId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className=" font-bold text-gray-800">My Clubs</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
        >
          + Create a New Club
        </button>
      </div>

      {/* Clubs List */}
      <div className="grid gap-4 md:grid-cols-2">
        {clubs.length === 0 ? (
          <p className="text-gray-500">No clubs found yet.</p>
        ) : (
          clubs.map((club) => (
            <div
              key={club._id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg cursor-pointer transition-transform transform hover:scale-105"
              onClick={() => handleSelectClub(club._id)}
            >
              <div className="flex items-center space-x-4">
                <img
                  src={`http://localhost:5000/file/${club.logo}`}
                  alt="logo"
                  className="w-12 h-12 rounded-full object-cover border"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-700">{club.nomClub}</h2>
                  <p className="text-gray-500">{club.description}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start z-50 overflow-y-auto">
    <div className="bg-white rounded-2xl p-8 w-full max-w-4xl mt-10 mb-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create a Club</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[80vh] overflow-y-auto pr-2">
        <div>
          <label className="block mb-1 text-gray-600">Club Name</label>
          <input
            type="text"
            value={newClub.nomClub}
            onChange={(e) => setNewClub({ ...newClub, nomClub: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="e.g., Summer Football Club"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-600">Logo</label>
          <input
            onChange={onChangeImageHandler}
            name="logo"
            type="file"
            required
            className="w-full"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1 text-gray-600">Description</label>
          <textarea
            value={newClub.description}
            onChange={(e) => setNewClub({ ...newClub, description: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={3}
            required
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 text-gray-600">Mission</label>
          <textarea
            value={newClub.mission}
            onChange={(e) => setNewClub({ ...newClub, mission: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={3}
            required
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 text-gray-600">Vision</label>
          <textarea
            value={newClub.vision}
            onChange={(e) => setNewClub({ ...newClub, vision: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={3}
            required
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 text-gray-600">Objectifs</label>
          <textarea
            value={newClub.objectifs}
            onChange={(e) => setNewClub({ ...newClub, objectifs: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={3}
            required
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 text-gray-600">Activité principale</label>
          <textarea
            value={newClub.activitePrincipale}
            onChange={(e) => setNewClub({ ...newClub, activitePrincipale: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={3}
            required
          ></textarea>
        </div>
        <div>
          <label className="block mb-1 text-gray-600">Cotisation</label>
          <input
          type='number'
            value={newClub.cotisation}
            onChange={(e) => setNewClub({ ...newClub, cotisation: Number(e.target.value)  })}
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="md:col-span-2 flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleCreateClub}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  </div>
)}


    </div>
  );
};

export default ListClubsDirigeant;
