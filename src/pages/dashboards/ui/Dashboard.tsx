import { useDashboardCartridgesCount } from "@pages/dashboards/api/useDashboardApi";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function Dashboard() {
  const { data } = useDashboardCartridgesCount();

  return (
    <div className="m-2 flex grow flex-wrap items-center justify-center border">
      <div className="flex h-[95%] w-[95%] justify-center px-3 py-3">
        <BarChart
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            aspectRatio: 1.618,
          }}
          responsive
          data={data}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="modelName" />
          <YAxis width="auto" />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="count"
            name={`Остатки склада`}
            fill="#8884d8"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
        </BarChart>
      </div>
    </div>
  );
}
