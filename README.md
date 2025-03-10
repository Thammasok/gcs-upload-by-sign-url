# Google Storage Signed URL Upload Demo

This project demonstrates how to use Google Cloud Storage signed URLs to securely upload files directly from a client to a Google Cloud Storage bucket.

## Prerequisites

- Service account -> get service account json file from GCP
- Bring service account file name `gs-beta-demo-service-account.json` into root of project

## Install and run

Install dependencies:
```npm install```

Run the development server:
```npm run dev```

## How It Works

1. The client requests a signed URL from the server by sending a request to the `/api/signed-url` endpoint with the content type of the file to be uploaded.
2. The server generates a signed URL using the Google Cloud Storage client library and returns it to the client.
3. The client uses the signed URL to upload the file directly to the Google Cloud Storage bucket.

## Relevant Files

- pages/api/signed-url.ts: Contains the API route for generating signed URLs.
- pages/index.tsx: Contains the client-side code for uploading files using the signed URL.
- Then check uploaded file at google cloud project `your-project` bucket `gs-signed-url-upload-example`

**Contact armse if you have any questions**
