## ⚙️ TopGPT Server / Backend Layer

The backend architecture driving the logic, payment processing, image hosting endpoints, and user state for TopGPT.

### 🛠️ Tech Stack 

- **Framework**: Express.js
- **Runtime**: Node.js
- **Database**: MongoDB (via Mongoose API)
- **Authentication**: JWT (JSON Web Tokens) & BcryptJS
- **Payments**: Stripe Checkout Sessions & Webhooks
- **Image Handling**: ImageKit
- **LLM Integration**: OpenAI (Gemini 2.5 Flash pipeline configuration)

### ⚡ Key Implementations

- **Stateless REST API:** Cleanly separated router controllers handling logic strictly isolated to `/api/user`, `/api/chat`, `/api/message`, and `/api/credit`.
- **Asynchronous Webhook Integrity:** The server implements `express.raw()` specifically for the `/api/stripe` webhook route. This ensures Stripe Event Signatures can be properly verified by preventing Express from parsing JSON preemptively, avoiding critical "Invalid Event Payload" security failures.
- **Defensive Error Handling**: Mongoose validation logic ensures email uniqueness. Stripe instances are wrapped in graceful fallback conditions to prevent full Node runtime crashes on uninitialized environments.

### ⚙️ Local Development

1. Create a `.env` file in the `/server` directory:
   ```env
   # Application Ports
   PORT=3000
   
   # Database Configurations
   MONGODB_URI="your_mongodb_cluster_string"
   
   # Authentication
   JWT_SECRET="your_secure_jwt_secret"

   # Internal LLM API Integration
   OPENAI_API_KEY="your_api_key_configuration"

   # Image Distribution Framework
   IMAGEKIT_PUBLIC_KEY="your_imagekit_public_key"
   IMAGEKIT_PRIVATE_KEY="your_imagekit_private_key"
   IMAGEKIT_URL_ENDPOINT="your_imagekit_endpoint"

   # Stripe Micro-Economy Handling
   STRIPE_SECRET_KEY="your_stripe_secret_key"
   STRIPE_WEBHOOK_SECRET="your_stripe_webhook_secret_for_local_cli"
   ```

2. Start the development server using Demon mode:
   ```bash
   npm run server
   ```
