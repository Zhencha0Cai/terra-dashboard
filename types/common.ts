import { Item } from "@choc-ui/chakra-autocomplete";

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
