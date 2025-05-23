import axiosContext from "./axiosContext"

const getDerigeantByClub=(id:any)=>{
    return axiosContext.get(`/derigeantclub/${id}`)
}
const createClub=(data:any)=>{
    return axiosContext.post('/club',data)
}
const updateDerigeant=(id:any,data:any)=>{
    return axiosContext.put(`/derigeantclub/${id}`,data)
}
interface PasswordChange {
    oldPassword: string;
    newPassword: string;
  }
const changerMotDePasse=(id:any,{oldPassword,newPassword}:PasswordChange)=>{
    return axiosContext.put(`/user/update-password/${id}`,{oldPassword,newPassword})
}

const addEvent=(data:any)=>{
    return axiosContext.post('/evenement',data)
}
const listEvent=()=>{
    return axiosContext.get('/evenement')
}
const getClub=(id:any)=>{
    return axiosContext.get(`/club/${id}`)
}
const getAllClub=()=>{
    return axiosContext.get('/club')
}
const suiviClub=(membreId:any,clubId:any)=>{
    return axiosContext.post(`/membre/suiviClub/${membreId}`,{clubId:clubId})
}
const desuiviClub=(membreId:any,club:any)=>{
    return axiosContext.post(`/membre/desuiviClub/${membreId}`,club)
}

const suiviEvent=(membreId:any,eventId:any)=>{
    return axiosContext.post(`/membre/suiviEvent/${membreId}`, {
        eventId: eventId, // clé conforme à ce que le backend attend
      })
}
const deleteEvent=(id:any)=>{
    return axiosContext.delete(`/evenement/${id}`)

}
const updateEvent=(id:any,data:any)=>{
    return axiosContext.put(`/evenement/${id}`,data)

}
const createMembreBureau=(data:any,clubId:any)=>{
    return axiosContext.post(`/club/membreBureau/${clubId}`,data)
}
const updateMembreBureau=(clubId:any,membreId:any,data:any)=>{
    return axiosContext.put(`/club/membreBureau/${clubId}/${membreId}`,data)
}
const updateClubStatus=(clubId:any)=>{
    return axiosContext.put(`/club/status/${clubId}`)
}

const supprimerClub=(clubId:any)=>{
    return axiosContext.delete(`/club/${clubId}`)
}

const updateSuperAdmin=(id:any,data:any)=>{
    return axiosContext.put(`/super-admin/${id}`,data)
}
const updateMembre=(id:any,data:any)=>{
    return axiosContext.put(`/membre/${id}`,data)
}
const getEvent=(eventId:any)=>{
    return axiosContext.get(`/evenement/${eventId}`)
}
const addGuide=(data:any)=>{
    return axiosContext.post('/guide',data)
}
const addReglement=(data:any)=>{
    return axiosContext.post('/reglement',data)
}
const addMultimedia=(data:any)=>{
    return axiosContext.post('/mutimedia',data)
}
const addTutoriel=(data:any)=>{
    return axiosContext.post('/tutoriel',data)
}

const deleteGuide=(id:any)=>{
    return axiosContext.delete(`/guide/${id}`)
}
const updateGuide=(id:any,data:any)=>{
    return axiosContext.put(`/guide/${id}`,data)
}
const deleteReglement=(id:any)=>{
    return axiosContext.delete(`/reglement/${id}`)
}
const updateReglement=(id:any,data:any)=>{
    return axiosContext.put(`/reglement/${id}`,data)
}
const deleteMultimedia=(id:any)=>{
    return axiosContext.delete(`/mutimedia/${id}`)
}
const updateMultimedia=(id:any,data:any)=>{
    return axiosContext.put(`/mutimedia/${id}`,data)
}

const deleteTutoriel=(id:any)=>{
    return axiosContext.delete(`/tutoriel/${id}`)
}
const updateTutoriel=(id:any,data:any)=>{
    return axiosContext.put(`/tutoriel/${id}`,data)
}

const updateMembreStatus=(membreId:any,eventId:any)=>{
    return axiosContext.put(`/membre/updatePaidStatus/${membreId}/${eventId}`)
}
const updateMembreStatusForClub=(membreId:any,clubId:any)=>{
    return axiosContext.put(`/membre/updatePaidStatusForClub/${membreId}/${clubId}`)
}

const getMembre=(membreId:any)=>{
    return axiosContext.get(`/membre/${membreId}`)
}

const getMessagesByClub= (clubId: string) =>{
     return axiosContext.get(`/message/club/${clubId}`)

}
const getMultimediaById= (multimediaId: string) =>{
     return axiosContext.get(`/mutimedia/${multimediaId}`)

}
const gettutorielById= (tutorielId: string) =>{
     return axiosContext.get(`/tutoriel/${tutorielId}`)

}
const addComment= (data: any) =>{
     return axiosContext.post('/commentaire',data)

}

const updateIsPaid=()=>{
    return axiosContext.get('/paiement/testUpdatePaiement')
}

const addrapport= (data: any) =>{
     return axiosContext.post('/rapport',data)

}
const updateRapport=(id:string,data:any)=>{
    return axiosContext.put(`/rapport/${id}`,data)
}
const deleteRapport=(rapportId:string)=>{
    return axiosContext.delete(`/rapport/${rapportId}`)
}



export default {getDerigeantByClub,createClub,getClub,updateDerigeant,
    changerMotDePasse,addEvent,listEvent,getAllClub,suiviClub,desuiviClub,
    deleteEvent,updateEvent,createMembreBureau,updateMembreBureau,updateClubStatus,supprimerClub,
    updateSuperAdmin,updateMembre,suiviEvent,getEvent,addGuide,addMultimedia,addReglement,addTutoriel,
deleteGuide,updateGuide,deleteReglement,updateReglement,deleteMultimedia,updateMultimedia,updateTutoriel,deleteTutoriel,
updateMembreStatus,updateMembreStatusForClub,getMembre,getMessagesByClub,getMultimediaById,addComment,gettutorielById,
updateIsPaid,addrapport,deleteRapport,updateRapport}
