import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import SearchPage from './pages/SearchPage';
import ProfessionalDetailPage from './pages/ProfessionalDetailPage';
import DashboardPage from './pages/DashboardPage';
import ProfileSetupPage from './pages/ProfileSetupPage';
import './index.css';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="flex flex-col min-h-screen bg-white">
          <Navbar />
          
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/setup-profile" element={<ProfileSetupPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/professional/:id" element={<ProfessionalDetailPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
