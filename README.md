# Movie Ticket Purchase API

## Description

This project is a Movie Ticket Purchase API built with Node.js, Express.js, MongoDB, and TypeScript. It allows users to book movie tickets, process payments, and receive confirmation emails. It also integrates with webhooks for external services.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [MongoDB](https://www.mongodb.com/try/download/community) (v4.0 or later)

## Setup and Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/movie-ticket-purchase-api.git
   cd movie-ticket-purchase-api
    ```
2. **Install Dependencies**

   ```bash
   npm install --legacy-peer-deps
   ```
3. **Set Environment Variables**

   Create a `.env` file in the root directory and add the following environment variables:

   ```env
   APP_PORT=8080
   APP_BASE_URL=http://localhost
   MONGODB_URI=mongodb://localhost:27017/movie_ticket
   MAIL_HOST=smtp.gmail.com
   MAIL_SERVICE=Gmail
   MAIL_USERNAME=your-email-address
   MAIL_PASSWORD=your-password
   MAIL_FROM=your-email-address
   WEBHOOK_SECRET=your-webhook-secret
   ```
4. **Start the Server**

   ```bash
    npm start
    ```
5. **Run Tests**

   ```bash
   npm test
   ```

## API Documentation
API Documentation is available at [http://localhost:8080/api-docs](http://localhost:8080/api-docs)

## License
This project is licensed under the MIT License—see the [LICENSE](LICENSE) file for details.

## Author
- Victor Chidi - Full stack Software Engineer

## Contact
For inquiries, support, or feedback, please email [victorblessed9@gmail.com]()
- [LinkedIn](https://www.linkedin.com/in/victor-chidi/)
- [GitHub](https://github.com/VikitorChidi)
