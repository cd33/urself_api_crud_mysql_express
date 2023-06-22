import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Routes, Route } from "react-router-dom";
import useToken from "./utils/useToken";

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return (
      <Routes>
        <Route element={<Navbar />}>
          {['/', '/login'].map(path => <Route key={path} path={path} element={<Login setToken={setToken} />} />)}
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    );
  }

  return (
    <Routes>
      <Route element={<Navbar />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
