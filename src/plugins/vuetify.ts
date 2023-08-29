/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: "#004D40",
          secondary: "#00695C",
          background: "#E0F2F1",
          text: "#FFFFFF",
          info: "#2196F3",
          success: "#1DE9B6",
          warning: "#FFC107",
          error: "#FF5252",
        },
      },
      dark: {},
    },
  },
});
