import axiosContext from "./axiosContext"

const creerDerigeant=(data:any)=>{
    return axiosContext.post("/derigeantclub",data)
}
const creerMembre=(data:any)=>{
    return axiosContext.post("/membre",data)
}

const login=(data:any)=>{
    return axiosContext.post("/auth/SignIn",data)
}
const oubliéMotpasse=(email:{email:string})=>{
    return axiosContext.post("/auth/forget-password",email)
}
 const rest=(token:string,newmotpasse:string)=>{
    return axiosContext.post(`/auth/reset-password/${token}`,{newmotpasse})
 }
 const changermotdepasse = (id:string, motPasseActuel:string, newMotPasse:string) => {
    return axiosContext.put(`/user/update-password/${id}`, {
        motPasseActuel,
        newMotPasse
    });
};
 
 export default {login,oubliéMotpasse,rest,changermotdepasse,creerDerigeant,creerMembre}