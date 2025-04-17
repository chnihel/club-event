import React, { useState } from "react";

const JoinNow = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    field: "",
    motivation: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // TODO: Envoyer au backend
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">🚀 Rejoindre le Club</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nom complet</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Filière</label>
          <select
            name="field"
            required
            value={formData.field}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">-- Choisir votre filière --</option>
            <option value="Informatique">Informatique</option>
            <option value="Télécommunications">Télécommunications</option>
            <option value="Génie Électrique">Génie Électrique</option>
            <option value="Autre">Autre</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Motivation</label>
          <textarea
            name="motivation"
            rows={4}
            required
            value={formData.motivation}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
        >
          💬 Envoyer la Demande
        </button>
      </form>
    </div>
  );
};

export default JoinNow;
