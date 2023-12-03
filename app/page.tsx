"use client";

import Head from 'next/head';
import { useState } from "react";  
import adventData from './adventData.json';

export default function Home() {
  // Define the current date
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Define the start date of Advent
  const adventStart = new Date(2023, 11, 3); // December 3, 2023
   
  // Define states for the selected day and whether the message should be shown
  const [selectedDay, setSelectedDay] = useState(1);
  const [showMessage, setShowMessage] = useState(false);

  // Function to handle the image clicking action
  let handleClick = function(day: number) {
    setSelectedDay(day);
    setShowMessage(true);
  }

  // Check if the current date is after the start of Advent
  const isAdvent = currentDate >= adventStart;
  
  return (
    <div className="container mx-auto px-4">
      <Head>
        <title>Advent Calendar 2023</title>
        <meta name="description" content="Join us in our Advent Calendar 2023 journey." />
        <meta name="keywords" content="Advent, Calendar, 2023, Christmas, Holidays" />
      </Head>
      <main className="p-4 m-4">
        <h1 className="text-2xl font-bold mt-4 mb-2">Advent Calendar 2023</h1>

        <div className="grid grid-cols-3 gap-4">
          {
            adventData.map((data) => (
              isAdvent && data.day <= (currentDay - adventStart.getDate() + 1) ?
              <div key={data.day} className="bg-white shadow-md rounded-lg p-6">
                <img 
                  src={`/images/day${data.day}.jpg`} 
                  alt={`Day ${data.day}`} 
                  className="w-full h-auto object-cover"
                  onClick={() => handleClick(data.day)}
                />
                {selectedDay === data.day && showMessage && 
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
                    <h2>Day {selectedDay}: {adventData[selectedDay-1].msg}</h2>
                  </div>
                }
              </div>
              :
              <div key={data.day} className="p-4 border rounded shadow">
                <p>{data.day}</p>
              </div>
            ))
          }
        </div>
      </main>
    </div>
  );
}