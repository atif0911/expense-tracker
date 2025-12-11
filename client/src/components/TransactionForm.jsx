import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTransaction,
  updateTransaction,
  editInactive,
} from "../features/transactions/transactionSlice";

function TransactionForm() {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("general");

  const dispatch = useDispatch();

  const { edit } = useSelector((state) => state.transactions);

  useEffect(() => {
    if (edit.isEdit === true) {
      setText(edit.transaction.text);
      setCategory(edit.transaction.category);
      setAmount(edit.transaction.amount);
      setType(edit.transaction.type);
    }
  }, [edit]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (edit.isEdit === true) {
      dispatch(
        updateTransaction({
          id: edit.transaction._id,
          transactionData: { text, category, amount: +amount, type },
        })
      );
    } else {
      dispatch(
        createTransaction({
          text,
          category,
          amount: +amount,
          type,
        })
      );
    }

    setText("");
    setCategory("general");
    setAmount(0);
    setType("expense");
  };

  const cancelEdit = () => {
    dispatch(editInactive());
    setText("");
    setCategory("general");
    setAmount(0);
    setType("expense");
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
            placeholder="e.g. Salary"
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="general">General</option>
            <option value="salary">Salary</option>
            <option value="rent">Rent</option>
            <option value="food">Food</option>
            <option value="entertainment">Entertainment</option>
            <option value="travel">Travel</option>
            <option value="others">Others</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
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
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        <div className="form-group" style={{ display: "flex", gap: "10px" }}>
          <button className="btn btn-block" type="submit">
            {edit.isEdit ? "Update Transaction" : "Add Transaction"}
          </button>

          {/* Show Cancel button only during edit */}
          {edit.isEdit && (
            <button
              type="button"
              className="btn btn-block"
              style={{ background: "#777", border: "#777" }}
              onClick={cancelEdit}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
export default TransactionForm;
