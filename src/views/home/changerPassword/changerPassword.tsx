import React, { FormEvent, useState } from 'react'
import './changerPassword.css'
import api from '../../../service/api'


interface PasswordChange {
  oldPassword: string;
  newPassword: string;
}
const ChangerPassword = () => {
  const [passwords, setPasswords] = useState<PasswordChange>({
    oldPassword: '',
    newPassword: ''
  });
  const handleChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
    setPasswords({
      ...passwords,
      [e.target.name]:e.target.value
    })
  }
  const changePassword=async(e: FormEvent)=>{
    e.preventDefault()
    try {
      const localStorageData = localStorage.getItem('userClub')
      ? JSON.parse(localStorage.getItem('userClub') as string)
      : null;
    const userId = localStorageData ? localStorageData.user?._id : null;
    if (userId) {
      const response = await api.changerMotDePasse(userId, passwords);
      console.log("Password updated", response.data);
    } else {
      console.log("User ID not found in localStorage");
    }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="changer-container">
      <div className="changer-wrapper">
        <div className="changer-header">
          <h1>Changer Mot de Passe</h1>
        </div>
        <div className="changer-content">
          <form onSubmit={changePassword}>
            <div className="changer-grid">
              <div className="form-group">
                <label htmlFor="oldPassword">Ancien mot de passe</label>
                <input
                  type="password"
                  id="oldPassword"
                  name="oldPassword"
                  value={passwords.oldPassword}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="newPassword">Nouveau mot de passe</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={passwords.newPassword}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="changer-actions">
              <button type="submit">Modifier</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChangerPassword
