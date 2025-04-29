import React, { useState } from 'react'
import HeaderDerigeant from '../../component/headerDerigeant';
import { Outlet } from 'react-router-dom';

const HomeClubs = () => {
      const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
      const [dark, setDark] = useState(false);
      const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false);
      const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    
      const toggleSideMenu = () => {
        setIsSideMenuOpen(!isSideMenuOpen);
      };
    
    
    
      const toggleTheme = () => {
        setDark(!dark);
      };
    
      const toggleNotificationsMenu = () => {
        setIsNotificationsMenuOpen(!isNotificationsMenuOpen);
      };
    
      const closeNotificationsMenu = () => {
        setIsNotificationsMenuOpen(false);
      };
    
      const toggleProfileMenu = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen);
      };
    
      const closeProfileMenu = () => {
        setIsProfileMenuOpen(false);
      };
  return (
    <div>
      <HeaderDerigeant
    dark={dark}
    isSideMenuOpen={isSideMenuOpen}
    toggleSideMenu={toggleSideMenu}
    toggleTheme={toggleTheme}
    isNotificationsMenuOpen={isNotificationsMenuOpen}
    toggleNotificationsMenu={toggleNotificationsMenu}
    closeNotificationsMenu={closeNotificationsMenu}
    isProfileMenuOpen={isProfileMenuOpen}
    toggleProfileMenu={toggleProfileMenu}
    closeProfileMenu={closeProfileMenu}/>
   
    <Outlet/>
    </div>
  )
}

export default HomeClubs
