"use client";

interface AdventImageProps {
  day: number;
  onClick: () => void;
}

export default function AdventImage({ day, onClick }: AdventImageProps) {
  // Generate artistic SVG based on day number
  const getArtisticSVG = (day: number) => {
    // Color palettes inspired by the reference images
    const colors = {
      pink: ['#ec4899', '#db2777', '#be185d'],
      purple: ['#a855f7', '#9333ea', '#7e22ce'],
      orange: ['#f97316', '#ea580c', '#c2410c'],
      rose: ['#fb7185', '#f43f5e', '#e11d48'],
      dark: ['#1e1b4b', '#312e81', '#4c1d95']
    };

    // Different artistic patterns for each day
    const patterns = [
      // Days 1-6: Floral hearts and decorative elements
      () => (
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <linearGradient id={`grad${day}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: colors.pink[0], stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: colors.purple[1], stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="80" fill={`url(#grad${day})`} opacity="0.2"/>
          <path d="M100,150 Q70,120 70,100 Q70,80 85,80 Q100,80 100,95 Q100,80 115,80 Q130,80 130,100 Q130,120 100,150 Z"
                fill={colors.pink[day % 3]} />
          <circle cx="85" cy="70" r="8" fill={colors.orange[0]} />
          <circle cx="115" cy="70" r="8" fill={colors.orange[0]} />
          <path d="M80,50 Q80,40 90,40 L90,65" stroke={colors.purple[1]} strokeWidth="3" fill="none"/>
          <path d="M120,50 Q120,40 110,40 L110,65" stroke={colors.purple[1]} strokeWidth="3" fill="none"/>
          <text x="100" y="110" textAnchor="middle" fontSize="28" fontWeight="bold" fill="white">{day}</text>
        </svg>
      ),
      // Days 7-12: Abstract geometric patterns
      () => (
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <radialGradient id={`radial${day}`}>
              <stop offset="0%" style={{ stopColor: colors.purple[0], stopOpacity: 0.8 }} />
              <stop offset="100%" style={{ stopColor: colors.dark[2], stopOpacity: 1 }} />
            </radialGradient>
          </defs>
          <rect width="200" height="200" fill={`url(#radial${day})`}/>
          <circle cx="100" cy="100" r="70" fill="none" stroke={colors.pink[1]} strokeWidth="4" opacity="0.6"/>
          <circle cx="100" cy="100" r="50" fill="none" stroke={colors.orange[0]} strokeWidth="3" opacity="0.8"/>
          <circle cx="100" cy="100" r="30" fill={colors.rose[0]} opacity="0.7"/>
          <path d="M100,30 L130,100 L100,170 L70,100 Z" fill={colors.purple[2]} opacity="0.5"/>
          <text x="100" y="110" textAnchor="middle" fontSize="32" fontWeight="bold" fill="white">{day}</text>
        </svg>
      ),
      // Days 13-18: Candlelight and stars
      () => (
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <linearGradient id={`candleGrad${day}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: colors.dark[0], stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: colors.purple[2], stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <rect width="200" height="200" fill={`url(#candleGrad${day})`}/>
          <ellipse cx="100" cy="60" rx="15" ry="20" fill={colors.orange[0]} opacity="0.8">
            <animate attributeName="ry" values="20;25;20" dur="2s" repeatCount="indefinite"/>
          </ellipse>
          <rect x="85" y="60" width="30" height="80" fill={colors.rose[2]} rx="5"/>
          <rect x="85" y="140" width="30" height="10" fill={colors.pink[2]}/>
          <circle cx="70" cy="50" r="3" fill={colors.orange[1]} opacity="0.6"/>
          <circle cx="130" cy="70" r="2" fill={colors.orange[1]} opacity="0.7"/>
          <circle cx="60" cy="90" r="2" fill={colors.orange[1]} opacity="0.5"/>
          <circle cx="140" cy="100" r="3" fill={colors.orange[1]} opacity="0.6"/>
          <text x="100" y="170" textAnchor="middle" fontSize="24" fontWeight="bold" fill="white">{day}</text>
        </svg>
      ),
      // Days 19-24: Festive ornaments and celebrations
      () => (
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <linearGradient id={`festiveGrad${day}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: colors.pink[0], stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: colors.purple[0], stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: colors.orange[0], stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <rect width="200" height="200" fill={colors.dark[1]}/>
          <circle cx="100" cy="110" r="60" fill={`url(#festiveGrad${day})`} opacity="0.9"/>
          <circle cx="100" cy="110" r="50" fill="none" stroke="white" strokeWidth="2" opacity="0.3"/>
          <rect x="95" y="50" width="10" height="20" fill={colors.rose[1]} rx="2"/>
          <path d="M85,110 L100,95 L115,110 L100,125 Z" fill={colors.orange[1]} opacity="0.7"/>
          <circle cx="100" cy="110" r="25" fill="none" stroke={colors.pink[2]} strokeWidth="3"/>
          <circle cx="80" cy="90" r="6" fill={colors.orange[0]}/>
          <circle cx="120" cy="90" r="6" fill={colors.orange[0]}/>
          <circle cx="80" cy="130" r="6" fill={colors.pink[1]}/>
          <circle cx="120" cy="130" r="6" fill={colors.pink[1]}/>
          <text x="100" y="120" textAnchor="middle" fontSize="28" fontWeight="bold" fill="white">{day}</text>
        </svg>
      ),
    ];

    // Select pattern based on day range
    let patternIndex = 0;
    if (day >= 1 && day <= 6) patternIndex = 0;
    else if (day >= 7 && day <= 12) patternIndex = 1;
    else if (day >= 13 && day <= 18) patternIndex = 2;
    else patternIndex = 3;

    return patterns[patternIndex]();
  };

  return (
    <div
      className="w-full h-full cursor-pointer aspect-square"
      onClick={onClick}
    >
      {getArtisticSVG(day)}
    </div>
  );
}
