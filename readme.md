# Emergency Contact PWA

This is a Progressive Web App (PWA) for displaying emergency contact information based on the user's location.

## Technologies Used

*   Frontend: HTML, CSS, JavaScript
*   Mapping Library: Leaflet
*   Base Map: OpenStreetMap tiles
*   Geocoding/Reverse Geocoding: Nominatim API
*   Backend: Cloudflare Workers
*   Database: Cloudflare D1
*   Deployment: Cloudflare Pages
*   Version Control: GitHub

## Setup Instructions

1.  Create a new Cloudflare Pages project.
2.  Add the HTML, CSS, and JavaScript files to the root of the project.
3.  Create a Cloudflare Worker with the worker.js code.
4.  Create a Cloudflare D1 database.
5.  Create a table called `emergency_services` with the columns: `id` (INTEGER, PRIMARY KEY), `name` (TEXT), `address` (TEXT), `latitude` (REAL), `longitude` (REAL), `phone` (TEXT), `service_type` (TEXT).
6.  Import the data from `data.csv` into the `emergency_services` table.
7.  Set the route for the worker in the Cloudflare Pages configuration.
8.  Deploy the application to Cloudflare Pages.