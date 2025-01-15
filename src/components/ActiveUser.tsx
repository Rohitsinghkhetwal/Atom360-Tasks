import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import axios from "axios";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ActiveUsersChart = () => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    fetchActiveUsersData();
  }, []);

  const fetchActiveUsersData = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/users");
      const userData = response.data.users.slice(0, 10);

      const labels = userData.map((items:any, index:any) => `User ${index + 1}`);
      const activeUsers = userData.map(() => Math.floor(Math.random() * 500));

      setChartData({
        labels,
        datasets: [
          {
            label: "Active Users",
            data: activeUsers,
            backgroundColor: "#ffffff",
            borderRadius: 5,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  return (
    <div className="p-4 bg-white rounded">
      <div className="bg-gray-900 p-4 rounded">
        {chartData ? <Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} /> : <p className="text-white">Loading chart...</p>}
      </div>

      <h2 className="text-lg font-semibold mt-4">Active Users</h2>
      <p className="text-gray-500">(+23%) than last week</p>

      <div className="flex justify-between mt-4">
        <div className="text-center">
          <span className="text-orange-500">Users</span>
          <p className="text-xl font-bold">36K</p>
        </div>
        <div className="text-center">
          <span className="text-blue-500">Clicks</span>
          <p className="text-xl font-bold">2m</p>
        </div>
        <div className="text-center">
          <span className="text-yellow-500">Sales</span>
          <p className="text-xl font-bold">435$</p>
        </div>
        <div className="text-center">
          <span className="text-pink-500">Items</span>
          <p className="text-xl font-bold">43</p>
        </div>
      </div>
    </div>
  );
};

export default ActiveUsersChart;
