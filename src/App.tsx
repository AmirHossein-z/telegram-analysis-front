import { JSX } from "react";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthProvider.tsx";
import { HelmetProvider } from "react-helmet-async";

const App = (): JSX.Element => {
  return (
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
  );
};

export default App;
