
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate:"Portal Admin %s",
    htmlAttrs: {
      lang: 'en',
    },
    bodyAttrs: {
      class: 'vacportaladmin',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://pro.fontawesome.com/releases/v5.10.0/css/all.css' },
    ],
    script: [
    { hid: 'flowbite', src: 'https://unpkg.com/flowbite@1.4.5/dist/flowbite.js', defer: false },
    { hid: 'sidebarcontrol', src: '/js/sidebar.js', async: true, defer: false },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  router:{
    prefetchLinks: true, 
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    'nuxt-webfontloader',
  ],

  webfontloader: {
    google: {
      families: ['Lato:400,700'] //Loads Lato font with weights 400 and 700
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'http://192.168.100.212:8000/api/',
    //baseURL: "https://api.vanguardassurance.com/api/"
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
}
