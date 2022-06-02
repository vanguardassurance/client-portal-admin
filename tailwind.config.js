// tailwind.config.js
module.exports = {
  theme: {
    extend: {},
  },
  plugins: [
  ],
  content: [
    `components/**/*.{vue,js}`,
    `layouts/**/*.vue`,
    `pages/**/*.vue`,
    `composables/**/*.{js,ts}`,
    `plugins/**/*.{js,ts}`,
    `App.{js,ts,vue}`,
    `app.{js,ts,vue}`,
    "./index.html",
    "./**/*.{vue,js,ts,jsx,tsx}",
    'nuxt.config.js'
  ],
  purge:{
    //enable remove unused CSS only in production
    enabled: process.env.NODE_ENV === 'production',
    //any file that may contain the reference of CSS styles by class name.
  }
  }