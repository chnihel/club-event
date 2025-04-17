import React from 'react'
import './changerPassword.css'

const ChangerPassword = () => {
  return (
    <div className="changer-container">
      <div className="changer-wrapper">
        <div className="changer-header">
          <h1>Changer Mot de Passe</h1>
        </div>
        <div className="changer-content">
            <form action="">
          <div className="changer-grid">
            <div className="form-group">
              <label htmlFor="oldPassword">Ancien mot de passe</label>
              <input type="password" id="oldPassword" />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">Nouveau mot de passe</label>
              <input type="password" id="newPassword" />
            </div>
          </div>
          <div className="changer-actions">
            <button type="button">Modifier</button>
          </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChangerPassword
