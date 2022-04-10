import { Item } from "@choc-ui/chakra-autocomplete";
import { XAxisProps, TooltipProps, YAxisProps } from "recharts";
export interface MapData {
  [key: string]: any;
}

export interface ChartLegend {
  [id: string]: {
    color: string;
    hide: boolean;
  };
}
export interface SearchOptionParams {
  item: Item;
  selectMethod: "mouse" | "keyboard" | null;
  isNewInput?: boolean;
}

export interface CustomSearchProps {
  token: string;
  handleOnOptionSelect: (params: SearchOptionParams) => boolean | void;
}

export interface TokenAmount {
  amount: string | number;
  denom: string;
}

export interface ChartProps {
  ids: Array<string>;
  data: any;
  xAxisProps?: XAxisProps;
  yAxisProps?: YAxisProps;
  tooltipProps?: TooltipProps<string, string>;
  legendProps?: { content: (props: any) => JSX.Element };
}
