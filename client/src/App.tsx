import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Update from "./pages/Update";
import { Routes, Route } from "react-router-dom";
import useToken from "./utils/useToken";

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return (
      <Routes>
        <Route element={<Navbar token={token} />}>
          {["/", "/login"].map((path) => (
            <Route
              key={path}
              path={path}
              element={<Login setToken={setToken} />}
            />
          ))}
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    );
  }

  return (
    <Routes>
      <Route element={<Navbar token={token} />}>
        <Route path="/" element={<Dashboard token={token} />} />
        <Route path="/update" element={<Update />} />
      </Route>
    </Routes>
  );
}

export default App;
