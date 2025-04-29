import React, { ChangeEvent, useEffect, useState } from 'react';
import "./changerPassword/changerPassword.css";
import api from '../../service/api';

interface User {
  _id?: string;
  nom: string;
  prenom: string;
  email: string;
  dateNaissance: string;
  telephone: string;
  sexe: string;
  origine: string;
  faculte: string;
  image?: File | string; // Ajout de File ou string pour l'image
  adresse?: string;
}

const Profile = () => {
  const [data, setData] = useState<User | null>(null);
  const localStorageData = localStorage.getItem('userClub')
    ? JSON.parse(localStorage.getItem('userClub') as string)
    : null;
  const userId = localStorageData ? localStorageData.user?._id : null;

  const getInformation = async () => {
    try {
      const response = await api.getDerigeantByClub(userId);
      setData(response.data.data);
      setEdit(response.data.data); // Initialisation de edit avec les données
      console.log('les données user', response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [edit, setEdit] = useState<User>({} as User);

  // Mise à jour de edit avec les valeurs modifiées
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEdit({
      ...edit,
      [e.target.name]: e.target.value
    });
  };

  // Gestion du changement de l'image
   const onChangeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
          if (e.target.files && e.target.files[0]) {
            setEdit({ ...edit, image: e.target.files[0] });
          }
        };
  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("nom", edit.nom);
      formData.append("prenom", edit.prenom);
      formData.append("telephone", edit.telephone ? edit.telephone.toString() : '');
      formData.append("datenaissance", edit.dateNaissance);
      formData.append("genre", edit.sexe);
      formData.append("email", edit.email);
      formData.append("adresse", edit.adresse ?? '');
      formData.append("origine", edit.origine ?? '');
      formData.append("faculté", edit.faculte ?? '');
      if (edit.image instanceof File) {
        formData.append("image", edit.image);
      }
      
      const response = await api.updateDerigeant(userId, formData);
      console.log('user update', response.data);
      localStorage.setItem('userClub', JSON.stringify(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInformation();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-5">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* En-tête */}
          <div className="changer-header">
            <h1>Profile</h1>
          </div>

          {/* Contenu */}
          <div className="px-6 py-8 space-y-6">
            <div className="changer-content">
              <form onSubmit={updateProfile}>
                <div className="flex items-center space-x-6">
                  <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-gray-300">
                    {edit?.image ? (
                      typeof edit.image === 'string' ? (
                        <img
                          className="h-full w-full object-cover"
                          src={`http://localhost:5000/file/${edit.image}`}
                          alt="Profile"
                        />
                      ) : (
                        <img
                          className="h-full w-full object-cover"
                          src={URL.createObjectURL(edit.image)} // Aperçu de l'image
                          alt="Profile Preview"
                        />
                      )
                    ) : (
                      <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                        No Image
                      </div>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="fileInput"
                      className="px-4 py-2 text-sm text-indigo-600 bg-indigo-50 rounded-md shadow hover:bg-indigo-100 transition cursor-pointer"
                    >
                      Changer la photo
                    </label>
                    <input
                      type="file"
                      id="fileInput"
                      name="image"
                      onChange={onChangeImageHandler}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Grille de champs */}
                <div className="changer-grid">
                  <div className="form-group">
                    <label htmlFor="nom">Nom</label>
                    <input
                      type="text"
                      id="nom"
                      value={edit?.nom || ''}
                      name="nom"
                      onChange={changeHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="prenom">Prénom</label>
                    <input
                      type="text"
                      id="prenom"
                      value={edit?.prenom || ''}
                      name="prenom"
                      onChange={changeHandler}
                    />
                  </div>
                </div>

                <div className="changer-grid">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={edit?.email || ''}
                      name="email"
                      onChange={changeHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="dateNaissance">Date de Naissance</label>
                    <input
                      type="date"
                      id="dateNaissance"
                      value={edit?.dateNaissance || ''}
                      name="dateNaissance"
                      onChange={changeHandler}
                    />
                  </div>
                </div>

                <div className="changer-grid">
                  <div className="form-group">
                    <label htmlFor="telephone">Téléphone</label>
                    <input
                      type="tel"
                      id="telephone"
                      value={edit?.telephone || ''}
                      name="telephone"
                      onChange={changeHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="adresse">Adresse</label>
                    <input
                      type="text"
                      id="adresse"
                      value={edit?.adresse || ''}
                      name="adresse"
                      onChange={changeHandler}
                    />
                  </div>
                </div>

                <div className="changer-grid">
                  <div className="form-group">
                    <label htmlFor="faculte">Faculté</label>
                    <input
                      type="text"
                      id="faculte"
                      value={edit?.faculte || ''}
                      name="faculte"
                      onChange={changeHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="sexe">Sexe</label>
                    <input
                      type="text"
                      id="sexe"
                      value={edit?.sexe || ''}
                      name="sexe"
                      onChange={changeHandler}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="origine">Origine</label>
                  <input
                    type="text"
                    id="origine"
                    value={edit?.origine || ''}
                    name="origine"
                    onChange={changeHandler}
                  />
                </div>

                <div className="changer-actions">
                  <button type="submit">Modifier</button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
