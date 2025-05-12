import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../service/api'
import { FaEdit, FaTrash } from 'react-icons/fa'
import Swal from 'sweetalert2';
import type { JSX } from "react";

interface Rapport {
  _id?: string
  description: string
  club: Club
}
interface Club {
  _id?: string;
  nomClub: string;
}

const FaTrashIcon = FaTrash as unknown as () => JSX.Element;
const FaEditIcon = FaEdit as unknown as () => JSX.Element;

const Rapport = () => {
  const { clubId } = useParams()
  const [data, setData] = useState<Rapport>({ description: "", club: { _id: "", nomClub: "" } })
  const [edit, setEdit] = useState<Rapport>({ description: "", club: { _id: "", nomClub: "" } })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [rapport, setRapport] = useState<Rapport[]>([])

  const addRapport = async () => {
    try {
      const dataRapport = { ...data, club: clubId }
      await api.addrapport(dataRapport)
      alert("Rapport ajouté avec succès")
      setData({ description: "", club: { _id: "", nomClub: "" } })
      getAllRapport()
    } catch (error) {
      console.log(error)
    }
  }

  const getAllRapport = async () => {
    try {
      const getRapportByClub = await api.getClub(clubId)
      setRapport(getRapportByClub.data.getclub.rapport)
    } catch (error) {
      console.log(error)
    }
  }

  const updateRapport = async (rapportId: string) => {
    try {
      await api.updateRapport(rapportId, { ...edit, club: clubId })
      Swal.fire('Succès', 'Le rapport a été mis à jour.', 'success')
      setEditingId(null)
      getAllRapport()
    } catch (error) {
      Swal.fire('Erreur', 'Erreur lors de la mise à jour.', 'error')
    }
  }

  const supprimerRapport = async (rapportId: string) => {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Cette action est irréversible !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer !'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.deleteRapport(rapportId)
          Swal.fire('Supprimé !', 'Le rapport a été supprimé.', 'success')
          getAllRapport()
        } catch (error) {
          Swal.fire('Erreur', 'Erreur lors de la suppression.', 'error')
        }
      }
    });
  }

  useEffect(() => {
    getAllRapport()
  }, [clubId])

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#2C3E50' }}>Ajouter un Rapport</h2>
      <div style={{ maxWidth: '600px', margin: 'auto', marginTop: '2rem' }}>
        <textarea
          placeholder="Description du rapport"
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          style={{
            width: '100%',
            height: '120px',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            marginBottom: '10px'
          }}
        />
        <button
          onClick={addRapport}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Ajouter le Rapport
        </button>
      </div>

      <div style={{ marginTop: '3rem' }}>
        <h3 style={{ textAlign: 'center', color: '#2C3E50' }}>Rapports existants</h3>
        {rapport.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#7F8C8D' }}>Aucun rapport disponible.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {rapport.map((item, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: '#f8f9fa',
                  padding: '1rem',
                  borderRadius: '10px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                  border: '1px solid #ccc',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <h4 style={{ color: '#2C3E50', margin: 0 }}>Rapport {index + 1}</h4>
                    <p style={{ marginTop: '0.5rem' }}>{item.description}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => supprimerRapport(item._id!)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete Event"
                    >
                      <FaTrashIcon />
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(item._id!); 
                        setEdit({ description: item.description, club: item.club });
                      }}
                      className="text-blue-500 hover:text-blue-700"
                      title="Update Event"
                    >
                      <FaEditIcon />
                    </button>
                  </div>
                </div>

                {editingId === item._id && (
                  <div style={{ marginTop: '1rem' }}>
                    <textarea
                      value={edit.description}
                      onChange={(e) => setEdit({ ...edit, description: e.target.value })}
                      style={{
                        width: '100%',
                        height: '100px',
                        padding: '10px',
                        fontSize: '15px',
                        borderRadius: '8px',
                        border: '1px solid #bbb',
                        marginBottom: '10px'
                      }}
                    />
                    <button
                      onClick={() => updateRapport(item._id!)}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#2ecc71',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '15px'
                      }}
                    >
                      Mettre à jour
                    </button>
                    <button
                      onClick={() => setEditingId(null)} // Cancel editing
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#e74c3c',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '15px',
                        marginLeft: '10px'
                      }}
                    >
                      Annuler
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Rapport
