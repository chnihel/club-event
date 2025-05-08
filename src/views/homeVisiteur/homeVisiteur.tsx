import React, { useEffect, useState } from 'react'

import { Outlet } from 'react-router-dom';
import api from '../../service/api';
import { FaEdit, FaInfoCircle, FaTrash } from 'react-icons/fa';
import type { JSX } from "react";
import SidebarVisiteur from '../../component/sidebarVisiteur';


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

const HomeVisiteur = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
    const [dark, setDark] = useState(false);
    return (
        <div className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${isSideMenuOpen ? 'overflow-hidden' : ''}`}>

            <SidebarVisiteur isSideMenuOpen={isSideMenuOpen} dark={dark} />

            {isMobileMenuOpen && (
                <div
                    className={`fixed inset-y-0 z-20 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-white dark:bg-gray-800 md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}
                ></div>
            )}

            <div className="flex flex-col flex-1 w-full">


                <main className="h-full overflow-y-auto">
                    <Outlet/>

                </main>
            </div>
        </div>
    )
}

export default HomeVisiteur
