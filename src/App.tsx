import { JSX } from "react";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthProvider.tsx";

const App = (): JSX.Element => {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
};

export default App;
