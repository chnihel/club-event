import React from "react";
import { Link } from "react-router-dom";



const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-6">Accueil</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="relative bg-white shadow-md rounded-xl overflow-hidden">
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              className="w-full object-cover h-[30px]" />
            <button className="absolute top-0 right-5 bg-black text-white text-xs px-2 py-1 rounded-full">FOLLOW</button>
          </div>
          <div className="p-4 space-y-2">
            <span className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full">category</span>
            <h3 className="text-sm font-semibold">title</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className="w-8 h-8 rounded-full"
                  alt="Author"
                />
                <div>
                  <p className="text-xs font-medium">authName</p>
                  <p className="text-xs text-gray-500">authRole</p>
                </div>
              </div>

              {/* Bouton */}
              <Link to="/homeMembre/detailsClub">
            <button className="bg-purple-600 text-white text-xs px-4 py-2 rounded-full font-bold hover:bg-blue-700 transition">
              📄 Details
            </button>
          </Link>
              <Link to={'/join'}>
              <button  className="bg-red-600 text-white text-xs px-4 py-2 rounded-full font-bold flex items-center gap-1 hover:bg-red-700 transition">
                <span>&#10132;</span> JOIN NOW
              </button>
              </Link>
            </div>

          </div>
        </div>
        <div className="relative bg-white shadow-md rounded-xl overflow-hidden">
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              className="w-full  object-cover w-[50px] h-[50px]" />
            <button className="absolute top-0 right-5 bg-black text-white text-xs px-2 py-1 rounded-full">FOLLOW</button>
          </div>
          <div className="p-4 space-y-2">
            <span className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full">category</span>
            <h3 className="text-sm font-semibold">title</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className="w-8 h-8 rounded-full"
                  alt="Author"
                />
                <div>
                  <p className="text-xs font-medium">authName</p>
                  <p className="text-xs text-gray-500">authRole</p>
                </div>
              </div>

              {/* Bouton */}
              <Link to="/detail-club">
            <button className="bg-purple-600 text-white text-xs px-4 py-2 rounded-full font-bold hover:bg-blue-700 transition">
              📄 Details
            </button>
          </Link>
              <Link to={'/join'}>
              <button  className="bg-red-600 text-white text-xs px-4 py-2 rounded-full font-bold flex items-center gap-1 hover:bg-red-700 transition">
                <span>&#10132;</span> JOIN NOW
              </button>
              </Link>

            </div>

          </div>
        </div>
        <div className="relative bg-white shadow-md rounded-xl overflow-hidden">
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              className="w-full  object-cover w-[50px] h-[50px]" />
            <button className="absolute top-0 right-5 bg-black text-white text-xs px-2 py-1 rounded-full">FOLLOW</button>
          </div>
          <div className="p-4 space-y-2">
            <span className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full">category</span>
            <h3 className="text-sm font-semibold">title</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className="w-8 h-8 rounded-full"
                  alt="Author"
                />
                <div>
                  <p className="text-xs font-medium">authName</p>
                  <p className="text-xs text-gray-500">authRole</p>
                </div>
              </div>

              {/* Bouton */}
              <Link to="/detail-club">
            <button className="bg-purple-600 text-white text-xs px-4 py-2 rounded-full font-bold hover:bg-blue-700 transition">
              📄 Details
            </button>
          </Link>
              <Link to={'/join'}>
              <button  className="bg-red-600 text-white text-xs px-4 py-2 rounded-full font-bold flex items-center gap-1 hover:bg-red-700 transition">
                <span>&#10132;</span> JOIN NOW
              </button>
              </Link>

            </div>

          </div>
        </div>
        <div className="relative bg-white shadow-md rounded-xl overflow-hidden">
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              className="w-full  object-cover w-[50px] h-[50px]" />
            <button className="absolute top-0 right-5 bg-black text-white text-xs px-2 py-1 rounded-full">FOLLOW</button>
          </div>
          <div className="p-4 space-y-2">
            <span className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full">category</span>
            <h3 className="text-sm font-semibold">title</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className="w-8 h-8 rounded-full"
                  alt="Author"
                />
                <div>
                  <p className="text-xs font-medium">authName</p>
                  <p className="text-xs text-gray-500">authRole</p>
                </div>
              </div>

              {/* Bouton */}
              <Link to="/detail-club">
            <button className="bg-purple-600 text-white text-xs px-4 py-2 rounded-full font-bold hover:bg-blue-700 transition">
              📄 Details
            </button>
          </Link>
              <Link to={'/join'}>
              <button  className="bg-red-600 text-white text-xs px-4 py-2 rounded-full font-bold flex items-center gap-1 hover:bg-red-700 transition">
                <span>&#10132;</span> JOIN NOW
              </button>
              </Link>

            </div>

          </div>
        </div>
        <div className="relative bg-white shadow-md rounded-xl overflow-hidden">
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              className="w-full  object-cover w-[50px] h-[50px]" />
            <button className="absolute top-0 right-5 bg-black text-white text-xs px-2 py-1 rounded-full">FOLLOW</button>
          </div>
          <div className="p-4 space-y-2">
            <span className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full">category</span>
            <h3 className="text-sm font-semibold">title</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className="w-8 h-8 rounded-full"
                  alt="Author"
                />
                <div>
                  <p className="text-xs font-medium">authName</p>
                  <p className="text-xs text-gray-500">authRole</p>
                </div>
              </div>

              {/* Bouton */}
              <Link to="/detail-club">
            <button className="bg-purple-600 text-white text-xs px-4 py-2 rounded-full font-bold hover:bg-blue-700 transition">
              📄 Details
            </button>
          </Link>
              <Link to={'/join'}>
              <button  className="bg-red-600 text-white text-xs px-4 py-2 rounded-full font-bold flex items-center gap-1 hover:bg-red-700 transition">
                <span>&#10132;</span> JOIN NOW
              </button>
              </Link>

            </div>

          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Dashboard;
