import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import App from "./App.jsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "./pages/ErrorPage/index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ErrorBoundary fallback={<ErrorPage />}>
    <Provider store={store}>
      <App />
    </Provider>
  </ErrorBoundary>
);
