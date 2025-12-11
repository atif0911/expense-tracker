import React, { useState } from "react";

function ExpenseSummary({ transactions }) {
  const [filter, setFilter] = useState("all"); // 'all', 'daily', 'weekly', 'monthly'

  // Helper: Get filtered transactions
  const getFilteredTransactions = () => {
    const today = new Date();

    return transactions.filter((transaction) => {
      const transDate = new Date(transaction.createdAt);

      if (filter === "daily") {
        // Check if date string matches today (e.g., "Wed Dec 10 2025")
        return transDate.toDateString() === today.toDateString();
      } else if (filter === "weekly") {
        // Check if date is within the last 7 days
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(today.getDate() - 7);
        return transDate >= oneWeekAgo;
      } else if (filter === "monthly") {
        // Check if month and year match today
        return (
          transDate.getMonth() === today.getMonth() &&
          transDate.getFullYear() === today.getFullYear()
        );
      }
      return true; // 'all' returns everything
    });
  };

  const filteredTransactions = getFilteredTransactions();

  // 1. Calculate Income (Based on filtered list)
  const income = filteredTransactions
    .filter((item) => item.type === "income")
    .reduce((acc, item) => acc + item.amount, 0)
    .toFixed(2);

  // 2. Calculate Expense (Based on filtered list)
  const expense = filteredTransactions
    .filter((item) => item.type === "expense")
    .reduce((acc, item) => acc + item.amount, 0)
    .toFixed(2);

  // 3. Calculate Balance
  const balance = (Number(income) - Number(expense)).toFixed(2);

  return (
    <div className="summary-container">
      {/* Filter Buttons */}
      <h1
        style={{ color: Number(balance) < 0 ? "#e74c3c" : "var(--text-color)" }}
      >
        Rs. {balance}
      </h1>
      <div className="filter-buttons">
        <button
          className={filter === "daily" ? "active" : ""}
          onClick={() => setFilter("daily")}
        >
          Daily
        </button>
        <button
          className={filter === "weekly" ? "active" : ""}
          onClick={() => setFilter("weekly")}
        >
          Weekly
        </button>
        <button
          className={filter === "monthly" ? "active" : ""}
          onClick={() => setFilter("monthly")}
        >
          Monthly
        </button>
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All Time
        </button>
      </div>

      <div style={{ marginTop: "15px" }}>
        <h4>{filter.charAt(0).toUpperCase() + filter.slice(1)} Balance</h4>
        <h1 style={{ color: Number(balance) >= 0 ? "black" : "red" }}>
          Rs. {balance}
        </h1>
      </div>

      <div className="inc-exp-container">
        <div>
          <h4>Income</h4>
          <p className="money plus">+Rs. {income}</p>
        </div>
        <div style={{ borderLeft: "1px solid #ccc", margin: "0 20px" }}></div>
        <div>
          <h4>Expense</h4>
          <p className="money minus">-Rs. {expense}</p>
        </div>
      </div>
    </div>
  );
}

export default ExpenseSummary;
