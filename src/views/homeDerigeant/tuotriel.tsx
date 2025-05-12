import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../service/api";
import { FaEdit, FaTrash } from "react-icons/fa";
import type { JSX } from "react";
import Swal from "sweetalert2";
import ImageCarousel from "../../component/carousel";
import { useSendNotification } from "../../component/notifocation";



interface Ressource {
    _id?: string;
    titre: string;
    contenu: string;
    type?: string;
    createdAt?: Date
    video?: File;
    niveau:string
    duree:string

}

const FaTrashIcon = FaTrash as unknown as () => JSX.Element;
const FaEditIcon = FaEdit as unknown as () => JSX.Element;
const Tutoriel = () => {
    const [tutoriel, setMeltimedia] = useState<Ressource[]>([])
    const { clubId } = useParams()
    const getAlltutorielRessource = async () => {
        try {
            const res = await api.getClub(clubId)
            console.log('all tutoriel for this club', res.data)
            setMeltimedia(res.data.getclub.tutoriel)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getAlltutorielRessource()
    }, [])

    const [newtutoriel, setNewtutoriel] = useState<Ressource>({
        titre: '',
        type: "tutoriel",
        contenu: '',
        niveau:"",
        duree:""
    });
    const [showModal, setShowModal] = useState(false);
    const { sendNotification } = useSendNotification();
      const [commentaires, setCommentaires] = useState<{ [key: string]: any[] }>({});
      const [showComments, setShowComments] = useState<{ [key: string]: boolean }>({});
  const localStorageData = localStorage.getItem('userClub')
        ? JSON.parse(localStorage.getItem('userClub') as string)
        : null;

    const userId = localStorageData?.user?._id;
    const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          const updatedTutoriel = { ...newtutoriel };
          updatedTutoriel.video = file;
          setNewtutoriel(updatedTutoriel);
        }
      };
    const handleAddtutoriel = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!clubId) return
        try {

            const formData = new FormData()
            formData.append('titre', newtutoriel.titre)
            formData.append('contenu', newtutoriel.contenu)
            formData.append('type', "tutoriel")
            formData.append('club', clubId)
            formData.append('niveau',newtutoriel.niveau)
            formData.append('duree',newtutoriel.duree)
            formData.append('video',newtutoriel.video?? "")




            const response = await api.addTutoriel(formData);
            console.log('tutoriel added by club manager:', response.data);
            await sendNotification(
                "📘 Nouveau tutoriel ajouté !",
                `Le club vient de publier un nouveau tutoriel : ${newtutoriel.titre}`
            );
            getAlltutorielRessource();
            setShowModal(false);
        } catch (error) {
            console.error(error);
        }
    };


    //delete tutoriel
    const deletetutoriel = async (id: any) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await api.deleteTutoriel(id);
                    Swal.fire("Deleted!", "Your event has been deleted.", "success");
                    getAlltutorielRessource();
                } catch (error) {
                    console.error(error);
                    Swal.fire("Error!", "Failed to delete the event.", "error");
                }
            }
        });
    };


    //edit tutoriel

    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [selectedtutoriel, setSelectedtutoriel] = useState<string | null>(null);
    const [edit, setEdit] = useState<Ressource>({
        titre: '',
        type: "tutoriel",
        contenu: '',
        niveau:"",
        duree:""
    });
    const handleEditClick = (tutoriel: Ressource) => {
        if (!tutoriel._id) return;

        setSelectedtutoriel(tutoriel._id);
        setEdit({
            titre: tutoriel.titre,
            contenu: tutoriel.contenu,
            niveau:tutoriel.niveau,
            duree:tutoriel.duree
        });
        setOpenModalEdit(true);
    };


    const edittutoriel = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedtutoriel) return
        if (!clubId) return

        try {

            const formData = new FormData()
            formData.append('titre', edit.titre)
            formData.append('contenu', edit.contenu)
            formData.append('type', "tutoriel")
            formData.append('club', clubId)
            formData.append('niveau',newtutoriel.niveau?? "")
            formData.append('duree',newtutoriel.duree ?? "")
            formData.append('video',newtutoriel.video ?? "")

           
            const response = await api.updateTutoriel(selectedtutoriel, formData)
            console.log('tutoriel updated:', response.data);
            
            getAlltutorielRessource();
            setOpenModalEdit(false);
        } catch (error) {
            console.log(error)
        }
    }


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
       
    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-center text-purple-800 mb-10">
                    📘 Club tutoriels
                </h1>
                <button
                    onClick={() => setShowModal(true)}

                    className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white font-bold py-2 px-6 rounded-lg shadow-md"
                >
                    Add New tutoriel
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {tutoriel.length > 0 ? (
                    tutoriel.map((item, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                              {item.video && (
  <video controls className="w-full h-48 object-cover rounded">
    <source src={`http://localhost:5000/file/${item.video}`} type="video/mp4" />
    Votre navigateur ne prend pas en charge la vidéo.
  </video>
)}
                            <div className="p-4">
                                <h2 className="text-lg font-semibold text-gray-800 mb-2">{item.titre}</h2>
                                <h2 className="text-lg font-semibold text-gray-800 mb-2">{item.niveau}</h2>
                                <p className="text-sm text-gray-600 mb-4">{item.contenu}</p>
                                <div className="flex justify-between">
                                    <button
                                        onClick={() => handleEditClick(item)}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        <FaEditIcon />
                                    </button>
                                    <button
                                        onClick={() => deletetutoriel(item._id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <FaTrashIcon />
                                    </button>
                                </div>
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

                
                </div>
              )}
                        </div>
                    ))
                ) : (
                    <p className="text-center col-span-full text-gray-500">Aucune ressource disponible.</p>
                )}
            </div>


            {/* Modal modal ajout */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-lg relative">
                        <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">Add a New Event</h2>
                        <form onSubmit={handleAddtutoriel} className="space-y-5">
                            <div>
                                <label className="block mb-1 text-gray-700 font-medium">tutoriel Title</label>
                                <input
                                    type="text"
                                    value={newtutoriel.titre}
                                    onChange={(e) => setNewtutoriel({ ...newtutoriel, titre: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="e.g. Summer Tournament"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-1 text-gray-700 font-medium">tutoriel Content</label>
                                <input
                                    type="text"
                                    value={newtutoriel.contenu}
                                    onChange={(e) => setNewtutoriel({ ...newtutoriel, contenu: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-1 text-gray-700 font-medium">tutoriel Level</label>
                                <input
                                    type="text"
                                    value={newtutoriel.niveau}
                                    onChange={(e) => setNewtutoriel({ ...newtutoriel, niveau: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1 text-gray-700 font-medium">tutoriel Duration</label>
                                <input
                                    type="text"
                                    value={newtutoriel.duree}
                                    onChange={(e) => setNewtutoriel({ ...newtutoriel, duree: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-1 text-gray-700 font-medium">tutoriel Gallerie</label>
                                <input
                                    type="file"
                                    onChange={handleVideoChange} className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="e.g. Municipal Stadium"
                                    multiple
                                    required
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
                                    Add Event
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

            {/*modal edit*/}
            {openModalEdit && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-lg relative">
                        <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">Edit Mutimedia</h2>
                        <form onSubmit={edittutoriel} className="space-y-5">
                            <div>
                                <label className="block mb-1 text-gray-700 font-medium">tutoriel Title</label>
                                <input
                                    type="text"
                                    value={edit.titre}
                                    onChange={(e) => setEdit({ ...edit, titre: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="e.g. Summer Tournament"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-1 text-gray-700 font-medium">tutoriel Content</label>
                                <input
                                    type="text"
                                    value={edit.contenu}
                                    onChange={(e) => setEdit({ ...edit, contenu: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1 text-gray-700 font-medium">tutoriel Level</label>
                                <input
                                    type="text"
                                    value={edit.niveau}
                                    onChange={(e) => setEdit({ ...edit, niveau: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1 text-gray-700 font-medium">tutoriel duration</label>
                                <input
                                    type="text"
                                    value={edit.duree}
                                    onChange={(e) => setEdit({ ...edit, duree: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-1 text-gray-700 font-medium">tutoriel Gallerie</label>
                                <input
                                    type="file"
                                    onChange={handleVideoChange}
                                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="e.g. Municipal Stadium"
                                    multiple
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
                                    Update tutoriel
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

        </div>
    );
};

export default Tutoriel;
