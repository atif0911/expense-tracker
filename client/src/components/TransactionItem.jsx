import { useDispatch } from "react-redux";
import {
  deleteTransaction,
  editActive,
} from "../features/transactions/transactionSlice";
import { FaTimes, FaEdit } from "react-icons/fa";

function TransactionItem({ transaction }) {
  const dispatch = useDispatch();

  return (
    <div className={`transaction-item Rs. {transaction.type}`}>
      <div>
        <h4>{transaction.text}</h4>
        {/* Format the date nicely */}
        <p style={{ fontSize: "0.8rem", color: "#777" }}>
          {new Date(transaction.createdAt).toLocaleDateString("en-US")}
        </p>
      </div>
      <span
        style={{
          fontSize: "0.7rem",
          background: "#eee",
          padding: "2px 5px",
          borderRadius: "4px",
          color: "#555",
          marginRight: "5px",
        }}
      >
        {transaction.category ? transaction.category.toUpperCase() : "GENERAL"}
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span
          style={{
            fontWeight: "bold",
            color: transaction.type === "income" ? "green" : "red",
          }}
        >
          {transaction.type === "income" ? "+" : "-"}Rs. {transaction.amount}
        </span>
        {/* EDIT BUTTON */}
        <button
          onClick={() => dispatch(editActive(transaction))}
          className="edit-btn"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            marginRight: "5px",
          }}
        >
          <FaEdit color="var(--text-color)" cursor="pointer" />
        </button>
        <button
          onClick={() => dispatch(deleteTransaction(transaction._id))}
          className="close"
        >
          <FaTimes color="red" cursor="pointer" />
        </button>
      </div>
    </div>
  );
}

export default TransactionItem;
