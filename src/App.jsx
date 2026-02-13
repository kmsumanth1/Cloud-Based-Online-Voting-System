import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";

import Login from "./pages/Login";
import VoterDashboard from "./pages/VoterDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>

          {/* Public Route */}
          <Route path="/" element={<Login />} />

          {/* Voter Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requiredRole="VOTER">
                <Layout>
                  <VoterDashboard />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Admin Dashboard */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <Layout>
                  <AdminDashboard />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Results Page (Protected) */}
          <Route
            path="/results"
            element={
              <ProtectedRoute requiredRole="VOTER">
                <Layout>
                  <Results />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* 404 Fallback */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
