// src/pages/DetailsClubPage.tsx
import React, { useEffect, useState } from 'react';
import ClubDetails from '../component/pageClub';
import { useParams } from 'react-router-dom';
import api from '../service/api';

interface MembreBureau{
  nom:string;
  role:string;
  image:File
}
interface Club {
  _id?: string;
  nomClub: string;
  description: string;
  derigeantClub?: string;
  logo?: string | File | null;
  activitePrincipale?: string
  mission?: string
  vision?: string
  objectifs?: string
  membresBureau?:MembreBureau[]
}
const DetailsClubPage = () => {
  const {id}=useParams()
  const [detailsClub,setDetailsClub]=useState<Club |null>(null) 
  const getDetailsClub=async()=>{
    try {
      const response=await api.getClub(id)
      console.log('les details de club',response.data)
setDetailsClub(response.data.getclub)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getDetailsClub()
  },[id])
  if (!detailsClub) return <div>Chargement...</div>;

  return (
    <ClubDetails
      nomClub={detailsClub.nomClub}
      description={detailsClub.description}
      logo={detailsClub.logo}  
      mission={detailsClub.mission || ""}
      vision={detailsClub.vision || ""}
      objectifs={detailsClub.objectifs || ""}
      activitePrincipale={detailsClub.activitePrincipale || ""}
      leaders={Array.isArray(detailsClub.membresBureau) ? detailsClub.membresBureau : []}
    />
  );
};

export default DetailsClubPage;
