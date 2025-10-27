import { Routes, Route } from "react-router";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Products from "./pages/products"
import AddProduct from "./pages/add-product";
import Navbar from "./pages/navbar";
import { ToastContainer } from "react-toastify";
import { useAuth, AuthProvider } from "./context/AuthContext";
import { Navigate } from "react-router";
import { DotLoader } from "react-spinners";

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "blue",
  };

  const color = "#2563eb"; // blue-600

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <DotLoader
          color={color}
          loading={loading}
          cssOverride={override}
          size={80}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function PublicRoute({ children }) {
  const { user, loading } = useAuth();

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "blue",
  };

  const color = "#2563eb"; // blue-600

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <DotLoader
          color={color}
          loading={loading}
          cssOverride={override}
          size={80}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  // If user is already logged in, redirect to products
  if (user) {
    return <Navigate to="/products" replace />;
  }

  // Otherwise, show the public page (like login or signup)
  return children;
}

function App() {

  const { user } = useAuth();

  return (
    <>
      <AuthProvider>

        {user && <Navbar />}

        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />

          <Route
            path="/products"
            element={
              <PrivateRoute>
                <Products />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-product"
            element={
              <PrivateRoute>
                <AddProduct />
              </PrivateRoute>
            }
          />

          {/* default route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="colored"
        />
      </AuthProvider>
    </>
  )
}

export default App
