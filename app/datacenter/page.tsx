"use client";

import MicroDataCenter from '../components/MicroDataCenter';

export default function DataCenterPage() {
  return (
    <div className="w-screen h-screen bg-gray-900 flex flex-col">
      <header className="bg-gray-800 text-white text-center py-4 border-b border-gray-700">
        <h1 className="text-2xl font-bold">Micro Data Center Visualization</h1>
        <p className="text-sm text-gray-400 mt-1">
          Interactive 3D model showing how a pallet-sized data center operates
        </p>
      </header>
      <main className="flex-1 relative">
        <MicroDataCenter />
      </main>
      <footer className="bg-gray-800 text-white text-center py-3 border-t border-gray-700">
        <p className="text-xs text-gray-400">
          Built with Three.js • &copy; {new Date().getFullYear()} @deboboy
        </p>
      </footer>
    </div>
  );
}
