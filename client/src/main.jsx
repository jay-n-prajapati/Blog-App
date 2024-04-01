import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store , persistor } from "./redux/store.js";
import App from "./App.jsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "./pages/ErrorPage/index.jsx";
import { PersistGate } from "redux-persist/integration/react";
import Loader from "./components/common/Loader.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ErrorBoundary fallback={<ErrorPage />}>
    <Provider store={store}>
    <PersistGate loading={<Loader/>} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </ErrorBoundary>
);
