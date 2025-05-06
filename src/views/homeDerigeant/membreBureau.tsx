import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../service/api';
import { M } from 'framer-motion/dist/types.d-B50aGbjN';

interface MembreBureau{
    _id?:string
    nom:string;
    role:string
    image?: string | File | null;
}
const MembreBureau = () => {
    const {clubId}=useParams()
   const [bureau,setBureau]=useState<MembreBureau[]>([])
  const [showModal, setShowModal] = useState(false);
     const [openModalEdit, setOpenModalEdit] = useState(false)
     const [membre,setMembre]=useState<MembreBureau>({
        _id:"",
        nom: '',
        role: '',
        image: null as File | null, 
     })
     const [selectedMembre, setSelectedMembre] = useState<string | null>(null);
       const [edit, setEdit] = useState<MembreBureau>({
        _id:"",
         nom: '',
         role: '',
         image: null as File | null,     
  });

       const getMemebreBureau=async()=>{
        try {
            const response=await api.getClub(clubId)
            console.log('membre bureau',response.data)
            setBureau(response.data.getclub.membresBureau)
        } catch (error) {
            console.log(error)
        }
    }
       const handleEditClick = (bureau: MembreBureau) => {
        if (!bureau._id) return;
    
        setSelectedMembre(bureau._id);
        setEdit({
          _id:bureau._id,
          nom: bureau.nom,
          role: bureau.role,
          image: null
        });
        setOpenModalEdit(true);
      };

      const editMembreBureau = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedMembre) return;
      
        const formData = new FormData();
        formData.append('nom', edit.nom);
        formData.append('role', edit.role);
        if (edit.image) {
          formData.append('image', edit.image);
        }
      
        try {
          const response = await api.updateMembreBureau(clubId,selectedMembre, formData); // corrige ici si le nom est différent
          console.log('Membre updated:', response.data);
          getMemebreBureau();
          setOpenModalEdit(false);
        } catch (error) {
          console.error(error);
        }
      };

      const addMembreBureau = async (e: React.FormEvent) => {
        e.preventDefault();
      
        const formData = new FormData();
        formData.append('nom', membre.nom);
        formData.append('role', membre.role);
        if (membre.image) {
          formData.append('image', membre.image);
        }
      
        try {
          const response = await api.createMembreBureau(formData,clubId);
          console.log('Membre created:', response.data);
          getMemebreBureau();
          setShowModal(false);
        } catch (error) {
          console.error(error);
        }
      };
   

      
    useEffect(()=>{
        getMemebreBureau()
    },[])
  return (
    <div>
       <div className='min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-6'>
       <div className="flex justify-between items-center mb-8">
        <h1 className="font-extrabold text-blue-800">List Membre Bureau</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white font-bold py-2 px-6 rounded-lg shadow-md"
        >
          Add New MemberBureau
        </button>
      </div>
    
  <div className="w-full mb-8 overflow-hidden rounded-lg shadow-xs">
    <div className="w-full overflow-x-auto">
      <table className="w-full whitespace-no-wrap">
        <thead>
          <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
            <th className="text-start px-5 py-3">Name</th>
            <th className="text-center py-3">Role</th>
            <th className="text-center py-3">Action</th>
          
          </tr>
        </thead>
        <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
            {bureau.map((item,index)=>{
                return(
                    <tr className="text-gray-700 dark:text-gray-400">
                    <td className="px-4 py-3">
                      <div className="flex items-center text-sm">
                        {/* Avatar with inset shadow */}
                        <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                          <img className="object-cover w-full h-full rounded-full" src={`http://localhost:5000/file/${item.image}`}  loading="lazy" />
                          <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="font-semibold">{item.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {item.nom}
                    </td>
                    
                    <td className="px-4 py-3 text-xs">
                      <button className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100" onClick={() => handleEditClick(item)}>
                        Update
                      </button>
                    </td>
                  </tr>
                )
            })}
         
         
          
        </tbody>
      </table>
    </div>
    <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
      <span className="flex items-center col-span-3">
        Showing 21-30 of 100
      </span>
      <span className="col-span-2" />
      {/* Pagination */}
      <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
        <nav aria-label="Table navigation">
          <ul className="inline-flex items-center">
            <li>
              <button className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple" aria-label="Previous">
                <svg aria-hidden="true" className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" fillRule="evenodd" />
                </svg>
              </button>
            </li>
            <li>
              <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                1
              </button>
            </li>
            <li>
              <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                2
              </button>
            </li>
            <li>
              <button className="px-3 py-1 text-white transition-colors duration-150 bg-purple-600 border border-r-0 border-purple-600 rounded-md focus:outline-none focus:shadow-outline-purple">
                3
              </button>
            </li>
            <li>
              <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                4
              </button>
            </li>
            <li>
              <span className="px-3 py-1">...</span>
            </li>
            <li>
              <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                8
              </button>
            </li>
            <li>
              <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                9
              </button>
            </li>
            <li>
              <button className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple" aria-label="Next">
                <svg className="w-4 h-4 fill-current" aria-hidden="true" viewBox="0 0 20 20">
                  <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" fillRule="evenodd" />
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </span>
    </div>

    {openModalEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg relative">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">Edit Membre</h2>
            <form onSubmit={editMembreBureau} className="space-y-5">
              <div>
                <label className="block mb-1 text-gray-700 font-medium">Name</label>
                <input
                  type="text"
                  value={edit.nom}
                  onChange={(e) => setEdit({ ...edit, nom: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="e.g. Summer Tournament"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-700 font-medium">Role</label>
                <input
                  type="text"
                  value={edit.role}
                  onChange={(e) => setEdit({ ...edit, role: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-700 font-medium">Photo</label>
                <input
                  type="file"
                  onChange={(e) =>  setEdit({ ...edit, image: e.target.files ? e.target.files[0] : null })
                }
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="e.g. Municipal Stadium"
                />
              </div>
         

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setOpenModalEdit(false)}
                  className="bg-gray-300 hover:bg-gray-400 transition-all duration-300 text-gray-800 font-semibold py-2 px-5 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white font-bold py-2 px-6 rounded-lg shadow-md"
                >
                  Update Membre
                </button>
              </div>
            </form>

            <button
              onClick={() => setOpenModalEdit(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
        </div>
      )}

     {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg relative">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">Add a New Membre</h2>
            <form onSubmit={addMembreBureau} className="space-y-5">
              <div>
                <label className="block mb-1 text-gray-700 font-medium">Name</label>
                <input
                  type="text"
                  value={membre.nom}
                  onChange={(e) => setMembre({ ...membre, nom: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="e.g. Summer Tournament"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-700 font-medium">Role</label>
                <input
                  type="text"
                  value={membre.role}
                  onChange={(e) => setMembre({ ...membre, role: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-700 font-medium">Photo</label>
                <input
                  type="file"
                  onChange={(e) =>  setMembre({ ...membre, image: e.target.files ? e.target.files[0] : null })
                }
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="e.g. Municipal Stadium"
                />
              </div>
         

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 transition-all duration-300 text-gray-800 font-semibold py-2 px-5 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white font-bold py-2 px-6 rounded-lg shadow-md"
                >
                  Update Membre
                </button>
              </div>
            </form>

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
        </div>
      )}
  </div>
</div>
    </div>
  )
}

export default MembreBureau
