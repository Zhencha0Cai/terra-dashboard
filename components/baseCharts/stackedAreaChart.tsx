import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { dataFormater, initLegendState, onClickLegend } from "../../lib/util";
import { ChartProps } from "../../types/common";

const StackedAreaChart = ({ ids, data, yAxisProps }: ChartProps) => {
  const [legend, setLegend] = useState(() => initLegendState(ids));
  return (
    <ResponsiveContainer>
      <AreaChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 15,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis
          tickFormatter={dataFormater}
          {...yAxisProps}
          style={{ fontSize: "0.8em" }}
        />
        <Tooltip formatter={dataFormater} />
        <Legend onClick={(event) => onClickLegend(event, setLegend)} />{" "}
        {ids.map((id) => {
          const { color, hide } = legend[id];
          return (
            <Area
              key={id}
              type="monotone"
              dataKey={id}
              stroke={color}
              fill={color}
              hide={hide}
            />
          );
        })}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default StackedAreaChart;
