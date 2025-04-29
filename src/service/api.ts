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
export default {getDerigeantByClub,createClub,getClub,updateDerigeant,changerMotDePasse,addEvent,listEvent}
