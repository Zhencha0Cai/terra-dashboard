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
import { ChartProps } from "../../types/common";

const LineChart = ({
  ids,
  data,
  xAxisProps,
  yAxisProps,
  tooltipProps,
}: ChartProps) => {
  const [legend, setLegend] = useState(() => initLegendState(ids));
  return (
    <ResponsiveContainer debounce={1}>
      <Chart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 15,
        }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="date" {...xAxisProps} />
        <YAxis
          type="number"
          domain={[0, "auto"]}
          tickFormatter={dataFormater}
          style={{ fontSize: "0.9em" }}
          {...yAxisProps}
        />
        <Tooltip formatter={dataFormater} {...tooltipProps} />
        {ids.length > 1 ? (
          <>
            <Legend onClick={(event) => onClickLegend(event, setLegend)} />
            {ids.map((id: string) => {
              const { color, hide } = legend[id];
              return (
                <Line
                  key={id}
                  type="monotone"
                  dataKey={id}
                  stroke={color}
                  fill={color}
                  hide={hide}
                  dot={false}
                  strokeWidth={3}
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
            dot={false}
            strokeWidth={3}
          />
        )}
        <Label value="Pages of my website" offset={0} position="top" />
      </Chart>
    </ResponsiveContainer>
  );
};

export default LineChart;
