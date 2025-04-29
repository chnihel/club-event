import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../service/api';

interface Event {
  id?: string;
  nomEvent: string;
  dateEvent: string;
  lieuEvent: string;
  derigeantClub?: string;
  club?: string;
}
interface AddEventProps {
  searchValue: string;
}
const AddEvent = ({ searchValue }: AddEventProps) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState<Event>({
    nomEvent: '',
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
            <div key={event.id || index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
              <h2 className="text-2xl font-semibold text-blue-700 mb-2">{event.nomEvent}</h2>
              <p className="text-gray-600 mb-1">📅 {new Date(event.dateEvent).toLocaleDateString()}</p>
              <p className="text-gray-600">📍 {event.lieuEvent}</p>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
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
    </div>
  );
};

export default AddEvent;
