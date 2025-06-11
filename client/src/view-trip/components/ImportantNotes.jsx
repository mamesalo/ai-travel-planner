// components/ImportantNotes.jsx (or wherever your component is)
import React from "react";

const ImportantNotes = ({ trip }) => {
  // Defensive check: ensure importantConsiderations is an array before mapping
  if (
    !trip ||
    !trip.importantConsiderations ||
    !Array.isArray(trip.importantConsiderations)
  ) {
    return null; // Or return a loading/empty state if appropriate
  }

  return (
    <div className="mt-12 p-6 bg-blue-50 rounded-lg shadow-md border border-blue-200">
      <h2 className="text-lg font-bold text-blue-800 mb-4 border-b-2 border-blue-300 pb-2">
        ⚠️ Important Considerations Before You Book
      </h2>
      <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm">
        {" "}
        {/* Use ul for list of notes */}
        {trip.importantConsiderations.map((item, index) => (
          // Assuming each item is a string paragraph.
          // If items contain asterisks for bullet points, you might need to split them.
          <li key={index} className="leading-relaxed">
            {item}
          </li>
        ))}
      </ul>
      {/* Optional: Add a call to action or general advice if needed */}
      <p className="mt-6 text-gray-600 italic">
        Please review these points carefully to ensure a smooth and enjoyable
        trip.
      </p>
    </div>
  );
};

export default ImportantNotes;
