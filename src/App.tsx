import { StrictMode } from "react";
import "./App.css";
import RootRouter from "./common/routers/RootRouter";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./common/clients/reactQueryClient";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={RootRouter} />
      </QueryClientProvider>
    </StrictMode>
  );
}

export default App;
