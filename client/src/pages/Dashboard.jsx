import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getTransactions,
  reset,
} from "../features/transactions/transactionSlice";
import TransactionForm from "../components/TransactionForm";
import TransactionItem from "../components/TransactionItem";
import ExpenseSummary from "../components/ExpenseSummary";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { transactions, isLoading, isError, message } = useSelector(
    (state) => state.transactions
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    } else {
      // Only fetch if we have a user
      dispatch(getTransactions());
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Your Financial Dashboard</p>
      </section>

      <ExpenseSummary transactions={transactions} />

      <TransactionForm />

      <section className="content">
        {transactions.length > 0 ? (
          <div className="transactions">
            {transactions.map((transaction) => (
              <TransactionItem
                key={transaction._id}
                transaction={transaction}
              />
            ))}
          </div>
        ) : (
          <h3>You have no transactions</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;
