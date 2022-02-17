// import { toggleLegend } from "../slice/chartSlice";
import { legendColors } from "../constants/constants";
import { MapData, ChartLegend } from "../types/common";
export const fetchJson = async (url: string) => {
  return await (await fetch(url)).json();
};

export const dataFormater = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
    style: "decimal",
    minimumFractionDigits: 2,
    // currency: "USD",
  }).format(value);
};

export const initLegendState = (ids: Array<string>) => {
  return ids?.reduce((obj: MapData, id, i) => {
    if (!obj[id]) {
      obj[id] = {};
    }
    obj[id] = {
      hide: false,
      color: legendColors[i],
    };
    return obj;
  }, {});
};
interface clickLegendEvent {
  dataKey: string;
  hide: boolean;
}
export const onClickLegend = (
  { payload }: { payload: clickLegendEvent },
  setState: Function
) => {
  const { dataKey, hide } = payload;
  setState((prev: ChartLegend) => {
    return {
      ...prev,
      [dataKey]: { ...prev[dataKey], hide: !hide },
    };
  });
};
