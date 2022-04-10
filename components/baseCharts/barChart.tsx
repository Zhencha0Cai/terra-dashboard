import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { dataFormater } from "../../lib/util";
import { ChartProps } from "../../types/common";

const CustomBarChart = ({ ids, data, yAxisProps }: ChartProps) => {
  return (
    <ResponsiveContainer>
      <BarChart data={data} margin={{ left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis
          tickFormatter={dataFormater}
          style={{ fontSize: "0.9em" }}
          {...yAxisProps}
        />
        <Tooltip formatter={dataFormater} />
        <Bar dataKey={ids[0]} fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;
