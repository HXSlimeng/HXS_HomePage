export type Icategorys = "food" | "clothes" | "entertainment" | "traffic" | "daily" | "others" | "allin";
export type IcategorysObj = { date: null | string | Date } & Record<Icategorys, number | null>;
export type IcategorysObjArr = { label: string; prop: Icategorys; icon: string }[];
