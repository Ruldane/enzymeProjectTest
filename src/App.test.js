import React from "react";
import App from "./App";
import AccountBalance from "./components/AccountBalance";
import Notification from './components/Notification';
import {mount, shallow} from "enzyme";

const userBalance = {
  balance: 1100,
  savingsBalance: 103
}

describe("rendering component", () => {
  it('should render withoutcrashing',  () => {
    shallow(<App />)
  });
  it('should render App compoentn with header',  () => {
    const wrapper = shallow(<App />);
    const header = ( <h1 className="has-text-centered title is-1">Welcome in the personal finance app!</h1>);
    expect(wrapper.contains(header)).toEqual(true);
  });
  it('renders Notification', () => {
    shallow(<Notification />)
  });
  it('should renders button', () => {
    const wrapper = mount(<AccountBalance accounts={userBalance} /> )
    const label = wrapper.find("#balance-button").text();
    expect(label).toEqual("Send 100$")
  });
});

describe("passing props", () => {
  const accountWrapper = mount(<AccountBalance accounts={userBalance} />);
  const notificationWrapper = mount(<Notification balanace={userBalance.balance} />);
  it('accept user account props',  () => {
    expect(accountWrapper.props().accounts).toEqual(userBalance);
  });
  it('contains savingBalance', () => {
    const value = accountWrapper.find(".savings").text();
    const expectedValue = userBalance.savingsBalance + "$";
    expect(value).toEqual(expectedValue);
  });
  it('notification accept props', () => {
    expect(notificationWrapper.props().balance).toEqual(userBalance.balance);
  });
})

describe("logic", () => {
  const wrapper = mount(<AccountBalance accounts={userBalance} /> );
  const notificationWrapper = mount(<Notification balanace={userBalance.balance} />)
  wrapper.find("#balance-button").simulate("click");
  it('should  button click saving',  () => {
    const savingsValue = wrapper.find(".savings").text();
    const expectedValue = userBalance.savingsBalance +100 + '$';
    expect(savingsValue).toEqual(expectedValue);
  });
  it('button click update balance',  () => {
    const balanceValue = wrapper.find(".balance").text();
    const expectedBalanceValue = userBalance -100 + '$';
    expect(balanceValue).toEqual=(expectedBalanceValue);
  });
})

