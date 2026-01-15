# Graph Builder Frontend


https://github.com/user-attachments/assets/db2e174a-7531-4622-a8c1-4103b7e5f948


## Acceptance Criteria

To consider the project working as expected, the following criteria must be met:
- The backend API must be running and accessible at port `8000`.
- The frontend should connect successfully to the API endpoints listed above.

# Graph Builder FE

Frontend project in Next.js for graph visualization and construction.

## Installation

1. Clone the repository:

   ```bash
   git clone <repo-url>
   cd graph-builder-fe
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```


## Available Endpoints

You can use the following API endpoints:

- `/api/graph` – Create and fetch graphs
- `/api/graph/{id}` – Get details for a specific graph
- `/api/related-topics` – Fetch related topics for nodes


## Troubleshooting

- If the frontend cannot connect to the API, make sure the backend is running and accessible at port `8000`.
- Check that the environment variable `NEXT_PUBLIC_API_URL` matches the backend URL and port.
- If you see CORS errors, verify backend CORS settings allow requests from the frontend URL.
- For any other issues, check the browser console and backend logs for error details.

## Backend Repository

You can find the backend code and documentation here:

- [Graph Builder Backend](https://github.com/jorge6242/graph-builder-api)

- **Design Patterns:** Use patterns such as Container/Presentational, component composition, and separation of concerns.
- **SOLID Principles:** Apply SOLID principles to keep the code scalable and maintainable.
- **Custom Hooks:** Centralize reusable logic in custom hooks located in `src/hooks`.
- **Reusable Components:** Create reusable and decoupled components in `src/components`.
- **Strict Typing:** Use TypeScript and define types in `src/types` for better safety and clarity.
- **State Management:** Prefer React Query and React Context for data fetching and global state management.
- **Styling:** Use CSS Modules or Tailwind to keep styles encapsulated and consistent.

---
