# Interview Frontend

This project is a modern Angular 19 application designed to serve as a robust starting point for building feature-rich web applications. It includes a complete authentication system, product management features, and a dashboard, all built with a focus on best practices and modern web development standards.

## Key Features

- **Authentication**: Secure login and registration functionality with route guards to protect sensitive routes.
- **Dashboard**: A central hub for authenticated users to access key features and information.
- **Product Management**: A complete module for creating, listing, and editing products.
- **Lazy Loading**: Feature modules are lazy-loaded to optimize performance and reduce initial load times.
- **Server-Side Rendering (SSR)**: The application is configured for Angular SSR to improve SEO and performance.
- **Notifications**: User-friendly notifications are provided through `ngx-toastr`.

## Technologies Used

- **Angular 19**: The core framework for building the application.
- **NgRx**: For predictable and scalable state management.
- **Bootstrap & Font Awesome**: For a responsive and visually appealing UI.
- **SCSS**: As the CSS preprocessor for more maintainable and organized styles.
- **TypeScript**: For type safety and improved developer experience.

## Getting Started

### Prerequisites

- Node.js and npm
- Angular CLI

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```

### Development Server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### Building the Project

To build the project for production, run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory.

### Running Unit Tests

To execute unit tests with Karma, use the following command:

```bash
ng test
