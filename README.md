# Extra Time

## Overview

Our team DTC03 is developing EXTRA TIME to help FIFA attendees to discover and plan events that fit their interests, schedules, and budgets by centralizing event discovery and integrating scheduling and transportation awareness unlike platforms such as Eventbrite, which focus mainly on listing events, and social media, where event information is fragmented across posts and stories.

Developed for the COMP 1800 course, this project applies User-Centred Design practices and agile project management, and demonstrates integration with Firebase backend services for storing user favorites.

---

## Features

- **Event Discovery & Browsing**: Browse FIFA 2026 events fetched from Firestore, with a dedicated Explore page showing events in list and grid layouts.
- **Search & Filter**: Search events by name and filter by category/tag, budget cap, and preferred day on the Explore page. Filters are pre-selected automatically based on the user's saved preferences from Settings.
- **Event Detail Page**: View full event info including price, location, date/time, description, refund policy, and an interactive Leaflet.js map.
- **Favourites**: Save events with a heart button; favourites persist per user in Firestore and are shown on the home dashboard.
- **Calendar**: Add events to a personal calendar from the event detail page, view them sorted chronologically by day, and remove them. Uses real-time Firestore listeners so the calendar updates instantly without a page reload.
- **User Authentication**: Email/password sign-up and login via Firebase Auth, with automatic redirects for unauthenticated users.
- **Settings & Preferences**: Update profile info, select event interest categories, set a budget preference, and choose preferred days.
- **Profile Image Upload**: Upload a profile photo from the Settings page; the image is Base64-encoded and saved directly to the user's Firestore document, then displayed across the app.
- **Responsive Navigation**: Custom web-component navbar — sidebar on desktop, bottom tab bar on mobile — with active-page highlighting.
- **Drag-to-scroll Carousels**: Horizontally scrollable carousels for upcoming events, categories, and favourites, with mouse-drag support on desktop.

---

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Backend**: Firebase for hosting
- **Database**: Firestore

---

## Usage

To run the application locally:

1.  **Clone** the repository.
2.  **Install dependencies** by running `npm install` in the project root directory.
3.  **Start the development server** by running the command: `npm run dev`.
4.  Open your browser and visit the local address shown in your terminal (usually `http://localhost:5173` or similar).

Once the application is running:

1.  Browse the list of FIFA 2026 events displayed on the main page.
2.  Click the heart icon to save an event to your favourites.
3.  View your saved events in the favourites section.
4.  Use the Explore page to search and filter events.
5.  Add friends and manage your profile in the Friends and Settings pages.

---

## Project Structure

```
1800-202610-DTC3/
├── src/
│   ├── app.js
│   ├── authentication.js
│   ├── calendar.js
│   ├── eventpage.js
│   ├── explore.js
│   ├── firebaseConfig.js
│   ├── friends.js
│   ├── index.js
│   ├── LoginSignup.js
│   ├── main-carousel.js
│   ├── main.js
│   ├── settings.js
│   ├── site-footer.js
│   └── site-navbar.js
├── styles/
│   └── style.css
├── public/
├── images/
├── .env
├── .gitignore
├── calendar.html
├── eventpage.html
├── explore.html
├── friends.html
├── index.html
├── login.html
├── main.html
├── package-lock.json
├── package.json
├── README.md
├── settings.html
├── skeleton.html
└── tailwind.config.js
```

---

## Contributors

- **Sacha Clements** - BCIT CST Student who loves github.
- **Saba** - BCIT CST Student and I'm struggling with git right now! 
- **Alex** - BCIT CST Student with a passion for art and design.

---

## Acknowledgments

- Events data and images are for demonstration purposes only.
- part of map code is adopted from https://leafletjs.com/ 
- authenrication, login/signup process, and firebaseConfig JS codes were adopted from demos
- Profile image upload code (Base64 encoding with FileReader and Firestore save) was adapted from the BCIT COMP 1800 course tech-tip channel.
- Code snippets were adapted from resources such as [Stack Overflow](https://stackoverflow.com/) and [MDN Web Docs](https://developer.mozilla.org/).
- Icons sourced from [FontAwesome](https://fontawesome.com/), some from Heroicons and images were genrated by AI

---

## Limitations and Future Work

### Limitations

- **Static event data**: Events are pre-loaded into Firestore and not pulled from a live external API, because we don't have access to real FIFA events for 2026.
- **Friends feature is UI-only**: The friends page displays a mockup but friend requests, syncing, and removal are not connected to the database.
- **"Invite friends" button is non-functional**: The button appears on each calendar event card but has no logic attached to it.
- **No password reset or email verification**: Users cannot recover accounts or verify their email address.
- **No real-time notifications**: No reminders or alerts for upcoming events, friend requests, or new event matches.

### Future Work

- **Functional friends system**: Complete friend requests, event syncing between friends, and viewing friends' calendars.
- **Preference-based recommendations**: Use saved settings (interests, budget, transportation) to surface personalized event suggestions on the home page.
- **Advanced filtering**: Add filters for date range and distance from the user's location.
- **Notification system**: Email or push notifications for upcoming events in the user's calendar.
- **Multi-event map view**: Show all nearby events on a single map with clickable markers.
- **RSVP / attendance tracking**: Let users officially register for events and see capacity.
- **Password reset and email verification**: Standard account recovery flow via Firebase Auth.
- **Dark mode**: Alternative colour theme for low-light use.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.
