import { JSX } from "react";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/auth-provider";
import { HelmetProvider } from "react-helmet-async";
import { ErrorBoundary } from "./pages";

const App = (): JSX.Element => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <HelmetProvider>
          <RouterProvider router={routes} />
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </HelmetProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
