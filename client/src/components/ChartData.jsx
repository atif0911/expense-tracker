import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function ChartData({ transactions }) {
  const income = transactions
    .filter((item) => item.type === "income")
    .reduce((acc, item) => acc + item.amount, 0);

  const expense = transactions
    .filter((item) => item.type === "expense")
    .reduce((acc, item) => acc + item.amount, 0);

  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Amount in Rs.",
        data: [income, expense],
        backgroundColor: [
          "#2ecc71", // Green for Income
          "#c0392b", // Red for Expense
        ],
        borderColor: ["#2ecc71", "#c0392b"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: "var(--text-color)",
        },
      },
    },
  };
  return (
    <div style={{ width: "300px", margin: "20px auto" }}>
      <h3 style={{ textAlign: "center", marginBottom: "10px" }}>Analysis</h3>
      {/* Only show chart if there is data, otherwise it looks empty */}
      {income > 0 || expense > 0 ? (
        <Doughnut data={data} options={options} />
      ) : (
        <p style={{ textAlign: "center", color: "#777" }}>No data to chart</p>
      )}
    </div>
  );
}

export default ChartData;
