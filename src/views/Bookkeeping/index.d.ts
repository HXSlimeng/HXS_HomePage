import { CateValues } from "./allDataIns";

export type Icategorys = "food" | "clothes" | "entertainment" | "traffic" | "daily" | "others";
export type IcategorysObj = Record<Icategorys, CateValues>;
export type IcategorysObjArr = { label: string; prop: Icategorys; icon: string }[];
