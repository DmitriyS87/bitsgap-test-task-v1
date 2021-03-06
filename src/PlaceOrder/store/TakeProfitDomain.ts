import { observable, action } from "mobx";
import { TAKE_PROFIT_MINIMUM_PRICE_VALUE, TAKE_PROFIT_MINIMUM_PROFIT_VALUE, TAKE_PROFIT_PRICE_DEC_PLACES, TAKE_PROFIT_PROFIT_DEC_PLACES } from "PlaceOrder/constants";
import { mathRoundToDec } from "utils";
import { v4 } from 'uuid';
import { PlaceOrderStore } from "./PlaceOrderStore";

export type TakeProfitItemType = TakeProfitDomain;

export type TakeProfitData = Pick<TakeProfitItemType, "amount" | "price" | "profit">

type TakeProfitError = Partial<Record<keyof TakeProfitData, string>>;

class TakeProfitDomain {
    @observable profit: number = 0;
    @observable price: number = 0;
    @observable amount: number = 0;
    @observable id: string = "";
    @observable error: TakeProfitError = {};
    store: PlaceOrderStore;

    constructor(store: PlaceOrderStore, initialState?: TakeProfitData, id: string = v4()) {
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
    public setError(error: TakeProfitError) {
        this.error = error;
    }

    @action.bound
    public addError(error: TakeProfitError) {
        ([...Object.keys(error)] as (keyof TakeProfitError)[]).forEach((name) => {
            this.error[name] = `${this.error[name] || ''} ${error[name] || ''}`.trim();
        })
    }

    @action.bound
    public setInitialState(state: TakeProfitData) {
        [...(Object.keys(state) as (keyof TakeProfitData)[])].forEach((key) => this[key] = state[key])
    }

    @action.bound
    public updateTargetPriceByMainPrice(price: number) {
        this.price = mathRoundToDec(price + price * this.profit / 100, TAKE_PROFIT_PRICE_DEC_PLACES);
    }

    @action.bound
    public updateAmount(amount: number) {
        this.setAmount(amount);
        this.store.countProjectedProfit();
    }

    @action.bound
    public updateProfit() {
        this.setProfit(mathRoundToDec((this.price / this.store.price - 1) * 100 || 0, TAKE_PROFIT_PROFIT_DEC_PLACES));
        this.store.countProjectedProfit();
    }

    @action.bound
    public updateTargetPrice() {
        this.setPrice(mathRoundToDec(this.store.price + this.profit / 100 * this.store.price || 0, TAKE_PROFIT_PRICE_DEC_PLACES));
        this.store.countProjectedProfit();
    }

    @action.bound
    public validateState() {
        let error: TakeProfitError = {};

        if (this.profit < TAKE_PROFIT_MINIMUM_PROFIT_VALUE) {
            error.profit = `Minimum value is ${TAKE_PROFIT_MINIMUM_PROFIT_VALUE}`
        }

        if (this.price <= TAKE_PROFIT_MINIMUM_PRICE_VALUE) {
            error.price = `Price must be greater than ${TAKE_PROFIT_MINIMUM_PRICE_VALUE}`
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

export { TakeProfitDomain }
