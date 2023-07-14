import { JSX } from "react";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthProvider.tsx";
import { HelmetProvider } from "react-helmet-async";
import ErrorBoundary from "./components/ErrorBoundary.tsx";

const App = (): JSX.Element => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <HelmetProvider>
          <RouterProvider router={routes} />
          <ToastContainer
            position="top-center"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </HelmetProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
