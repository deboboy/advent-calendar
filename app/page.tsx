"use client";

import { useState } from "react";  
import adventData from './adventData.json';

export default function Home() {
  // Define the current date
  const currentDay = new Date().getDate();
  const currentMonth = new Date().getMonth();
  const monthOfAdvent = 11; // December
   
  // Define states for the selected day and whether the message should be shown
  const [selectedDay, setSelectedDay] = useState(1);
  const [showMessage, setShowMessage] = useState(false);

  // Function to handle the image clicking action
  let handleClick = function(day: number) {
    setSelectedDay(day);
    setShowMessage(true);
  }
  
  return (
    <div className="container mx-auto px-4">
      <main className="p-4 m-4">
        <h1 className="text-2xl font-bold mt-4 mb-2">Advent Calendar 2023</h1>

        <div className="grid grid-cols-3 gap-4">
          {
            adventData.map((data) => (
              currentMonth === monthOfAdvent && data.day <= currentDay ?
              <div key={data.day} className="bg-white shadow-md rounded-lg p-6">
                <img 
                  src={`/images/day${data.day}.jpg`} 
                  alt={`Day ${data.day}`} 
                  className="w-full h-auto object-cover"
                  onClick={() => handleClick(data.day)}
                />
              </div>
              :
              <div key={data.day} className="p-4 border rounded shadow">
                <p>{data.day}</p>
              </div>
            ))
          }
        </div>

        {showMessage && <div><h2>Day {selectedDay}: {adventData[selectedDay-1].msg}</h2></div>}
      </main>
    </div>
  );
}