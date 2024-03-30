import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { Router } from "./routes";
import "./App.css";

const App = () => {
  const router = Router();
  return (
    <>
      <Suspense>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
};

export default App;
