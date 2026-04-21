
iPod Mini (React Project)

Overview

This is a mini frontend project built using React that mimics the classic Apple iPod interface. The goal of this project is to recreate the core interaction experience of an iPod, particularly the circular navigation wheel and menu-based UI, in a web environment.

The project focuses more on interaction design and UI behavior rather than feature completeness.

⸻

Features

Music Player
	•	Includes a functional music player with 5 preloaded songs
	•	Supports:
	•	Play / Pause
	•	Track navigation
	•	Time tracking (current time and duration)

⸻

Circular Wheel Navigation (Core Highlight)
	•	Interactive wheel pad UI
	•	Users can hover and move the mouse in a circular motion to navigate menu options
	•	Mimics the real iPod scroll wheel behavior

This is the most innovative part of the project.

⸻

Placeholder Screens with Loaders
	•	Other menu options (non-music features) are intentionally not implemented
	•	Instead, they display a loading screen with a spinner
	•	Helps simulate a real device experience while keeping project scope focused

⸻

Tech Stack

React (Class Components)

Used for:
	•	Component-based architecture
	•	State management using this.state and this.setState
	•	Lifecycle methods like componentDidMount for event handling

⸻

styled-components

Used for styling because:
	•	Keeps styles scoped to components
	•	Improves readability and maintainability
	•	Avoids global CSS conflicts
	•	Suitable for this project due to a limited and structured component set

⸻

react-spinners
	•	Used to display loading indicators for non-implemented sections
	•	Enhances user experience instead of leaving blank screens

⸻

Key Concepts Implemented
	•	Class-based state management (this.state, setState)
	•	Lifecycle methods (componentDidMount, etc.)
	•	Event handling (timeupdate, loadedmetadata, durationchange)
	•	Controlled UI updates based on state changes
	•	Custom interaction logic for circular motion detection
	•	Component-driven UI design
	•	Conditional rendering (player vs loader screens)

⸻

Current Status
	•	Only the music player is fully functional
	•	No real backend or dynamic data
	•	Wheel interaction is simulated using mouse (not touch optimized)
	•	No playlist management or advanced controls

⸻

How to Run
```
npm install
npm start

```

⸻

Live Link

https://ephemeral-pika-2d3c89.netlify.app/
