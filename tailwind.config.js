/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', '"Outfit"', 'sans-serif'],
        body: ['"Inter"', '"Outfit"', 'sans-serif'],
      },
      colors: {
        mc: {
          bg: '#1a1a2e',
          dark: '#0f0f1a',
          panel: '#c6c6c6',
          panelDark: '#8b8b8b',
          border: '#373737',
          borderLight: '#ffffff',
          slot: '#8b8b8b',
          slotDark: '#373737',
          slotInner: '#373737',
          green: '#55ff55',
          yellow: '#ffff55',
          purple: '#aa00aa',
          purpleLight: '#ff55ff',
          tooltipBg: '#100010',
          tooltipBorder: '#2d0046',
          stone: '#828282',
          dirt: '#7a5c3f',
          wood: '#a0742d',
          diamond: '#3fb8c0',
          gold: '#f5d442',
          iron: '#d8d8d8',
          emerald: '#17dd62',
          redstone: '#cc0000',
          obsidian: '#1e1424',
          netherite: '#433242',
          beacon: '#a6ffec',
        },
      },
      boxShadow: {
        'mc-inset': 'inset -2px -4px 0 0 #373737, inset 2px 2px 0 0 #ffffff',
        'mc-raised':
          'inset -2px -4px 0 0 #373737, inset 2px 2px 0 0 #ffffff, 0 4px 0 0 #000',
        'mc-pressed':
          'inset 2px 4px 0 0 #373737, inset -2px -2px 0 0 #ffffff',
        'mc-slot':
          'inset -1px -1px 0 0 #ffffff, inset 1px 1px 0 0 #373737',
        'mc-tooltip':
          '0 0 0 2px #2d0046, 0 0 0 4px #100010',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
