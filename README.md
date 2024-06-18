# Coffee Shop Finder App

Welcome to the Coffee Shop Finer App! It enables users to search for and explore coffee shops, view their products, and get detailed information about each shop.

## Features

- Register your shop
- List all shops
- Search for your shop
- List all products of a particular shop
- Display location of the shop on map
- Add products to a shop
- Edit and delete operations on shops
- Responsive design

## Setup

### Server

1. **Set up `.env` file**
   - Create a `.env` file in the `/backend` directory.
   - Add environment variables like database connection string, API keys, etc. (if applicable).

2. **Install dependencies**
   ```bash
   cd backend
   npm install
   
3. **Run development server**
    ```bash
    npm run dev

The backend server will start running on http://localhost:3000.

### Client

1. **Set up `.env` file**
   - Create a `.env` file in the `/frontend` directory.
   - Add environment variables like backend API URL (e.g., `REACT_APP_API_URL=http://localhost:5000/api/v1+`).

2. **Install dependencies**
   ```bash
   cd frontend
   npm install

3. **Run development server**
   ```bash
   npm run dev

The frontend development server will start running on [http://localhost:5173](http://localhost:5173).

## Usage

#### Example Scenario: Register a new shop

1. Navigate to the registration page.
2. Fill out the required information and submit the form.

#### View all shops

1. Visit the shops list page to see all registered shops.

#### Add a product to a shop

1. Navigate to the shop's detail page.
2. Click on the "Add Product" button and fill out the product details.
3. View the location of the shop on the map.

#### Edit or delete a shop

1. On the shops list page or shop detail page, use the edit or delete functionality.

#### Search for a shop

1. Use the search feature to find a specific shop by name.

## Technologies Used

- Node.js
- Express.js (for backend)
- React (for frontend)
- MongoDB (for database)
- Leaflet.js (for maps integration - 3rd party api)
- Cloudinary (for image storage - 3rd party api)
