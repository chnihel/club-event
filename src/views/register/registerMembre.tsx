import React, { useState,ChangeEvent, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import auth from '../../service/auth'

interface MembreData {
    nom?: string;
    prenom?: string;
    telephone?: string;
    dateNaissance?: string;
    sexe?: string;
    email?: string;
    password?: string;
    adresse?: string;
    faculte?: string;
    origine?: string;
    role: string;
    image?: File;
  }
const RegisterMembre : React.FC =() => {
    const [data,setData]=useState<MembreData>({role:"membre"})
    const navigate=useNavigate()
    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setData({
          ...data,
          [e.target.name]: e.target.value
        });
      };

      const onChangeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
          setData({ ...data, image: e.target.files[0] });
        }
      };

      const createMembre = async (e:FormEvent) => {
        e.preventDefault();
    
        const {
          nom,
          prenom,
          telephone,
          dateNaissance,
          sexe,
          email,
          password,
          adresse,
          faculte,
          origine
        } = data;
    
        // Vérification des champs requis
        if (!nom || !prenom || !telephone || !dateNaissance || !sexe || !email || !password || !adresse ||!origine ||!faculte) {
          Swal.fire({
            icon: "error",
            title: "Champs manquants",
            text: "Veuillez remplir tous les champs obligatoires.",
            confirmButtonColor: "#ffa250",
          });
          return;
        }
    
        // Vérification du téléphone (8 chiffres)
        const telRegex = /^[0-9]{8}$/;
        if (!telRegex.test(telephone)) {
          Swal.fire({
            icon: "error",
            title: "Téléphone invalide",
            text: "Le numéro de téléphone doit contenir exactement 8 chiffres.",
            confirmButtonColor: "#ffa250",
          });
          return;
        }    
        // Vérification de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          Swal.fire({
            icon: "error",
            title: "Email invalide",
            text: "Veuillez entrer une adresse email valide.",
            confirmButtonColor: "#ffa250",
          });
          return;
        }
    
        // Vérification du mot de passe fort
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
        if (!passwordRegex.test(password)) {
          Swal.fire({
            icon: "error",
            title: "Mot de passe invalide",
            html: `Le mot de passe doit contenir :
              <ul style="text-align: left;">
                <li>Au moins 8 caractères</li>
                <li>Au moins une lettre</li>
                <li>Au moins un chiffre</li>
                <li>Au moins un caractère spécial</li>
              </ul>`,
            confirmButtonColor: "#ffa250",
          });
          return;
        }
    
        try {
          const formData = new FormData();
          formData.append("nom", nom);
          formData.append("prenom", prenom);
          formData.append("telephone", telephone);
          formData.append("datenaissance", dateNaissance);
          formData.append("genre", sexe);
          formData.append("email", email);
          formData.append("password", password);
         
          formData.append("role", "membre");
          formData.append("adresse", adresse);
          formData.append("origine", origine ?? '');
          formData.append("faculté", faculte ?? '');
          if (data.image) {
            formData.append("image", data.image);
          }
    
          const response = await auth.creerMembre(formData);
          console.log("Membre créé", response.data);
    
          Swal.fire({
            icon: "success",
            title: "Succès",
            text: "Hôtelier créé avec succès",
            confirmButtonColor: "#ffa250",
          });
    
          navigate("/login");
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Erreur",
            text: "Erreur lors de la création du compte.",
            confirmButtonColor: "#ffa250",
          });
          console.error(error);
        }
      };

  return (
   <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
  <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
    <div className="flex flex-col overflow-y-auto md:flex-row">
      <div className="h-32 md:h-auto md:w-1/2">
        <img aria-hidden="true" className="object-cover w-full h-full dark:hidden" src="../assets/img/create-account-office.jpeg" alt="Office" />
        <img aria-hidden="true" className="hidden object-cover w-full h-full dark:block" src="../assets/img/create-account-office-dark.jpeg" alt="Office" />
      </div>
      <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
        <div className="w-full">
          <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
            Create Membre
          </h1>
          <form onSubmit={createMembre}>
          <label className="block text-sm">
            <span className="text-gray-700 dark:text-gray-400">FirstName</span>
            <input type='text' name='nom' onChange={changeHandler} className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input" placeholder="Jane Doe" />
          </label>
          <label className="block text-sm">
            <span className="text-gray-700 dark:text-gray-400">LastName</span>
            <input type='text' name='prenom' onChange={changeHandler} className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input" placeholder="Jane Doe" />
          </label>
          <label className="block text-sm">
            <span className="text-gray-700 dark:text-gray-400">BirthdDay</span>
            <input type='date' name='dateNaissance' onChange={changeHandler} className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input" placeholder="Jane Doe" />
          </label>
          
          <label className="block text-sm">
            <span className="text-gray-700 dark:text-gray-400">Email</span>
            <input type='email' name='email' onChange={changeHandler} className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input" placeholder="Jane Doe" />
          </label>
          <label className="block text-sm">
            <span className="text-gray-700 dark:text-gray-400">Phone</span>
            <input type='number' name='telephone' onChange={changeHandler} className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input" placeholder="Jane Doe" />
          </label>
          <label className="block text-sm">
            <span className="text-gray-700 dark:text-gray-400">Adresse</span>
            <input type='text' name='adresse' onChange={changeHandler} className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input" placeholder="Jane Doe" />
          </label>
          <label className="block text-sm">
            <span className="text-gray-700 dark:text-gray-400">Faculty</span>
            <input type='text' name='faculte' onChange={changeHandler} className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input" placeholder="Jane Doe" />
          </label>
          <label className="block mt-4 text-sm">
            <span className="text-gray-700 dark:text-gray-400">Password</span>
            <input type='password' name='password' onChange={changeHandler} className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input" placeholder="***************" />
          </label>
          <label className="block text-sm">
            <span className="text-gray-700 dark:text-gray-400">Gender</span>
            <input type='text' name='sexe' onChange={changeHandler} className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input" placeholder="Jane Doe" />
          </label>
          <label className="block text-sm">
            <span className="text-gray-700 dark:text-gray-400">Origin</span>
            <input type='text' name='origine' onChange={changeHandler} className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input" placeholder="Jane Doe" />
          </label>
          <label className="block text-sm">
            <span className="text-gray-700 dark:text-gray-400">Profile</span>
            <input type='file' name='image' onChange={onChangeImageHandler} className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input" placeholder="Jane Doe" />
          </label>
         
          <button type='submit' className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
            Create account
          </button>
          </form>
          <hr className="my-8" />
          <p className="mt-4">
            
            <Link to={'/login'} className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline" >
              Already have an account? Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default RegisterMembre
