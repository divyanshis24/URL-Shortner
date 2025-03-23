# URL Shortener

## Brief Explanation of the Approach

This URL Shortener project is built using Node.js, Express, and MongoDB. The main functionality includes creating short URLs for given long URLs and tracking the number of clicks on each short URL. Additionally, the project includes features such as custom alias creation while maintaining uniqueness, expiry link checks, and validation of provided long URLs to ensure they are accessible before shortening. The project uses Mongoose for MongoDB interactions and Axios for making HTTP requests to check if the provided URLs are accessible.

### Key Features:
- **Shorten URL**: Generates a short URL for a given long URL.
- **Custom Alias**: Allows users to provide a custom alias for the short URL.
- **Analytics**: Tracks the number of clicks on each short URL.

## Steps to Run the Project Locally

1. **Clone the Repository**:
    ```sh
    git clone <repository-url>
    cd URL-Shortner
    ```

2. **Install Dependencies**:
    ```sh
    npm install
    ```

3. **Set Up Environment Variables**:
    Create a `.env` file in the root directory and add your MongoDB URI:
    ```env
    MONGO_URI = "your_mongodb_connection_string"
    ```

4. **Start the Server**:
    ```sh
    npm start
    ```

5. **Server Running**:
    The server will start running on `http://localhost:3000`.

## Example API Requests & Responses

### 1. Shorten URL

**Request**:
```http
POST /url/shorten
Content-Type: application/json

{
    "redirectURL": "https://example.com"
}
```

**Response**:
```json
{
    "id": "shortID"
}
```

### 2. Custom Alias

**Request**:
```http
POST /url/shorten?alias=customAlias
Content-Type: application/json

{
    "redirectURL": "https://example.com"
}
```

**Response**:
```json
{
    "id": "customAlias"
}
```

### 3. Get Analytics

**Request**:
```http
GET /url/analytics/:shortID
```

**Response**:
```json
{
    "totalClicks": 5
}
```

### 4. Redirect to Long URL

**Request**:
```http
GET /:shortID
```

**Response**:
Redirects to the original long URL.

Deployed URL: https://url-shortner-tkq1.onrender.com
(This URL might not respond with OK status on the first run as it is deployed on a free server which doesnt supports runtime deployment. PLease wait for 3-4 mins as it redeploys the code.)
