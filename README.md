# Movie Runtime Service

A lightweight API to format movie runtimes into a user-friendly format like `Xhr Ymin`. Built using **Bun**, **Hono**, and **TypeScript** for speed and simplicity.

---

## Features
- Fast API server using Bun and Hono.
- Validates runtime input to ensure accuracy.
- Simple and clean endpoint for formatting runtimes.
- Lightweight and easy to set up for local development.

---

## Requirements
You need [Bun](https://bun.sh) installed to run this project.

## Setup Instructions
### 1. Clone the Repo

```bash
git clone https://github.com/Phil1999/movie-time-converter.git
cd movie-runtime-service
```

### 2. Dependencies

```bash
bun install
```

### 3. Start Development server

```bash
bun run dev
```

The server will start at http://localhost:3000.

## API Usage

### GET /format-runtime
Params: runtime (query parameter, required): Runtime in minutes (postive integer)

### Example Request
```bash
curl "http://localhost:3000/format-runtime?runtime=9999"

{
  "original_runtime": 9999,
  "formatted_runtime": "166hr 39min"
}
```

### Error Handling
If the query parameter is invalid, the API returns a 400 error:
```bash
{
  "error": "Runtime must be a positive integer"
}
```

## Communication Contract: Movie Runtime Microservice

This microservice accepts a runtime in minutes and returns a formatted string with the format `Xhr Ymin`. See example/test.ts for code on calling the API.

## Requesting Data
1. Send a **GET** request to the endpoint: http://localhost:3000/format-runtime
2. Include the `runtime` query parameter.

### Example Request:
```javascript
const fetch = require('node-fetch');

fetch('http://localhost:3000/format-runtime?runtime=134')
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err));
```

## Receiving Data
The microservice will respond with a JSON object containing:
* original_runtime: The input runtime in minutes.
* formatted_runtime: The formatted string.

### Example Response:
```json
{
  "original_runtime": 134,
  "formatted_runtime": "2hr 14min"
}
```

![UML_service](https://github.com/user-attachments/assets/06833472-21d5-47f2-ad19-5b69b1a08995)



