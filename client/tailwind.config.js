/** @type {import('tailwindcss').Config} */


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        green:{
          Light:'#ebf6f2',
          Light_hover:'#e1f1ec',
          Light_active:'#c0e2d8',
          Normal:'#34a181',
          Normal_hover:'#2f9174',
          Normal_active:'#2a8167',
          Dark:'#277961',
          Dark_hover:'#1f614d',
          Dark_active:'#17483a',
          Darker:'#12382d',
        },
        pink:{
          Light:'#FFFCFD',
          Light_hover:'#FEFBFB',
          Light_active:'#FDF7F8',
          Normal:'#FAE4E7',
          Normal_hover:'#E1CDD0',
          Normal_active:'#C8B6B9',
          Dark:'#BCABAD',
          Dark_hover:'#96898B',
          Dark_active:'#706768',
          Darker:'#585051',
        },
        black:{
          Light:'#E8E8EA',
          Light_hover:'#DDDDE0',
          Light_active:'#B8B9BE',
          Normal:'#191C2D',
          Normal_hover:'#171929',
          Normal_active:'#141624',
          Dark:'#131522',
          Dark_hover:'#0F111B',
          Dark_active:'#0B0D14',
          Darker:'#090A10',
        },
      },
      fontSize:{
        h1:'48px',
        h2:'40px',
        h3:'33px',
        h4:'28px',
        h5:'23px',
        title1:'19px',
        title2:'16px',
        body:'13px',
        caption:'13px',
      }
    },
  },
  plugins: [],
}