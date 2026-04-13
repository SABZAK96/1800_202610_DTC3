// This Vite config file (vite.config.js) tells Rollup (production bundler) 
// to treat multiple HTML files as entry points so each becomes its own built page.

import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                index: resolve(__dirname, "index.html"),
                login: resolve(__dirname, "login.html"),
                main: resolve(__dirname, "main.html"),
                settings: resolve(__dirname, "settings.html"),
                explore: resolve(__dirname, "explore.html"),
                eventpage: resolve(__dirname, "eventpage.html"),
                calendar: resolve(__dirname, "calendar.html"),
                friends: resolve(__dirname, "friends.html"),
                eventpage_js: resolve(__dirname, "src/eventpage.js")
            }
        }
    }
});
