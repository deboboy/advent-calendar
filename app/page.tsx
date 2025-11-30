"use client";

import Head from 'next/head';
import { useState } from "react";
import adventData from './adventData.json';
import AdventImage from './AdventImage';

export default function Home() {
  // Define the current date
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Define the start date of Advent
  const adventStart = new Date(2025, 11, 1); // December 1, 2025

  // Define states for the selected day and whether the message should be shown
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [showMessage, setShowMessage] = useState(false);

  // Function to handle the image clicking action
  let handleClick = function(day: number) {
    setSelectedDay(day);
    setShowMessage(true);
  }

  // Function to close the message overlay
  const handleCloseMessage = () => {
    setShowMessage(false);
    setSelectedDay(null);
  }

  // Check if the current date is after the start of Advent
  const isAdvent = currentDate >= adventStart;
  
  return (
    <div className="min-h-screen">
      <Head>
        <title>Advent Calendar 2025</title>
        <meta name="description" content="Join us in our Advent Calendar 2025 journey - a modern artistic celebration." />
        <meta name="keywords" content="Advent, Calendar, 2025, Christmas, Holidays, Modern Art" />
      </Head>

      <header className="text-white text-center py-8 backdrop-blur-sm bg-white/10">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-pink-300 via-purple-300 to-orange-300 bg-clip-text text-transparent">
          Advent Calendar 2025
        </h1>
        <p className="text-lg opacity-90">A Journey of Light and Reflection</p>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {adventData.map((data) => {
            const isUnlocked = isAdvent && data.day <= (currentDay - adventStart.getDate() + 1);

            return (
              <div
                key={data.day}
                className={`
                  relative rounded-xl overflow-hidden
                  ${isUnlocked
                    ? 'card-hover bg-white/95 backdrop-blur-sm shadow-lg'
                    : 'bg-white/20 backdrop-blur-sm border-2 border-white/30'
                  }
                  transition-all duration-300
                `}
                style={{ aspectRatio: '1/1' }}
              >
                {isUnlocked ? (
                  <AdventImage day={data.day} onClick={() => handleClick(data.day)} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-5xl font-bold text-white/50">{data.day}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      {/* Message Overlay */}
      {showMessage && selectedDay !== null && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50 p-4"
          onClick={handleCloseMessage}
        >
          <div
            className="bg-gradient-to-br from-pink-500 via-purple-600 to-orange-500 rounded-2xl p-8 max-w-lg w-full shadow-2xl transform animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white/95 rounded-xl p-6 backdrop-blur-sm">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-600 via-purple-600 to-orange-600 bg-clip-text text-transparent">
                Day {selectedDay}
              </h2>
              <p className="text-lg text-gray-800 leading-relaxed">
                {adventData[selectedDay - 1].msg}
              </p>
              <button
                onClick={handleCloseMessage}
                className="mt-6 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="mt-16 text-white text-center py-6 backdrop-blur-sm bg-white/10">
        <p className="text-sm opacity-80">
          &copy; {new Date().getFullYear()} @deboboy
        </p>
      </footer>
    </div>
  );
}