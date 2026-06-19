# <img src="https://github.com/icsousa/r6-killfeed/blob/main/public/logo.png" height="28px" />R6 Kill Feed Generator

[![Live Demo](https://img.shields.io/badge/demo-online-yellow.svg)](https://r6-killfeed.vercel.app/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)]()
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)]()

A sleek, interactive web application built to generate custom **Rainbow Six Siege** kill feed graphics. Perfect for content creators, thumbnail designers, and tournament organizers who need high-quality, transparent kill feed overlays.

## ✨ Features

* **Live Tactical Preview:** Instantly see your kill feed changes in a modern, R6-inspired UI.
* **Searchable Operator Roster:** Quickly find the exact Killer or Victim using the built-in modal grid with custom operator icons.
* **Dynamic Loadouts:** Weapon options automatically update based on the selected Killer.
* **Headshot Toggle:** Easily add or remove the iconic R6 headshot indicator.
* **Custom Team Colors:** Choose from authentic HUD colors (Blue, Orange, Red, Cyan, Yellow, Green, Purple) to match your scenario.
* **Transparent PNG Export:** Download your creation with a single click as a high-resolution, transparent image ready for video editing or stream overlays.

## 🛠️ Built With

* **[React](https://reactjs.org/)** - UI Framework
* **[Vite](https://vitejs.dev/)** - Build Tool & Development Server
* **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first styling
* **[html-to-image](https://github.com/bubkoo/html-to-image)** - Core engine for PNG generation

## 🚀 Getting Started

To run this project locally on your machine, follow these steps:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your system.

### Installation

1. Clone the repository:
```bash
   git clone [https://github.com/icsousa/r6-killfeed.git](https://github.com/icsousa/r6-killfeed.git)
   ```
2. Navigate to the project directory:
```bash
   cd r6-killfeed
   ```
3. Install the dependencies:
```bash
   npm install
   ```
4. Start the development server:
```bash
   npm run dev
   ```
5. Open your browser and visit `http://localhost:5173`.

## 📂 Project Structure

* `/public/icons/operators/` - Contains all `.png` operator icons.
* `/public/icons/weapons/` - Contains all `.png` weapon silhouettes.
* `src/App.jsx` - Main application logic, state management, and UI layout.
* `src/index.css` - Global styles, custom scrollbars, and Tailwind directives.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! 
Feel free to check the [issues page](https://github.com/icsousa/r6-killfeed/issues) if you want to contribute.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---
*Disclaimer: This project is not affiliated with, maintained, authorized, endorsed, or sponsored by Ubisoft. Rainbow Six Siege and all related properties are trademarks or registered trademarks of Ubisoft.*
