# NY Times Most Popular Articles

A React application that displays the NY Times Most Popular Articles and allows users to view article details. This project demonstrates a master/detail pattern using modern React practices.

## Features

- View a list of the most popular articles from the NY Times API
- Click on articles to view detailed information
- Search articles based on title
- Responsive design that works on various screen sizes
- Dark mode support

## Tech Stack

- React 19
- TypeScript
- React Router v7
- Tailwind CSS
- Jest & React Testing Library
- Cypress for E2E testing
- Webpack for bundling
- ESLint & Prettier for code quality
- SonarCloud for static code analysis

## Project Structure

```
src/
├── api/              # API related functions
├── components/       # React components
│   ├── __tests__/    # Component tests
├── api.ts/          # API functions
├── types.ts/        # TypeScript type definitions
└── App.tsx          # Main application component
```

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ayishanajlaa/ny-times-ayisha.git
cd ny-times-ayisha
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your NY Times API key:
```
REACT_APP_API_KEY=your_api_key_here
REACT_APP_API_URL=https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?
```

> Note: You can obtain an API key by signing up at https://developer.nytimes.com/get-started

### Running the Application

Start the development server:
```bash
npm start
```

The application will be available at http://localhost:8080

### Building for Production

```bash
npm run build
```

The bundled files will be in the `dist` directory.

## Testing

### Running Unit Tests

```bash
# Run tests
npm test

# Run tests with coverage report
npm run test:coverage
```

The coverage report will be available in the `coverage` directory.

### Running E2E Tests

```bash
# Open Cypress Test Runner
npm run cypress:open

# Run Cypress tests headlessly
npm run cypress:run
```

## Code Quality

### Linting and Formatting

```bash
# Run ESLint
npm run lint

# Format code with Prettier
npm run format
```

### SonarCloud Analysis

This project uses SonarCloud for continuous code quality analysis. SonarCloud provides static code analysis to detect bugs, vulnerabilities, and code smells.

#### SonarCloud Badge

[![SonarQube Cloud](https://sonarcloud.io/images/project_badges/sonarcloud-light.svg)](https://sonarcloud.io/summary/new_code?id=ny-times-most-popular-articles)


## License

This project is licensed under the MIT License - see the LICENSE file for details.
