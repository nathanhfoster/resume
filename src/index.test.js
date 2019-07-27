import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch } from "react-router-dom";
import App from "./App";
import { expect } from "chai";
import { shallow, mount } from "enzyme";
import sinon from "sinon";
import NavBar from "./components/NavBar";
import BackgroundImage from "./components/BackgroundImage";
import Footer from "./components/Footer";
import { getState } from "./store/persist";
import storeFactory from "./store";
const initialState = getState();
const ReduxStore = storeFactory(initialState);

describe("<App />", () => {
  it("renders <App /> with <NavBar />, <BackgroundImage />, <Switch />, <NavItem /> components", () => {
    const wrapper = mount(
      <Provider store={ReduxStore}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    expect(wrapper.find(NavBar)).to.have.lengthOf(1);
    expect(wrapper.find(BackgroundImage)).to.have.lengthOf(1);
    expect(wrapper.find(Switch)).to.have.lengthOf(1);
    expect(wrapper.find(Footer)).to.have.lengthOf(1);
  });

  // it("renders an `.icon-star`", () => {
  //   const wrapper = shallow(<App />);
  //   expect(wrapper.find(".icon-star")).to.have.lengthOf(1);
  // });

  // it("renders children when passed in", () => {
  //   const wrapper = shallow(
  //     <App>
  //       <div className="unique" />
  //     </App>
  //   );
  //   expect(wrapper.contains(<div className="unique" />)).to.equal(true);
  // });

  // it("simulates click events", () => {
  //   const onButtonClick = sinon.spy();
  //   const wrapper = shallow(<Foo onButtonClick={onButtonClick} />);
  //   wrapper.find("button").simulate("click");
  //   expect(onButtonClick).to.have.property("callCount", 1);
  // });
});
