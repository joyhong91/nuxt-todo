const development = process.env.NODE_ENV !== 'production';
import bodyParser from 'body-parser'
import session from 'express-session'

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
  devServerHandlers: [],
  axios: {
    baseURL: development? 'http://localhost:3000': 'https://joyhong9102.netlify.app',
  },
  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
          // required: true,
          // type: 'Bearer'
        },
        user: {
          property: 'user',
          // autoFetch: true
        },
        endpoints: {
          login: { url: '/api/auth/login', method: 'post' },
          logout: false,
          user: false
        }
      }
    },
    redirect: {
      login: '/auth/login',
      logout: '/',
      callback: '/auth/login',
      home: '/'
    }
  },
  serverMiddleware:[
    // body-parser middleware
    bodyParser.json(),
    // // session middleware
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 60000 }
    }),
    // Api middleware
    // We add /api/login & /api/logout routes
    '~/api'
  ],
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