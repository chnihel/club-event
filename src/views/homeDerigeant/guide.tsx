import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../service/api";
import { FaEdit, FaTrash } from "react-icons/fa";
import type { JSX } from "react";
import Swal from "sweetalert2";



interface Ressource {
    _id?: string;
    titre: string;
    contenu: string;
    type?: string;
    createdAt?: Date
    category?: string

}

const FaTrashIcon = FaTrash as unknown as () => JSX.Element;
const FaEditIcon = FaEdit as unknown as () => JSX.Element;
const Guide = () => {
    const [guides, setGuide] = useState<Ressource[]>([])
    const { clubId } = useParams()
    const getAllGuideRessource = async () => {
        try {
            const res = await api.getClub(clubId)
            console.log('all guide for this club', res.data)
            setGuide(res.data.getclub.guide)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getAllGuideRessource()
    }, [])

    const [newGuide, setNewGuide] = useState<Ressource>({
        titre: '',
        type: "guide",
        contenu: '',
        category: ''
    });
    const [showModal, setShowModal] = useState(false);

    const handleAddGuide = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const dataGuide = {
                ...newGuide,
                club: clubId
            }

            const response = await api.addGuide(dataGuide);
            console.log('guide added by club manager:', response.data);
            getAllGuideRessource();
            setShowModal(false);
        } catch (error) {
            console.error(error);
        }
    };


    //delete guide
    const deleteGuide = async (id: any) => {
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
                    await api.deleteGuide(id);
                    Swal.fire("Deleted!", "Your event has been deleted.", "success");
                    getAllGuideRessource();
                } catch (error) {
                    console.error(error);
                    Swal.fire("Error!", "Failed to delete the event.", "error");
                }
            }
        });
    };


    //edit guide

    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [selectedGuide, setSelectedGuide] = useState<string | null>(null);
    const [edit, setEdit] = useState<Ressource>({
        titre: '',
        type: "guide",
        contenu: '',
        category: ''
    });
    const handleEditClick = (guide: Ressource) => {
        if (!guide._id) return;

        setSelectedGuide(guide._id);
        setEdit({
            titre: guide.titre,
            contenu: guide.contenu,
            category: guide.category,
        });
        setOpenModalEdit(true);
    };


    const editGuide = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedGuide) return
        try {
            const response = await api.updateGuide(selectedGuide, edit)
            console.log('guide updated:', response.data);

            getAllGuideRessource();
            setOpenModalEdit(false);
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-center text-purple-800 mb-10">
                    📘 Club Guides
                </h1>
                <button
                    onClick={() => setShowModal(true)}

                    className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white font-bold py-2 px-6 rounded-lg shadow-md"
                >
                    Add New Guidde
                </button>
            </div>
            {guides.length === 0 ? (
                <p className="text-center text-gray-500">No guides available yet.</p>
            ) : (
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
                    {guides.map((guide, index) => (
                        <div
                            key={index}
                            className="relative bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300"
                        >
                            <div className="absolute top-4 right-5 flex space-x-3">
                                <button
                                    onClick={() => handleEditClick(guide)}
                                    className="text-blue-500 hover:text-blue-700"
                                    title="Update Event"
                                >
                                    <FaEditIcon />
                                </button>
                                <button
                                    onClick={() => deleteGuide(guide._id)}
                                    className="text-red-500 hover:text-red-700"
                                    title="Delete Event"
                                >
                                    <FaTrashIcon />
                                </button>

                            </div>
                            <h2 className="text-xl font-semibold text-purple-700 mb-2">
                                {guide.titre}
                            </h2>

                            {guide.category && (
                                <p className="text-sm text-gray-500 mb-1">
                                    <span className="font-medium text-gray-600">📂 Category:</span>{" "}
                                    {guide.category}
                                </p>
                            )}

                            <p className="text-gray-700 text-sm mb-2 leading-relaxed">
                                {guide.contenu}
                            </p>

                            {guide.createdAt && (
                                <p className="text-xs text-gray-400 italic">
                                    🕒 Published on {new Date(guide.createdAt).toLocaleDateString("en-GB")}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Modal modal ajout */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-lg relative">
                        <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">Add a New Event</h2>
                        <form onSubmit={handleAddGuide} className="space-y-5">
                            <div>
                                <label className="block mb-1 text-gray-700 font-medium">Guide Title</label>
                                <input
                                    type="text"
                                    value={newGuide.titre}
                                    onChange={(e) => setNewGuide({ ...newGuide, titre: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="e.g. Summer Tournament"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-1 text-gray-700 font-medium">Guide Content</label>
                                <input
                                    type="text"
                                    value={newGuide.contenu}
                                    onChange={(e) => setNewGuide({ ...newGuide, contenu: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-1 text-gray-700 font-medium">Guide Category</label>
                                <input
                                    type="text"
                                    value={newGuide.category}
                                    onChange={(e) => setNewGuide({ ...newGuide, category: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="e.g. Municipal Stadium"
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
                        <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">Add a New Event</h2>
                        <form onSubmit={editGuide} className="space-y-5">
                            <div>
                                <label className="block mb-1 text-gray-700 font-medium">Guide Title</label>
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
                                <label className="block mb-1 text-gray-700 font-medium">Guide Content</label>
                                <input
                                    type="text"
                                    value={edit.contenu}
                                    onChange={(e) => setEdit({ ...edit, contenu: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-1 text-gray-700 font-medium">Guide Category</label>
                                <input
                                    type="text"
                                    value={edit.category}
                                    onChange={(e) => setEdit({ ...edit, category: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="e.g. Municipal Stadium"
                                    required
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
                                    Update Guide
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

export default Guide;
