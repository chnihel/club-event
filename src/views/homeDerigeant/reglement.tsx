import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../service/api";
import { FaEdit, FaTrash } from "react-icons/fa";
import type { JSX } from "react";
import Swal from "sweetalert2";
import { useSendNotification } from "../../component/notifocation";



interface Ressource {
    _id?: string;
    titre: string;
    contenu: string;
    type?: string;
    createdAt?: Date
    version?: string

}

const FaTrashIcon = FaTrash as unknown as () => JSX.Element;
const FaEditIcon = FaEdit as unknown as () => JSX.Element;
const Reglement = () => {
    const [reglements, setreglement] = useState<Ressource[]>([])
    const { sendNotification } = useSendNotification();

    const { clubId } = useParams()
    const getAllreglementRessource = async () => {
        try {
            const res = await api.getClub(clubId)
            console.log('all reglement for this club', res.data)
            setreglement(res.data.getclub.reglement)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getAllreglementRessource()
    }, [])

    const [newreglement, setNewreglement] = useState<Ressource>({
        titre: '',
        type: "reglement",
        contenu: '',
        version: ''
    });
    const [showModal, setShowModal] = useState(false);

    const handleAddreglement = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const datareglement = {
                ...newreglement,
                club: clubId
            }

            const response = await api.addReglement(datareglement);
            console.log('reglement added by club manager:', response.data);
            await sendNotification(
                "📘 Nouveau guide ajouté !",
                `Le club vient de publier un nouveau guide : ${datareglement.titre}`
            );
            getAllreglementRessource();
            setShowModal(false);
        } catch (error) {
            console.error(error);
        }
    };


    //delete reglement
    const deletereglement = async (id: any) => {
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
                    await api.deleteReglement(id);
                    Swal.fire("Deleted!", "Your event has been deleted.", "success");
                    getAllreglementRessource();
                } catch (error) {
                    console.error(error);
                    Swal.fire("Error!", "Failed to delete the event.", "error");
                }
            }
        });
    };


    //edit reglement

    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [selectedreglement, setSelectedreglement] = useState<string | null>(null);
    const [edit, setEdit] = useState<Ressource>({
        titre: '',
        type: "reglement",
        contenu: '',
        version: ''
    });
    const handleEditClick = (reglement: Ressource) => {
        if (!reglement._id) return;

        setSelectedreglement(reglement._id);
        setEdit({
            titre: reglement.titre,
            contenu: reglement.contenu,
            version: reglement.version,
        });
        setOpenModalEdit(true);
    };


    const editreglement = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedreglement) return
        try {
            const response = await api.updateReglement(selectedreglement, edit)
            console.log('reglement updated:', response.data);

            getAllreglementRessource();
            setOpenModalEdit(false);
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-center text-purple-800 mb-10">
                    📘 Club reglements
                </h1>
                <button
                    onClick={() => setShowModal(true)}

                    className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white font-bold py-2 px-6 rounded-lg shadow-md"
                >
                    Add New Reglement
                </button>
            </div>
            {reglements.length === 0 ? (
                <p className="text-center text-gray-500">No reglements available yet.</p>
            ) : (
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
                    {reglements.map((reglement, index) => (
                        <div
                            key={index}
                            className="relative bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300"
                        >
                            <div className="absolute top-4 right-5 flex space-x-3">
                                <button
                                    onClick={() => handleEditClick(reglement)}
                                    className="text-blue-500 hover:text-blue-700"
                                    title="Update Event"
                                >
                                    <FaEditIcon />
                                </button>
                                <button
                                    onClick={() => deletereglement(reglement._id)}
                                    className="text-red-500 hover:text-red-700"
                                    title="Delete Event"
                                >
                                    <FaTrashIcon />
                                </button>

                            </div>
                            <h2 className="text-xl font-semibold text-purple-700 mb-2">
                                {reglement.titre}
                            </h2>

                            {reglement.version && (
                                <p className="text-sm text-gray-500 mb-1">
                                    <span className="font-medium text-gray-600">📂 Category:</span>{" "}
                                    {reglement.version}
                                </p>
                            )}

                            <p className="text-gray-700 text-sm mb-2 leading-relaxed">
                                {reglement.contenu}
                            </p>

                            {reglement.createdAt && (
                                <p className="text-xs text-gray-400 italic">
                                    🕒 Published on {new Date(reglement.createdAt).toLocaleDateString("en-GB")}
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
                        <form onSubmit={handleAddreglement} className="space-y-5">
                            <div>
                                <label className="block mb-1 text-gray-700 font-medium">reglement Title</label>
                                <input
                                    type="text"
                                    value={newreglement.titre}
                                    onChange={(e) => setNewreglement({ ...newreglement, titre: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="e.g. Summer Tournament"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-1 text-gray-700 font-medium">reglement Content</label>
                                <input
                                    type="text"
                                    value={newreglement.contenu}
                                    onChange={(e) => setNewreglement({ ...newreglement, contenu: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-1 text-gray-700 font-medium">reglement version</label>
                                <input
                                    type="text"
                                    value={newreglement.version}
                                    onChange={(e) => setNewreglement({ ...newreglement, version: e.target.value })}
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
                        <form onSubmit={editreglement} className="space-y-5">
                            <div>
                                <label className="block mb-1 text-gray-700 font-medium">reglement Title</label>
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
                                <label className="block mb-1 text-gray-700 font-medium">reglement Content</label>
                                <input
                                    type="text"
                                    value={edit.contenu}
                                    onChange={(e) => setEdit({ ...edit, contenu: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-1 text-gray-700 font-medium">reglement Category</label>
                                <input
                                    type="text"
                                    value={edit.version}
                                    onChange={(e) => setEdit({ ...edit, version: e.target.value })}
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
                                    Update reglement
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

export default Reglement;
