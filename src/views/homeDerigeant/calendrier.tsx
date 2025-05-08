import React, { useEffect, useState } from "react";
import api from "../../service/api";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface Event {
  eventId?: string;
  nomEvent: string;
  dateEvent: string;
  frais?: number;
  lieuEvent: string;
  derigeantClub?: string;
  club?: string;
}

const CalendrierDergeneant = () => {
  const [event, setEvent] = useState<Event[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const localStorageData = localStorage.getItem("userClub")
    ? JSON.parse(localStorage.getItem("userClub") as string)
    : null;
  const userId = localStorageData ? localStorageData.user?._id : null;

  const getEventByMembre = async () => {
    try {
      const response = await api.getDerigeantByClub(userId);
      const allEvents = response.data.data.evenement;
      console.log("tout les event creer par derigeant",allEvents)
      setEvent(allEvents); // afficher seulement les events payés
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEventByMembre();
  }, []);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const numDays = getDaysInMonth(currentMonth, currentYear);
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  const dates = Array.from({ length: firstDay + numDays }, (_, i) =>
    i >= firstDay ? i - firstDay + 1 : null
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">
            {new Date(currentYear, currentMonth).toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <div className="space-x-2">
            <button
              onClick={handlePrevMonth}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              Prev
            </button>
            <button
              onClick={handleNextMonth}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              Next
            </button>
          </div>
        </div>

        {/* Days of the week */}
        <div className="grid grid-cols-7 gap-2 text-center font-semibold text-gray-600">
          {days.map((day, idx) => (
            <div key={idx}>{day}</div>
          ))}
        </div>

        {/* Dates */}
        <div className="grid grid-cols-7 gap-2 text-center mt-2">
          {dates.map((date, idx) => {
            const currentDay = date;

            const eventsOfDay = event.filter((ev: Event) => {
              const eventDate = new Date(ev.dateEvent);
              return (
                eventDate.getFullYear() === currentYear &&
                eventDate.getMonth() === currentMonth &&
                eventDate.getDate() === currentDay
              );
            });

            return (
              <div
                key={idx}
                className="h-20 border rounded-lg p-1 flex flex-col items-start justify-start text-sm hover:bg-blue-50 cursor-pointer"
              >
                {currentDay && <span className="font-semibold">{currentDay}</span>}
                {eventsOfDay.map((ev) => (
                  <div
                    key={ev.eventId}
                    className="mt-1 text-xs text-white bg-blue-500 px-1 py-0.5 rounded"
                  >
                    {ev.nomEvent}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendrierDergeneant;
