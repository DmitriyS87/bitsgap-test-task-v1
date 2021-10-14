import { observable, computed, action, toJS } from "mobx";
import { mathRoundToDec } from "utils";

import { OrderSide } from "../model";
import { TakeProfit, TakeProfitData, TakeProfitItemType } from "./TakeProfit";

type PlaceOrderFormKeys = 'price' | 'amount' | 'projectedProfit' | 'takeProfits' | 'showError';

type PlaceOrderStoreError = Partial<Record<PlaceOrderFormKeys | 'profitSumm', string>>;

const defaultTakeProfit = {
  amount: 0,
  price: 0,
  profit: 0
}

export class PlaceOrderStore {
  @observable activeOrderSide: OrderSide = "buy";
  @observable isTakeProfitOn: boolean = false;
  @observable price: number = 0;
  @observable amount: number = 0;
  @observable projectedProfit: number = 0;
  @observable takeProfits: TakeProfitItemType[] = [];
  @observable showError: boolean = false;
  @observable error: boolean = false;

  @computed get takeProfitCount(): number {
    return this.takeProfits.length;
  }

  @computed get lastTakeProfit(): TakeProfitData {
    return this.takeProfitCount ? this.takeProfits[this.takeProfitCount - 1] : defaultTakeProfit;
  }

  @computed get total(): number {
    return this.price * this.amount;
  }

  @action.bound
  public addTakeProfit(initialData: TakeProfitData = this.newTakeProfitData(20, this.lastTakeProfit.profit + 2)) {
    const newTakeProfit = new TakeProfit(this, toJS(initialData),);
    this.takeProfits.push(newTakeProfit);
    this.recountAmount();
    this.countProjectedProfit();
  }

  @action.bound
  public clearTakeProfit() {
    this.takeProfits = [];
    this.projectedProfit = 0;
  }

  @action.bound
  public countProjectedProfit() {
    if (this.takeProfitCount === 0) return 0

    const isBuyOperation = this.activeOrderSide === "buy";

    if (this.takeProfitCount === 1) {
      const aloneTakeProfit = this.takeProfits[0];
      this.projectedProfit = mathRoundToDec(this.countTakeProfitResult(aloneTakeProfit, isBuyOperation), 4);
      return;
    }

    this.projectedProfit = mathRoundToDec(this.takeProfits.reduce((result, item) => result + this.countTakeProfitResult(item, isBuyOperation), 0), 4);
  }

  @action.bound
  public removeTakeProfit(id: string) {
    const idexOf = this.takeProfits.findIndex((item) => item.id === id);
    this.takeProfits.splice(idexOf, 1);
    this.countProjectedProfit();
  }

  @action.bound
  public setOrderSide(side: OrderSide) {
    this.activeOrderSide = side;
  }

  @action.bound
  public toggleTakeProfit() {
    if (this.isTakeProfitOn) {
      this.hideTakeProfitForm();
      return;
    }
    this.showTakeProfitForm();
  }

  @action.bound
  public hideTakeProfitForm() {
    this.isTakeProfitOn = false;
    this.clearTakeProfit();
  }

  @action.bound
  public showTakeProfitForm() {
    this.addTakeProfit(this.newTakeProfitData(100, 2))
    this.countProjectedProfit();
    this.isTakeProfitOn = true;
  }

  @action.bound
  public updateChildren() {
    this.takeProfits.forEach((item) => item.updateTargetPriceByMainPrice(this.price))
    this.countProjectedProfit();
  }

  @action.bound
  public setAmount(amount: number) {
    this.amount = amount;
  }

  @action.bound
  public setError(price: number) {
    this.price = price;
  }

  @action.bound
  public setPrice(price: number) {
    this.price = price;
  }

  @action.bound
  public setTotal(total: number) {
    this.amount = this.price > 0 ? total / this.price : 0;
  }

  @action.bound
  public recountAmount() {
    const summOfAmounts = this.countTakeProfitsTotalAmount();
    if (summOfAmounts > 100) {
      const item = this.getTakeProfitWithMaxAmount();
      item.setAmount(item.amount - (summOfAmounts - 100))
    }
  }

  @action.bound
  public validatePlaceOrder(): PlaceOrderStoreError {
    let error: PlaceOrderStoreError = {};

    if (this.takeProfitCount) {
      this.takeProfits.forEach((item) => item.validateState());

      const takeProfitsValues = this.takeProfits.map((item) => item.getFormValue())

      const takeProfitsProppertySumm = [...takeProfitsValues].reduce((summ, item) => {
        [...(Object.keys(item) as (keyof TakeProfitData | "id")[])].forEach((key) => { if (key !== "id") { summ[key] = (summ[key] || 0) + item[key] } })
        return summ;
      }, {} as TakeProfitData);

      const wrongProfitOrderStartIndex = takeProfitsValues.findIndex((item, idx, arr) => idx > 0 && item.profit < arr[idx - 1].profit)

      if (wrongProfitOrderStartIndex !== -1) {
        this.takeProfits.forEach((item, idx) => idx >= wrongProfitOrderStartIndex - 1 && item.addError({ profit: "Each target's profit should be greater than the previous one" }));
      }

      if (takeProfitsProppertySumm.profit > 500) {
        this.takeProfits.forEach((item) => item.addError({ profit: "Maximum profit sum is 500%" }));
      }

      if (takeProfitsProppertySumm.amount > 100) {
        this.takeProfits.forEach((item) => item.addError({ amount: ` "${takeProfitsProppertySumm.amount}% out of 100% selected. Please decrease by ${takeProfitsProppertySumm.amount - 100}%"` }));
      }


    }

    return error;
  };

  public countTakeProfitPrice(profit: number) {
    return this.price + this.price * profit / 100;
  }

  public countTakeProfitResult(takeProfit: TakeProfit, isBuyOperation = false) {
    return this.amount * (isBuyOperation ? 1 : -1) * (takeProfit.price - this.price) * takeProfit.amount / 100;
  }

  public countTakeProfitsTotalAmount() {
    return this.takeProfits.reduce((a, i) => a + i.amount, 0)
  }


  public getFormValue = () => {
    if (this.isTakeProfitOn && this.takeProfitCount) {
      return {
        activeOrderSide: this.activeOrderSide,
        price: this.price,
        amount: this.amount,
        total: this.total,
        projectedProfit: this.projectedProfit,
        takeProfits: this.takeProfits.map((item) => item.getFormValue())
      }
    }

    return {
      activeOrderSide: this.activeOrderSide,
      price: this.price,
      amount: this.amount,
      total: this.total,
    }
  }

  public getTakeProfitWithMaxAmount() {
    return this.takeProfits.reduce((result, item) => result.amount < item.amount ? item : result)
  }

  public newTakeProfitData(amount: number = 20, profit: number = 0): TakeProfitData {
    return {
      amount: amount,
      price: this.countTakeProfitPrice(profit),
      profit: profit
    }
  }

  public updateAmount = (amount: number) => {
    this.setAmount(amount);
    this.countProjectedProfit();
  }

}
