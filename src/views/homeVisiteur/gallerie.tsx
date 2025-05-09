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
const Gallerie = () => {
    const [multimedia, setMeltimedia] = useState<Ressource[]>([])

    const { id } = useParams()
    const getAllmultimediaRessource = async () => {
        try {
            const res = await api.getClub(id)
            console.log('all multimedia for this club', res.data)
            setMeltimedia(res.data.getclub.multimedia)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getAllmultimediaRessource()
    }, [])
    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex justify-center items-center mb-8">
                <h1 className="text-4xl font-extrabold text-center text-purple-700">
                    📘 Multimedia Club Resources
                </h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {multimedia.length > 0 ? (
                    multimedia.map((item, index) => (
<div
  key={index}
  className="bg-gradient-to-br from-purple-100 to-white border border-purple-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
>                            {item.format && item.format.length > 0 && (
                                <div className="p-4">
                                    <ImageCarousel item={item} />
                                </div>
                            )}
                            <div className="p-4">
                                <h2 className="text-xl font-bold text-purple-900 mb-2">{item.titre}</h2>
                                <p className="text-base text-gray-700">{item.contenu}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center col-span-full text-gray-500">No resources available.</p>
                )}
            </div>



        </div>
    );
};

export default Gallerie;
