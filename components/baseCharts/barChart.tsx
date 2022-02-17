import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { dataFormater } from "../../lib/util";

const CustomBarChart = ({ ids, data }: { ids: string[]; data: any }) => {
  return (
    <ResponsiveContainer>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis tickFormatter={dataFormater} style={{ fontSize: "0.8em" }} />
        <Tooltip />
        <Bar dataKey={ids[0]} fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;
