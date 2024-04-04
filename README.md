# Transaction Dashboard

The Transaction Dashboard is used to manage financial transactions. It integrates a form for entering transaction data, a display of transactions, and an interactive chatbot for user assistance.

## Features

- **Form**: A user-friendly form to input transaction details.
- **Transactions**: A real-time dashboard displaying transactions.
- **Chatbot**: An interactive chatbot to assist users with queries and guide them through the dashboard.

## Tech Stack

- **Backend**: Python with FastAPI
- **Frontend**: React App
- **Database**: sqlite3

## Getting Started

Follow these instructions to get your local development environment running.

### Prerequisites

Ensure you have the following installed:
- Python 3.8 or above
- Node.js and npm

### Setup

1. **Create a Virtual Environment**
   ```bash
   python -m venv venv
   source venv/bin/activate
   ```
2. **Install Backend Dependencies**
   ```bash
   pip install -r requirements.txt
   ```
3. **Run the Backend (FastAPI):**
   Start the FastAPI server with:
   ```bash
   uvicorn main:app --reload
   ```
   View the FastAPI documentation and test the API at: http://127.0.0.1:8000/docs
4. **Setup the Frontend**
   ```bash
   # Navigate to the frontend directory:
   cd path/to/reactapp
   # Install the necessary packages
   # npm install react-router-dom@5.2.0
   # npm install react-icons --save
   npm install
   ```
5. **Run the Frontend**
   ```bash
   npm start
   ```