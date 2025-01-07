# Pincode API Fetcher

## Overview

The **Pincode API Fetcher** is a lightweight, serverless solution for retrieving detailed information about a specific Indian pincode. It leverages the [Post Office Pincode API](https://api.postalpincode.in) to provide accurate location details such as the city and state associated with a given pincode. The project includes robust input validation and user-friendly error handling.

---

## Features

- **Input Validation**: Ensures the pincode is valid using Zod schema.
- **Data Fetching**: Retrieves information directly from the Post Office Pincode API.
- **Structured Responses**: Returns location details in a clear, JSON format.
- **Error Handling**: Handles validation, API errors, and unexpected server issues gracefully.

---

## Installation

To set up the project:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/pincode-api-fetcher.git
   cd pincode-api-fetcher
2. Install the dependencies
    ```bash
    npm install
## Usage
This project is designed to run as a serverless function. The main logic resides in src/index.ts and is structured to handle incoming API requests.

### How It Works
- **Request Handling**: Extracts the incode from the URL.
- **Validation**: Verifies the pincode format using a Zod schema.
- **Data Fetching**: Queries the Post Office Pincode API for location details.
- **Response**: Returns a JSON response with the details or an appropriate error message.

### Example Request
To fetch details for a specific pincode, send a GET request to:
```
/api/pincode/{pincode}
```
Replace {pincode} with the 6-digit pincode you want to query.

### Example Response

#### Successful Response:
```json
{
  "success": true,
  "pincode": "110001",
  "city": "New Delhi",
  "state": "Delhi"
}
```

#### Error Response:
```json
{
  "success": false,
  "message": "Pincode not found"
}
```

## Error Handling

The API fetcher is built to handle various scenarios with descriptive status codes and messages:

- Validation Errors: Returns a 400 Bad Request with details if the pincode format is invalid.
- Pincode Not Found: Returns a 404 Not Found if the pincode does not exist in the API.
- Server Errors: Returns a 500 Internal Server Error for any unexpected issues.


## Here are the steps to deploy your Pincode API Fetcher to a Cloudflare Worker:

#### Step 1: Set Up Wrangler (Cloudflare CLI)

Install Wrangler globally:
```bash
npm install -g wrangler
```

Log in to your Cloudflare account:
```bash
wrangler login
```

#### Step 2: Test Your Worker Locally
````bash
wrangler dev
````
Visit http://localhost:8787/api/pincode/{pincode} in your browser or use tools like curl or Postman to test.

#### Step 3: Deploy Your Worker
```bash
wrangler deploy
```
Once deployed, you’ll get a URL for your Worker, such as:
```bash
https://pincode-api-fetcher.your-cloudflare-account.workers.dev
```
### Optional Enhancements
- **Custom Domain:** Bind the Worker to your custom domain through the Cloudflare dashboard.
- **Caching:** Add caching for frequently requested pincodes using the Cloudflare Cache API.
- **Rate Limiting:** Implement rate limiting to prevent abuse of the Worker.


## Contributing
We welcome contributions! If you have suggestions, bug fixes, or new features to add, please:

- Fork the repository.
- Create a new branch for your changes.
- Submit a pull request for review.

## License
This project is open source and available under the MIT License. Feel free to use, modify, and distribute it as per the terms of the license.