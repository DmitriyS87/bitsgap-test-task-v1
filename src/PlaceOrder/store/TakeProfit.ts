import { observable, action } from "mobx";
import { mathRoundToDec } from "utils";
import { v4 } from 'uuid';

export type TakeProfitItemType = TakeProfit;

export type TakeProfitData = Pick<TakeProfitItemType, 'amount' | 'price' | 'profit'>

type TakeProfitError = Partial<Record<keyof TakeProfitData, string>>;

class TakeProfit {
    @observable profit: number = 0;
    @observable price: number = 0;
    @observable amount: number = 0;
    @observable id: string = "";
    @observable error: any = {};
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
    public setError(error: any) {
        this.error = error;
    }

    @action.bound
    public addError(error: any) {
        [...Object.keys(error)].forEach((name) => {
            this.error[name] = `${this.error[name] || ''} ${error[name] || ''}`.trim();
        })
    }

    @action.bound
    public setInitialState(state: TakeProfitData) {
        [...(Object.keys(state) as (keyof TakeProfitData)[])].forEach((key) => this[key] = state[key])
    }

    @action.bound
    public updateTargetPriceByMainPrice(price: number) {
        this.price = mathRoundToDec(price + price * this.profit / 100, 2);
    }

    @action.bound
    public updateAmount(amount: number) {
        this.setAmount(amount);
        this.store.countProjectedProfit();
    }

    @action.bound
    public updateProfit() {
        this.setProfit(mathRoundToDec((this.price / this.store.price - 1) * 100 || 0, 3));
        this.store.countProjectedProfit();
    }

    @action.bound
    public updateTargetPrice() {
        this.setPrice(mathRoundToDec(this.store.price + this.profit / 100 * this.store.price || 0, 2));
        this.store.countProjectedProfit();
    }

    @action.bound
    public validateState() {
        let error: TakeProfitError = {};

        if (this.profit < 0.01) {
            error.profit = "Minimum value is 0.01"
        }

        if (this.price <= 0) {
            error.price = "Price must be greater than 0"
        }

        this.setError(error);
    };

    public getFormValue = () => {
        return {
            id: this.id,
            price: this.price,
            amount: this.amount,
            profit: this.profit,
        }
    }
}

//

export { TakeProfit }
