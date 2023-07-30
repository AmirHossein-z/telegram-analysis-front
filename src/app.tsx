import { JSX } from "react";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/auth-provider.js";
import { HelmetProvider } from "react-helmet-async";
import { ErrorBoundary } from "./pages/index.js";

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
