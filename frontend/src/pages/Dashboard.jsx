import { useEffect, useState } from "react";
import API from "../api";
import "../App.css";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [data, setData] = useState({
    title: "",
    amount: "",
    category: ""
  });

  const fetchExpenses = async () => {
    try {
      const res = await API.get("/expenses");
      setExpenses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addExpense = async () => {
    try {
      await API.post("/expense", data);
      setData({ title: "", amount: "", category: "" });
      fetchExpenses();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="container">
      
      {/* 🔴 LOGOUT BUTTON */}
      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
        style={{ background: "#ef4444", marginBottom: "15px" }}
      >
        Logout
      </button>

      <h2>Dashboard</h2>

      <input
        placeholder="Title"
        value={data.title}
        onChange={(e) => setData({ ...data, title: e.target.value })}
      />

      <input
        placeholder="Amount"
        value={data.amount}
        onChange={(e) => setData({ ...data, amount: e.target.value })}
      />

      <input
        placeholder="Category"
        value={data.category}
        onChange={(e) => setData({ ...data, category: e.target.value })}
      />

      <button onClick={addExpense}>Add Expense</button>

      <div className="expense-list">
        <h3>Expenses</h3>
        {expenses.map((e) => (
          <div className="expense-item" key={e._id}>
            <b>{e.title}</b> — ₹{e.amount}
            <div style={{ fontSize: "12px", opacity: 0.7 }}>
              {e.category}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;