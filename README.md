
# 🏆 Football Player API

A RESTful API built with **Node.js**, **Express**, and **PostgreSQL** to manage football player statistics.

## 🚀 Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mooney4/football-player-api.git
   cd football-player-api
Install dependencies:

bash
Copy
npm install
Create a .env file and add database credentials:

ini
Copy
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
DB_HOST=localhost
DB_NAME=footballDB
DB_PORT=5432
SECRET_KEY=your_jwt_secret
Run database migrations (if needed):

bash
Copy
node importData.js
Start the API server:

bash
Copy
npm run dev
📌 API Endpoints
Method	Endpoint	Description
GET	/api/v1.0/players	Get all players
POST	/api/v1.0/players	Create a new player (Auth required)
GET	/api/v1.0/players/:id	Get player by ID
PUT	/api/v1.0/players/:id	Update player stats (Auth required)
DELETE	/api/v1.0/players/:id	Delete player (Auth required)
🛠 Technologies Used
Node.js & Express.js
PostgreSQL (with pg for queries)
JWT Authentication
Jest & Supertest (for testing)
📌 License
MIT License
