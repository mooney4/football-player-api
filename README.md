
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

node importData.js
Start the API server:

bash

npm run dev

MIT License
