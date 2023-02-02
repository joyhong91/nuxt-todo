const development = process.env.NODE_ENV !== 'production';
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "66",
    htmlAttrs: {
      lang: "kr"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/global'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/messages.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/auth-next",
    "@nuxtjs/vuetify"
  ],
  vuetify: {
    theme: {
      dark: true,
      themes: {
        dark: {
          // primary: '#f2f2f2'
        }
      }
    }
  },
  auth: {
    strategies: {
      local: {
        token: {
          property: "token",
          global: true,
          required: true,
          type: "Bearer"
        },
        user: {
          property: "user",
          autoFetch: true
        },
        endpoints: {
          login: { url: "/api/auth/login", method: "post" },
          logout: false, //  we don't have an endpoint for our logout in our API and we just remove the token from localstorage
          user: { url: "/api/auth/user", method: "get" }
        }
      }
    },
    redirect: {
      home: false,
      login: '/login',
      logout: '/'
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
   
  },
  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  target: 'static', //for netlify 
  extend (config, ctx) {
    if (ctx.isServer) {
      config.externals = [
        nodeExternals({
          whitelist: [/^vue2-datepicker/]
        })
      ]
    }
  }
};
