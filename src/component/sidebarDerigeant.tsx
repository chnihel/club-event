import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

interface SidebarProps {
  isSideMenuOpen: boolean;
  dark: boolean;
}

const SidebarDerigeant = ({ isSideMenuOpen, dark }: SidebarProps) => {
  const { clubId } = useParams();
console.log('id de club', clubId);
  return (
    <aside className={`z-20 ${isSideMenuOpen ? 'block' : 'hidden'} w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0`}>
      <div className="py-4 text-gray-500 dark:text-gray-400">
        <a
          className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
          href="#"
        >
          WeCampus
        </a>
        <ul className="mt-6">
          <li className="relative px-6 py-3">
            <span
              className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
              aria-hidden="true"
            ></span>
            <Link
              className="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100"
              to="/homeMembre"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                ></path>
              </svg>
              <span className="ml-4">Dashboard</span>
            </Link>
          </li>
        </ul>
        <ul>
        <li className="relative px-6 py-3">
            <Link
              className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
              to={`/homeDerigeant/${clubId}/event`}
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                ></path>
              </svg>
              <span className="ml-4">AddEvent</span>
            </Link>
          </li>
          <li className="relative px-6 py-3">
            <Link
              className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
              to={`/homeDerigeant/${clubId}/membreSuivi`}
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                ></path>
              </svg>
              <span className="ml-4">MemberFollowing</span>
            </Link>
          </li>
          <li className="relative px-6 py-3">
            <Link
              className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
              to={`/homeDerigeant/${clubId}/membreBureau`}
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                ></path>
              </svg>
              <span className="ml-4">AddMembreBureau</span>
            </Link>
          </li>
          <li className="relative px-6 py-3">
            <Link
              className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
              to={`/homeDerigeant/${clubId}/inbox`}
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                ></path>
              </svg>
              <span className="ml-4">Inbox</span>
            </Link>
          </li>
          <li className="relative px-6 py-3">
            <Link
              className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
              to={`/homeDerigeant/${clubId}/ressource`} 
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                ></path>
              </svg>
              <span className="ml-4">Ressources</span>
            </Link>
          </li>
         
          <li className="relative px-6 py-3">
            <Link
              className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
              to={`/homeDerigeant/${clubId}/form`}
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />
              </svg>
              <span className="ml-4">Forum</span>
            </Link>
          </li>
          <li className="relative px-6 py-3">
            <Link
              className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
              to={`/homeDerigeant/${clubId}/calendrier`}
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M15 17h5l-1.405-1.405C18.21 14.79 18 14.4 18 14V11c0-3.07-1.63-5.64-4.5-6.32V4a1.5 1.5 0 00-3 0v.68C7.63 5.36 6 7.92 6 11v3c0 .4-.21.79-.595 1.195L4 17h5m1 0v1a3 3 0 006 0v-1m-6 0h6" />
              </svg>

              <span className="ml-4">Calendrier</span>
            </Link>
          </li>

        </ul>
      </div>
    </aside>
  );
};

export default SidebarDerigeant;