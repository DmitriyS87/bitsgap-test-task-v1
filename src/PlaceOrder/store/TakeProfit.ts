import { observable, action } from "mobx";
import { mathRoundToDec } from "utils";
import { v4 } from 'uuid';

export type TakeProfitItemType = TakeProfit;

export type TakeProfitData = Pick<TakeProfitItemType, 'amount' | 'price' | 'profit'>

class TakeProfit {
    @observable profit: number = 0;
    @observable price: number = 0;
    @observable amount: number = 0;
    @observable id: string = "";
    store: any;

    constructor(store: any, initialState?: TakeProfitData, id: string = v4()) {
        this.store = store;
        this.id = id;
        initialState && this.setInitialState(initialState);
    }

    @action.bound
    public setPrice(price: number) {
        this.price = price;
    }

    @action.bound
    public setAmount(amount: number) {
        this.amount = amount;
    }

    @action.bound
    public setProfit(profit: number) {
        this.profit = profit;
    }

    @action.bound
    public setInitialState(state: TakeProfitData) {
        [...(Object.keys(state) as (keyof TakeProfitData)[])].forEach((key) => this[key] = state[key])
    }

    @action.bound
    public updateTargetPriceByMainPrice(price: number) {
        this.price = Math.floor(price + price * this.profit / 100);
    }

    @action.bound
    public updateAmount(amount: number) {
        this.setAmount(amount);
        this.store.countProjectedProfit();
    }

    @action.bound
    public updateProfit() {
        this.setProfit(Math.floor((this.price / this.store.price - 1) * 100));
        this.store.countProjectedProfit();
    }

    @action.bound
    public updateTargetPrice() {
        this.setPrice(mathRoundToDec(this.store.price + this.profit / 100 * this.store.price, 2));
        this.store.countProjectedProfit();
    }
}

//

export { TakeProfit }
