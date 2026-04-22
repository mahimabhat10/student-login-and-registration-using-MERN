import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/login", data);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        value={data.password}
        onChange={(e) => setData({ ...data, password: e.target.value })}
      />

      <button onClick={handleLogin}>Login</button>

      <p
        onClick={() => navigate("/register")}
        style={{
          cursor: "pointer",
          marginTop: "12px",
          color: "#4facfe",
          textAlign: "center"
        }}
      >
        Don’t have an account? Register
      </p>
    </div>
  );
}

export default Login;