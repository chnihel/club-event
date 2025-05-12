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
    format?: string[];

}

const FaTrashIcon = FaTrash as unknown as () => JSX.Element;
const FaEditIcon = FaEdit as unknown as () => JSX.Element;
const Multimedia = () => {
    const [multimedia, setMeltimedia] = useState<Ressource[]>([])
        const { sendNotification } = useSendNotification();
    
    const { clubId } = useParams()
    const getAllmultimediaRessource = async () => {
        try {
            const res = await api.getClub(clubId)
            console.log('all multimedia for this club', res.data)
            setMeltimedia(res.data.getclub.multimedia)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getAllmultimediaRessource()
    }, [])

    const [newmultimedia, setNewmultimedia] = useState<Ressource>({
        titre: '',
        type: "multimedia",
        contenu: '',
    });
    const [showModal, setShowModal] = useState(false);
    const [gal, setGal] = useState<File[]>([]);
    const [commentaire, setCommentaire] = useState<{ [key: string]: string }>({});
      const [commentaires, setCommentaires] = useState<{ [key: string]: any[] }>({});
      const [showComments, setShowComments] = useState<{ [key: string]: boolean }>({});
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setGal(Array.from(e.target.files));
        }
    };

    const handleAddmultimedia = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!clubId) return
        try {

            const formData = new FormData()
            formData.append('titre', newmultimedia.titre)
            formData.append('contenu', newmultimedia.contenu)
            formData.append('type', "multimedia")
            formData.append('club', clubId)

            if (gal.length > 0) {
                gal.forEach((format) => {
                    formData.append("format", format);
                });
            }




            const response = await api.addMultimedia(formData);
            console.log('multimedia added by club manager:', response.data);
            await sendNotification(
                "📘 Nouveau multimedia ajouté !",
                `Le club vient de publier un nouveau multimedia : ${newmultimedia.titre}`
            );
            getAllmultimediaRessource();
            setShowModal(false);
        } catch (error) {
            console.error(error);
        }
    };


    //delete multimedia
    const deletemultimedia = async (id: any) => {
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
                    await api.deleteMultimedia(id);
                    Swal.fire("Deleted!", "Your event has been deleted.", "success");
                    getAllmultimediaRessource();
                } catch (error) {
                    console.error(error);
                    Swal.fire("Error!", "Failed to delete the event.", "error");
                }
            }
        });
    };


    //edit multimedia

    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [selectedmultimedia, setSelectedmultimedia] = useState<string | null>(null);
    const [edit, setEdit] = useState<Ressource>({
        titre: '',
        type: "multimedia",
        contenu: '',
    });
    const handleEditClick = (multimedia: Ressource) => {
        if (!multimedia._id) return;

        setSelectedmultimedia(multimedia._id);
        setEdit({
            titre: multimedia.titre,
            contenu: multimedia.contenu,
        });
        setOpenModalEdit(true);
    };

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const editmultimedia = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedmultimedia) return
        if (!clubId) return

        try {

            const formData = new FormData()
            formData.append('titre', edit.titre)
            formData.append('contenu', edit.contenu)
            formData.append('type', "multimedia")
            formData.append('club', clubId)

            if (gal.length > 0) {
                gal.forEach((format) => {
                    formData.append("format", format);
                });
            }
            const response = await api.updateMultimedia(selectedmultimedia, formData)
            console.log('multimedia updated:', response.data);

            getAllmultimediaRessource();
            setOpenModalEdit(false);
        } catch (error) {
            console.log(error)
        }
    }

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
    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-center text-purple-800 mb-10">
                    📘 Club multimedias
                </h1>
                <button
                    onClick={() => setShowModal(true)}

                    className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white font-bold py-2 px-6 rounded-lg shadow-md"
                >
                    Add New multimedia
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {multimedia.length > 0 ? (
                    multimedia.map((item, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                            {item.format && item.format.length > 0 && (
                                <div className="p-4">
                                    <ImageCarousel item={item} />
                                </div>
                            )}
                            <div className="p-4">
                                <h2 className="text-lg font-semibold text-gray-800 mb-2">{item.titre}</h2>
                                <p className="text-sm text-gray-600 mb-4">{item.contenu}</p>
                                <div className="flex justify-between">
                                    <button
                                        onClick={() => handleEditClick(item)}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        <FaEditIcon />
                                    </button>
                                    <button
                                        onClick={() => deletemultimedia(item._id)}
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
                        <form onSubmit={handleAddmultimedia} className="space-y-5">
                            <div>
                                <label className="block mb-1 text-gray-700 font-medium">multimedia Title</label>
                                <input
                                    type="text"
                                    value={newmultimedia.titre}
                                    onChange={(e) => setNewmultimedia({ ...newmultimedia, titre: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="e.g. Summer Tournament"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-1 text-gray-700 font-medium">multimedia Content</label>
                                <input
                                    type="text"
                                    value={newmultimedia.contenu}
                                    onChange={(e) => setNewmultimedia({ ...newmultimedia, contenu: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-1 text-gray-700 font-medium">multimedia Gallerie</label>
                                <input
                                    type="file"
                                    value={newmultimedia.format}
                                    onChange={handleImageChange} className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                        <form onSubmit={editmultimedia} className="space-y-5">
                            <div>
                                <label className="block mb-1 text-gray-700 font-medium">multimedia Title</label>
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
                                <label className="block mb-1 text-gray-700 font-medium">multimedia Content</label>
                                <input
                                    type="text"
                                    value={edit.contenu}
                                    onChange={(e) => setEdit({ ...edit, contenu: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-1 text-gray-700 font-medium">multimedia Gallerie</label>
                                <input
                                    type="file"
                                    onChange={handleImageChange}
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
                                    Update multimedia
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

export default Multimedia;
