// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["vuetify-nuxt-module"],
  vuetify: {
    vuetifyOptions: {
      theme: {
        themes: {
          light: {
            colors: {
              "custom-color-one": "#b71c1c",
              "custom-color-two": "#3B8070",
              primary: "#0085F3",
              secondary: "#FFED4A",
            },
          },
        },
      },
    },
  },
});
