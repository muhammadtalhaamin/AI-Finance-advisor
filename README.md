# AI-Driven Personal Finance Advisor

AI-Driven Personal Finance Advisor is a web application that provides personalized financial advice and management tools using artificial intelligence. This project aims to help users make informed financial decisions, set and track financial goals, and improve their overall financial health.

## Features

- User authentication and registration
- Personalized financial advice using AI
- Financial snapshot and goal tracking
- AI-powered chatbot for financial queries

## Technologies Used

- Frontend: React.js with Chakra UI
- Backend: Node.js with Express.js
- Database: MongoDB
- AI Integration: OpenAI's GPT-4
- State Management: Redux Toolkit
- Authentication: JSON Web Tokens (JWT)

## Setup

### Prerequisites

- Node.js (version 14 or later)
- MongoDB
- OpenAI API key

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/0xmetaschool/ai-finance-advisor.git
   cd ai-finance-advisor
   ```

2. Install dependencies for both frontend and backend:

   - For the backend:
      ```
      cd backend
      npm install express mongoose dotenv bcryptjs jsonwebtoken cors axios
      ```

      This will install the following key dependencies:
      - express: Web application framework
      - mongoose: MongoDB object modeling tool
      - dotenv: Loads environment variables from .env file
      - bcryptjs: Library for hashing passwords
      - jsonwebtoken: Implementation of JSON Web Tokens
      - cors: Middleware for enabling CORS
      - axios: Promise-based HTTP client for making API requests


   - For the frontend:
      ```
      cd frontend
      npm install react react-dom react-router-dom @reduxjs/toolkit
      npm install react-redux @chakra-ui/react
      npm install @emotion/react @emotion/styled
      npm install framer-motion axios react-markdown recharts
      ```

      This will install the following key dependencies:
      - react and react-dom: Core React libraries
      - react-router-dom: Routing library for React
      - @reduxjs/toolkit and react-redux: State management libraries
      - @chakra-ui/react, @emotion/react, @emotion/styled, framer-motion: UI component library and its dependencies
      - axios: Promise-based HTTP client for making API requests
      - react-markdown: Markdown renderer for React
      - recharts: Charting library for React

3. Set up environment variables:
   - Create a `.env` file in the `backend` directory
   - Add the following variables:
     ```
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     OPENAI_API_KEY=your_openai_api_key
     ```

4. Start the backend server:
   ```
   cd backend
   npm run dev
   ```

5. Start the frontend development server:
   ```
   cd frontend
   npm start
   ```

6. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Register for a new account or log in if you already have one.
2. Complete the onboarding process to set up your financial profile.
3. Explore the different features:
   - View your financial snapshot
   - Set and track financial goals
   - Get AI-powered financial advice
   - Use the chatbot for quick financial queries
   - Analyze what-if scenarios for financial planning

## API Endpoints

- `/api/auth/register` - User registration
- `/api/auth/login` - User login
- `/api/financial-snapshot` - Get and update financial snapshot
- `/api/financial-advice` - Get AI-powered financial advice
- `/api/goals` - CRUD operations for financial goals
- `/api/chat` - AI chatbot interaction

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/0xmetaschool/ai-finance-advisor/blob/main/LICENSE) file for details.

## Acknowledgments

- OpenAI for providing the GPT-4 API
- The Chakra UI team for their excellent React component library

## Contact

For any queries or support, please open an issue in the GitHub repository.

---

## Future Enhancements

- Integration with real financial institutions for automatic data import
- Advanced data visualization and reporting
- Machine learning models for predictive financial analysis
- Multi-language support

We encourage community feedback and contributions to these potential features!
