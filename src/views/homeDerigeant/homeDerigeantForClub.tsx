import React, { useState } from 'react'
import SidebarDerigeant from '../../component/sidebarDerigeant';
import HeaderDerigeant from '../../component/headerDerigeant';
import { Outlet } from 'react-router-dom';

const HomeDerigeant = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${isSideMenuOpen ? 'overflow-hidden' : ''}`}>

      <SidebarDerigeant isSideMenuOpen={isSideMenuOpen} dark={dark} />

      {isMobileMenuOpen && (
        <div
          className={`fixed inset-y-0 z-20 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-white dark:bg-gray-800 md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}
        ></div>
      )}

      <div className="flex flex-col flex-1 w-full">

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
          closeProfileMenu={closeProfileMenu}
          onSearch={(value) => setSearchTerm(value)} //  nouvelle prop

        />

        <main className="h-full overflow-y-auto">
          <Outlet context={{ searchTerm }} />
        </main>
      </div>
    </div>

  );
};

export default HomeDerigeant
