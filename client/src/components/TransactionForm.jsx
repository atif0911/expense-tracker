import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTransaction } from "../features/transactions/transactionSlice";

function TransactionForm() {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("income");

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(
      createTransaction({
        text,
        amount: +amount,
        type,
      })
    );

    setText("");
    setAmount(0);
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Transaction Name</label>
          <input
            type="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="e.g. Salary, Rent, Coffee"
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount (Rs. )</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Type</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Add Transaction
          </button>
        </div>
      </form>
    </section>
  );
}
export default TransactionForm;
