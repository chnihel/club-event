import React, { useEffect, useState } from 'react'
import SidebarAdmin from '../../component/sideBarAdmin';
import HeaderAdmin from '../../component/headerAdmin';
import { Outlet } from 'react-router-dom';
import api from '../../service/api';
import { FaEdit, FaInfoCircle, FaTrash } from 'react-icons/fa';
import type { JSX } from "react";


interface Club {
    _id?: string;
    nomClub: string;
    description: string;
    
derigentClub?: DerigeantClub;
    logo?: File
    activitePrincipale?: string
    mission?: string
    vision?: string
    objectifs?: string
    cotisation: number
    status: boolean
}
interface DerigeantClub {
    nom: string
    prenom: string
    email: string
    telephone: number
    faculte: string

}

const FaTrashIcon = FaTrash as unknown as () => JSX.Element;
const FaEditttIcon = FaEdit as unknown as () => JSX.Element;

const FaEditIcon = FaInfoCircle as unknown as () => JSX.Element;

const HomeAdmin = () => {
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
  /*   const [club, setClub] = useState<Club[]>([])
    const [openModalDetail, setOpenModalDetails] = useState(false)
    const [selectedDerigeant, setSelectedDerigeant] = useState<DerigeantClub | null>(null)

    const handleOpenDetails = (derigentClub: DerigeantClub | undefined) => {
        if (derigentClub) {
            setSelectedDerigeant(derigentClub);
            setOpenModalDetails(true);
        }
        console.log('not club derigeant')
    };


    const updateStatus=async(id:any)=>{
        try {
            const response=await api.updateClubStatus(id)
            console.log('update status',response.data)
            getAllClub()
        } catch (error) {
            console.log(error)
        }
    }

    const deleteClub=async(id:any)=>{
        try {
            const response=await api.supprimerClub(id)
            console.log('supprission de club',response)
            getAllClub()
        } catch (error) {
            console.log(error)
        }
    }
    const getAllClub = async () => {
        try {
            const response = await api.getAllClub()
            console.log('les club creer', response.data)
            setClub(response.data.listeclub)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getAllClub()
    }, []) */
    return (
        <div className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${isSideMenuOpen ? 'overflow-hidden' : ''}`}>

            <SidebarAdmin isSideMenuOpen={isSideMenuOpen} dark={dark} />

            {isMobileMenuOpen && (
                <div
                    className={`fixed inset-y-0 z-20 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-white dark:bg-gray-800 md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}
                ></div>
            )}

            <div className="flex flex-col flex-1 w-full">

                <HeaderAdmin
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

                />

                <main className="h-full overflow-y-auto">
                    <Outlet/>

                </main>
            </div>
        </div>
    )
}

export default HomeAdmin
