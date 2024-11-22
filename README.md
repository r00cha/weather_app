# Weather App

Welcome to the **Weather App**! This project provides a user-friendly interface for fetching and displaying weather data from the `Open-meteo historical weather API` , built using a **Ruby on Rails backend** and a **React frontend**.

---

## Features

- Select a location and date range to fetch weather data.
- View temperature and precipitation information in an interactive chart.
- Paginated table for detailed hourly weather data.
- Animated feedback when no data is available.
- Loading spinner while fetching data.

---

## Requirements

Before running the project, ensure you have the following installed:

- **Ruby** (version 2.7 or later), **Rails** (version 7.1 or later) and **Bundler** for the backend.

- **Node.js** (version 14 or later) and **npm** for the React frontend.

---

## Setup Instructions

### 1. Clone the Repository

Open a terminal and run:

```bash
git clone <repository_url>
cd weather_app
```

### 2. Set Up the Rails Backend

1. Ensure you have Ruby and Bundler installed on your system.
2. Install the necessary dependencies:

```bash
bundle install
```

Start the Rails server:

```bash
rails s -p 3001
```

The backend will now be running on http://localhost:3001.

### 3. Set Up the React Frontend

Open a new terminal and navigate to the React app directory:

```bash
cd weather_app/react_app
```

Install the necessary dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm run start
```

The frontend will now be running on http://localhost:3000.

### Access the Application

- Open your browser and navigate to: http://localhost:3000.
- You can now use the Weather App to fetch and display weather data!
