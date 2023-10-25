import { Icategorys, IcategorysObj } from ".";

export class CateValues {
    valueArr: number[] = [];
    constructor() { }
    add(num: number) {
        this.valueArr.push(num);
    }
    remove(i: number) {
        this.valueArr.splice(i, 1);
    }
    get value() {
        return this.valueArr.reduce((a, b) => a + b, 0);
    }
}

export class allCateData {
    allData: CategorysObj[] = [];
    constructor() { }
    get summation(): { [k in Icategorys]: number } {
        let result: any = {};
        return this.allData.reduce((pre, curr) => {
            Object.entries(curr.cateObj).forEach(([key, sgCtDt]) => {
                Reflect.get(pre, key) ? (pre[key] += (sgCtDt as CateValues).value) : Reflect.set(pre, key, (sgCtDt as CateValues).value);
            });
            return pre;
        }, result);
    }
    get allin() {
        return this.allData.reduce((pre, curr) => pre + curr.allin, 0)
    }
    get compData() {
        return this.allData.sort((a, b) => new Date(<string>a.date).getTime() - new Date(<string>b.date).getTime());
    }
}

export class CategorysObj {
    constructor(public date: string | number | Date, public cateObj: IcategorysObj) {

    }
    get allin() {
        return Object.values(this.cateObj).reduce((pre, curr) => pre + curr.value, 0)
    }

}