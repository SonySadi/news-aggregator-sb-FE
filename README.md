# News Aggregator Frontend

This is the frontend project for a news aggregator application.

## Getting Started

### Prerequisites

- Node.js (version 18 or later)
- npm or yarn

### Environment Setup

1. Copy the `.env.example` file to `.env`:

   ```bash
   cp .env.example .env
   ```

2. Update the following variables in the `.env` file:
   - `NEXT_PUBLIC_API_URL`: Set this to your backend URL if different from the default.
   - `PORT`: Set this to change the port the application runs on (default is 3000).

### Running the Project

#### Local Development

1. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

2. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) (or your custom port) in your browser to see the application.
