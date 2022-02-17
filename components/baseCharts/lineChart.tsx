import React, { useState } from "react";
import {
  LineChart as Chart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  Label,
  ResponsiveContainer,
} from "recharts";
import { dataFormater, initLegendState, onClickLegend } from "../../lib/util";

interface ChartProps {
  ids: Array<string>;
  data: any;
  yLable: string;
}
const LineChart = ({ ids, data }: ChartProps) => {
  const [legend, setLegend] = useState(() => initLegendState(ids));
  console.log(data, "ii");
  return (
    <ResponsiveContainer>
      <Chart
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
        <YAxis domain={[0, "dataMax"]} tickFormatter={dataFormater} />
        <Tooltip />
        {ids.length > 1 ? (
          <>
            <Legend onClick={(event) => onClickLegend(event, setLegend)} />
            {ids.map((id: string, i: number) => {
              const { color, hide } = legend[id];
              return (
                <Line
                  key={id}
                  type="monotone"
                  dataKey={id}
                  stroke={color}
                  fill={color}
                  hide={hide}
                />
              );
            })}
          </>
        ) : (
          <Line
            key={ids[0]}
            type="monotone"
            dataKey={ids[0]}
            stroke={"#82ca9d"}
            fill={"#82ca9d"}
          />
        )}
        <Label value="Pages of my website" offset={0} position="top" />
      </Chart>
    </ResponsiveContainer>
  );
};

export default LineChart;
