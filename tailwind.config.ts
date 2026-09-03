import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0A6C3D', 
          dark: '#074226',    
          deep: '#0B3B24',    
          ink: '#12291C',     
        },
        cream: {
          DEFAULT: '#FAF7F0', 
        },
        gold: {
          DEFAULT: '#D9A441', 
          light: '#F0D48A',   
        },
        blood: {
          DEFAULT: '#7A1E1E', 
        },
        footer: {
          bg: '#07271A',      
        }
      },
    },
  },
  plugins: [],
}
export default config