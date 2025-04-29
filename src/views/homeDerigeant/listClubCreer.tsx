import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../service/api';

// Define the Club interface
interface Club {
  _id?: string;
  nomClub: string;
  description: string;
  derigeantClub?: string;
  logo?:File
}

const ListClubsDirigeant: React.FC = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [newClub, setNewClub] = useState<Club>({ nomClub: '', description: ''});
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
      setClubs(response.data.data.club);
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

          if(newClub.logo){
            formData.append("logo", newClub.logo);

          }
        
      const response = await api.createClub(formData);

      console.log('Club created:', response);
      await getAllClubsByManager();
      setIsModalOpen(false);
      setNewClub({ nomClub: '', description: ''});
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
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create a Club</h2>
            <form className="space-y-5">
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
                <label className="block mb-1 text-gray-600">Description</label>
                <textarea
                  value={newClub.description}
                  onChange={(e) => setNewClub({ ...newClub, description: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Brief description about the club"
                  rows={3}
                  required
                ></textarea>
              </div>
              <div>
                <label className="block mb-1 text-gray-600">Logo</label>
                <input
                  onChange={onChangeImageHandler}
                  name='logo'
                  type='file'
                  required
                />
              </div>

              <div className="flex justify-end space-x-3 mt-6">
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
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
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
