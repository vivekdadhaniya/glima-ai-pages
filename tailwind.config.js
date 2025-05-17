/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*",
    "./style_lora_single_pages/**/*.html",   
    "./Image_Ai_Tool_Single_page/**/*.html",   
    "./Image_style_menual_single_page/**/*.html",   
    "./pikka_Ai_pages/**/*.html", 
    "./Video_template/**/*.html",  
    "./video_Generator/**/*.html",  
    "./nsfw/**/*.html",  
    
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['inter'],
        'playfair': ['playfair'],
      },
      colors: {
        'limegreen': '#C6FF00',
        'black-0a0a0a': '#0A0A0A',
        'black-1B1B1B': '#1B1B1B',
        'gray-B1B1B1':'#B1B1B1',
      },
      scrollbar: {
        hide: {
          'scrollbar-width': 'none', /* For Firefox */
          '&::-webkit-scrollbar': {
            display: 'none' /* For Chrome, Safari, and Opera */
          }
        }
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          'scrollbar-width': 'none', /* For Firefox */
          '&::-webkit-scrollbar': {
            display: 'none' /* For Chrome, Safari, and Opera */
          }
        }
      });
    }
  ],
}

