import React from "react";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const dates = Array.from({ length: 30 }, (_, i) => i + 1);

const Calendrier = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">April 2025</h2>
          <div className="space-x-2">
            <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">Prev</button>
            <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">Next</button>
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
          {Array.from({ length: 4 }).map((_, weekIdx) =>
            days.map((_, dayIdx) => {
              const date = weekIdx * 7 + dayIdx + 1;
              if (date > 30) return <div key={date}></div>;
              return (
                <div
                  key={date}
                  className="h-20 border rounded-lg p-1 flex flex-col items-start justify-start text-sm hover:bg-blue-50 cursor-pointer"
                >
                  <span className="font-semibold">{date}</span>
                  {date === 17 && (
                    <div className="mt-1 text-xs text-white bg-blue-500 px-1 py-0.5 rounded">
                      Meeting
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendrier;
