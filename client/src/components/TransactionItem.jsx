import { useDispatch } from "react-redux";
import { deleteTransaction } from "../features/transactions/transactionSlice";
import { FaTimes } from "react-icons/fa";

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

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span
          style={{
            fontWeight: "bold",
            color: transaction.type === "income" ? "green" : "red",
          }}
        >
          {transaction.type === "income" ? "+" : "-"}{transaction.amount}
        </span>
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
