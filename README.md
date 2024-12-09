# Vehicle Models Viewer 🚗

**Vehicle Models Viewer** is a web application that allows users to browse vehicle models by make and year.

---

## 🚀 Features

- **Integration with [NHTSA API](https://vpic.nhtsa.dot.gov/api)** to fetch vehicle data.
- **Reactive interface** built with React and Next.js.
- **Elegant design** powered by Tailwind CSS.
- **Loading state handling** using React `Suspense`.
- **Dynamic routes** to display results based on selected make and year.

---

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

---

## 📚 Features Overview

### Filter Page
- Users can select a vehicle make and model year.
- The "Next" button navigates to the result page after valid selections.

### Result Page
- Displays vehicle models based on the selected make and year.
- Implements error handling for data fetching.