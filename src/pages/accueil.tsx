// src/pages/HomePage.tsx
import { Link } from "react-router-dom";
import type { JSX } from "react";
import {

  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaUsers
} from "react-icons/fa";
import { motion } from "framer-motion";
const LinkedinIcon = FaLinkedin as unknown as () => JSX.Element;
const FaInstagramIcon = FaInstagram as unknown as () => JSX.Element;
const FaTwitterIcon = FaTwitter as unknown as () => JSX.Element;
const FaFacebookIcon = FaFacebook as unknown as () => JSX.Element;
const FaUsersIcon=FaUsers as unknown as () => JSX.Element;

export default function HomePage() {
    
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed w-full z-10 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
      <FaUsersIcon />
      WeCampus
    </h1>
          <nav className="space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600">Accueil</Link>
            <Link to="/login" className="text-blue-600 font-semibold">LoginIn</Link>
            <Link to="/registerMembre" className="text-blue-600 font-semibold">SignUp Membre</Link>
            <Link to="/registerDerigeant" className="text-blue-600 font-semibold">SignUp Derigeant</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section
        className="min-h-[80vh] flex mb-5 pb-5 flex-col p-5 justify-center items-center text-center px-4 bg-cover bg-center pt-24"
        style={{
            backgroundImage: 'url("https://images.surferseo.art/f9268d4b-b84c-40fc-96ca-a07b4b8b83f4.jpeg")',
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            minHeight: "100vh", // toute la hauteur de l'écran
            width: "100%",      // toute la largeur
          }}
      >
        <h1 className="text-4xl pt-5 md:text-5xl font-bold text-blue-500 uppercase mb-2">
        Student Club
        </h1>
        <h2 className="text-3xl pb-5 md:text-4xl font-bold text-purple-400 uppercase mb-6">
        Empowering Future Leaders
        </h2>
        <p className="max-w-2xl pb-5 text-white mb-6">
        Built by students, for students — our platform helps you learn, lead, and launch. From planning iconic events to developing real-world skills, we’re shaping the next generation of changemakers.
        </p>
        <Link to="/register">
          <button className="bg-blue-600 mb-5 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full transition">
          Join the Movement
          </button>
        </Link>
      </section>

    {/* Avantages */}
    <section className="py-16 bg-white mt-5 mb-5">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center pt-5 pb-5">Why our platform is your club’s next essential move?</h3>
          <div className="grid md:grid-cols-3 mt-5 pb-5 gap-8">
            {[
              {
                title: "Easy Discovery",
                desc: "Simplify Club Management Our platform centralizes all the essential elements of a university club—members, roles, events, and resources—into one seamless system. Say goodbye to messy spreadsheets and hello to smart organization",
              },
              {
                title: "Organized Events",
                desc: "Stay informed and register for all club events with ease.",
              },
              {
                title: "Effective Communication",
                desc: "Empower Communication and Collaboration From announcements to internal messaging, our site strengthens the connection between members and leaders. It’s built to nurture teamwork, boost participation, and bring every idea to life.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-blue-50 p-6 rounded-xl shadow-md text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
              >
                <h4 className="text-xl font-semibold text-blue-600">{item.title}</h4>
                <p className="mt-3 text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#111827] pt-5 mb-5">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <img
            src="https://img-ccmbg-1.lefigaro.fr/cfyR6pbizTHZIvF3FIRFQSYLu38=/1500x/smart/ea79be554e464a63a249a793a09bb1f0/ccmcms-figaroemploi/34495547.jpg"
            alt="Personne travaillant sur un projet marketing"
            className="w-full md:w-1/2 rounded-lg shadow-lg"
          />
          <div className="text-left">
            <h3 className="text-3xl font-bold mb-4 text-blue-400 border-l-4 border-blue-600 pl-4">
              About Us
            </h3>
            <p className="text-gray-300">
            Organisation des Clubs is a web platform designed to revolutionize how university clubs operate, communicate, and grow. Born from the vision of simplifying campus life, our mission is to provide student leaders and members with the digital tools they need to manage clubs efficiently and meaningfully.

Crafted with precision and empathy, our system brings together everything a club needs — member management, event planning, resource tracking, internal communication, and performance insights — all in one intuitive space.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className=" ">
 {/*  <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">


    <div>
      <h2 className="text-3xl font-bold text-blue-400">ClubConnect</h2>
      <p className="text-sm text-gray-400 mt-3">
        La plateforme de gestion et de découverte des clubs universitaires.
      </p>
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-3">Navigation</h3>
      <ul className="space-y-2 text-sm text-gray-400">
        <li><a href="/" className="footer-link">Accueil</a></li>
        <li><a href="/clubs" className="footer-link">Tous les clubs</a></li>
        <li><a href="/about" className="footer-link">À propos</a></li>
        <li><a href="/contact" className="footer-link">Contact</a></li>
      </ul>
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-3">Contact</h3>
      <ul className="text-sm text-gray-400 space-y-2">
        <li><span className="text-white font-medium">Email:</span> contact@clubconnect.com</li>
        <li><span className="text-white font-medium">Téléphone:</span> +216 12 345 678</li>
        <li><span className="text-white font-medium">Adresse:</span> Université XYZ, Tunis</li>
      </ul>
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-3">Suivez-nous</h3>
      <div className="flex items-center space-x-5 text-2xl mt-2">
        <a href="#" className="footer-icon text-blue-500"><FaFacebookIcon /></a>
        <a href="#" className="footer-icon text-sky-400"><FaTwitterIcon /></a>
        <a href="#" className="footer-icon text-pink-500"><FaInstagramIcon /></a>
        <a href="#" className="footer-icon text-blue-700"><LinkedinIcon /></a>
      </div>
    </div>
  </div> */}

  <div className="mt-12 bg-gray-900 pb-5 mt-5 text-center text-gray-500 text-xs border-t border-gray-800 pt-4">
    © 2025 <span className="text-white font-medium">WeCampus</span>. Tous droits réservés.
  </div>
</footer>



    </div>
  );
}
