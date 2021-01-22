import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Cart from "./components/Cart";
import CartContextProvider from "./context/CartContext";
import PaymentForm from "./components/PaymentForm";
import styled from "styled-components";

const StyledApp = styled.div`
  color: #444;
  display: flex;
  min-height: ${window.innerHeight};
  padding: 5%;
  justify-content: center;
`;

function App() {
  return (
    <CartContextProvider>
      <StyledApp>
        <Router>
          <Switch>
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/payment" component={PaymentForm} />
          </Switch>
        </Router>
      </StyledApp>
    </CartContextProvider>
  );
}

export default App;
