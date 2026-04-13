# Dairy Delight Hub

A full-stack dairy products management application with separate frontend and backend.

## Project Structure

```
dairy-delight-hub-main/
  frontend/          # React + TypeScript frontend
  backend/           # Node.js + Express backend
```

## Frontend (React + Vite)

### Setup
```bash
cd frontend
npm install
```

### Run
```bash
npm run dev
```
Frontend runs on http://localhost:8080

## Backend (Node.js + Express)

### Setup
```bash
cd backend
npm install
```

### Run
```bash
npm run dev
```
Backend runs on http://localhost:3001

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/categories/all` - Get all categories
- `GET /api/health` - Health check

## Running the Full Application

1. Start the backend:
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend (in another terminal):
   ```bash
   cd frontend
   npm run dev
   ```

3. Open http://localhost:8080 in your browser
