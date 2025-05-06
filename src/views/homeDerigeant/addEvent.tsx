import React, { useEffect, useState, ReactElement } from 'react';
import type { JSX } from "react";

import { Link, useParams } from 'react-router-dom';
import api from '../../service/api';
import Swal from 'sweetalert2';
import { FaTrash, FaEdit, FaCheckCircle, FaUserCheck } from 'react-icons/fa';

interface Event {
  _id?: string;
  nomEvent: string;
  dateEvent: string;
  frais?: number
  lieuEvent: string;
  derigeantClub?: string;
  club?: string;
}
interface AddEventProps {
  searchValue: string;
}
const FaTrashIcon = FaTrash as unknown as () => JSX.Element;
const FaEditIcon = FaEdit as unknown as () => JSX.Element;
const FaDetailsIcon = FaUserCheck as unknown as () => JSX.Element;
const AddEvent = ({ searchValue }: AddEventProps) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState<Event>({
    nomEvent: '',
    frais: 0,
    dateEvent: '',
    lieuEvent: '',
  });
  const [showModal, setShowModal] = useState(false);
  const { clubId } = useParams();

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const localStorageData = localStorage.getItem('userClub')
        ? JSON.parse(localStorage.getItem('userClub') as string)
        : null;

      const userId = localStorageData ? localStorageData.user?._id : null;
      console.log('Club manager ID:', userId);

      const eventToAdd = {
        ...newEvent,
        derigeantClub: userId,
        club: clubId,
      };

      const response = await api.addEvent(eventToAdd);
      console.log('Event added by club manager:', response.data);

      getEventByClub();
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const getEventByClub = async () => {
    try {
      const response = await api.getClub(clubId);
      setEvents(response.data.getclub.evenement);
      console.log('List of events:', response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getEventByClub();
  }, []);

  const deleteEvent = async (id: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.deleteEvent(id);
          Swal.fire("Deleted!", "Your event has been deleted.", "success");
          getEventByClub();
        } catch (error) {
          console.error(error);
          Swal.fire("Error!", "Failed to delete the event.", "error");
        }
      }
    });
  };
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [edit, setEdit] = useState<Event>({
    nomEvent: '',
    dateEvent: '',
    lieuEvent: '',
  });
  const handleEditClick = (event: Event) => {
    if (!event._id) return;

    setSelectedEvent(event._id);
    setEdit({
      nomEvent: event.nomEvent,
      dateEvent: event.dateEvent,
      lieuEvent: event.lieuEvent,
    });
    setOpenModalEdit(true);
  };

  const editEvent = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedEvent) return
    try {
      const response = await api.updateEvent(selectedEvent, edit)
      console.log('Event updated:', response.data);

      getEventByClub();
      setOpenModalEdit(false);
    } catch (error) {
      console.log(error)
    }
  }



  //search event avec nomEvent
  const [searchId, setSearchId] = useState('');
  const filteredEvents = events.filter((event) =>
    event.nomEvent.toLowerCase().includes(searchValue.toLowerCase())
  );
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-extrabold text-blue-800">Event List</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white font-bold py-2 px-6 rounded-lg shadow-md"
        >
          Add New Event
        </button>
      </div>

      {/* Event list */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.length === 0 ? (
          <p className="text-gray-600 text-center w-full">No events available yet.</p>
        ) : (
          filteredEvents.map((event, index) => (
            <div
              key={event._id || index}
              className="relative bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300"
            >
              <div className="absolute top-4 right-5 flex space-x-3">
                <button
                  onClick={() => handleEditClick(event)}
                  className="text-blue-500 hover:text-blue-700"
                  title="Update Event"
                >
                  <FaEditIcon />
                </button>
                <button
                  onClick={() => deleteEvent(event)}
                  className="text-red-500 hover:text-red-700"
                  title="Delete Event"
                >
                  <FaTrashIcon />
                </button>
                <Link to={`/homeDerigeant/${clubId}/MembreEvent/${event._id}`}>
                <button
                  className="text-green-500 hover:text-green-700"
                  title="Delete Event"
                >
                  <FaDetailsIcon />
                </button>
                </Link>
              </div>

              <h2 className="text-2xl font-semibold text-blue-700 mb-2">{event.nomEvent}</h2>
              <p className="text-gray-600 mb-1">📅 {new Date(event.dateEvent).toLocaleDateString()}</p>
              <p className="text-gray-600">📍 {event.lieuEvent}</p>
              <p className="text-gray-600">💰 {event.frais} DT</p>
            </div>
          ))
        )}
      </div>

      {/* Modal modal ajout */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg relative">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">Add a New Event</h2>
            <form onSubmit={handleAddEvent} className="space-y-5">
              <div>
                <label className="block mb-1 text-gray-700 font-medium">Event Name</label>
                <input
                  type="text"
                  value={newEvent.nomEvent}
                  onChange={(e) => setNewEvent({ ...newEvent, nomEvent: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="e.g. Summer Tournament"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-700 font-medium">Event Date</label>
                <input
                  type="date"
                  value={newEvent.dateEvent}
                  onChange={(e) => setNewEvent({ ...newEvent, dateEvent: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-700 font-medium">Event Location</label>
                <input
                  type="text"
                  value={newEvent.lieuEvent}
                  onChange={(e) => setNewEvent({ ...newEvent, lieuEvent: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="e.g. Municipal Stadium"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-700 font-medium">Frais Event</label>
                <input
                  type="number"
                  value={newEvent.frais}
                  onChange={(e) => setNewEvent({ ...newEvent, frais: Number(e.target.value) })}
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="e.g. Municipal Stadium"
                  required
                />
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 transition-all duration-300 text-gray-800 font-semibold py-2 px-5 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white font-bold py-2 px-6 rounded-lg shadow-md"
                >
                  Add Event
                </button>
              </div>
            </form>

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/*modal edit*/}
      {openModalEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg relative">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">Add a New Event</h2>
            <form onSubmit={editEvent} className="space-y-5">
              <div>
                <label className="block mb-1 text-gray-700 font-medium">Event Name</label>
                <input
                  type="text"
                  value={edit.nomEvent}
                  onChange={(e) => setEdit({ ...edit, nomEvent: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="e.g. Summer Tournament"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-700 font-medium">Event Date</label>
                <input
                  type="date"
                  value={edit.dateEvent}
                  onChange={(e) => setEdit({ ...edit, dateEvent: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-700 font-medium">Event Location</label>
                <input
                  type="text"
                  value={edit.lieuEvent}
                  onChange={(e) => setEdit({ ...edit, lieuEvent: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="e.g. Municipal Stadium"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-700 font-medium">Frais Event</label>
                <input
                  type="number"
                  value={edit.frais}
                  onChange={(e) => setEdit({ ...edit, frais: Number(e.target.value) })}
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="e.g. Municipal Stadium"
                  required
                />
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setOpenModalEdit(false)}
                  className="bg-gray-300 hover:bg-gray-400 transition-all duration-300 text-gray-800 font-semibold py-2 px-5 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white font-bold py-2 px-6 rounded-lg shadow-md"
                >
                  Update Event
                </button>
              </div>
            </form>

            <button
              onClick={() => setOpenModalEdit(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddEvent;
