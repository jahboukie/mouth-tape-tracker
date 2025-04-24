import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { queryClient } from "./lib/queryClient";

// Initialize user data if needed
(async () => {
  try {
    // Pre-warm the cache with user data
    await queryClient.fetchQuery({
      queryKey: ['/api/user'],
    });
  } catch (error) {
    console.error("Failed to fetch initial user data", error);
  }
})();

createRoot(document.getElementById("root")!).render(<App />);
