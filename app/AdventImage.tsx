"use client";

import AdventArt from './AdventArt';

interface AdventImageProps {
  day: number;
  onClick: () => void;
}

export default function AdventImage({ day, onClick }: AdventImageProps) {
  return (
    <div
      className="w-full h-full cursor-pointer aspect-square"
      onClick={onClick}
    >
      <AdventArt day={day} />
    </div>
  );
}
