import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Register() {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const register = async () => {
    try {
      await API.post("/register", data);
      alert("Registered successfully");
      navigate("/");
    } catch (err) {
      alert("Error registering");
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>

      <input
        placeholder="Email"
        onChange={(e) => setData({ ...data, email: e.target.value })}
      />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setData({ ...data, password: e.target.value })}
      />

      <button onClick={register}>Register</button>
    </div>
  );
}

export default Register;