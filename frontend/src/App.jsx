import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreateContentPage from './pages/CreateContentPage';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import ContentListPage from './pages/ContentListPage';
import DetailedViewPage from './pages/DetailedViewPage';
import PlaylistsPage from './pages/PlaylistsPage';
import UserContentPage from './pages/UserContentPage';
import ProtectedRoute from './components/ProtectedRoute';

const API_BASE_URL = "http://localhost:3000/api";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/content"
            element={
              <ProtectedRoute>
                <ContentListPage url={API_BASE_URL} />
              </ProtectedRoute>} />
          <Route
            path="/content/:id"
            element={
              <ProtectedRoute>
                <DetailedViewPage url={API_BASE_URL} />
              </ProtectedRoute>} />
          <Route
            path="/playlists"
            element={
              <ProtectedRoute>
                <PlaylistsPage url={API_BASE_URL} />
              </ProtectedRoute>} />
          <Route
            path="/content/user"
            element={
              <ProtectedRoute>
                <UserContentPage url={API_BASE_URL} />
              </ProtectedRoute>} />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateContentPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;