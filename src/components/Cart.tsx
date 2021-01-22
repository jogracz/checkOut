import React, { useContext } from "react";
import styled from "styled-components";
import CartItem from "./CartItem";
import { CartContext } from "../context/CartContext";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import ErrorPage from "./ErrorPage";
const StyledCart = styled.div`
  background-color: #fff;
  width: 90%;
`;
const StyledBottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  margin-top: 20px;
`;
const StyledTotalPrice = styled.h2``;
const StyledBuyButton = styled.button`
  width: 200px;
  height: 70px;
  font-size: 18px;
  cursor: pointer;
  color: #444;
  @media only screen and (max-width: 768px) {
    width: 150px;
    height: 50px;
  }
`;

const Cart = () => {
  const { selectedHotels, totalPrice, loading, errorCode } = useContext(
    CartContext
  );

  if (errorCode) {
    return <ErrorPage errorCode={errorCode} />;
  } else if (loading) {
    return <Loading />;
  } else {
    return (
      <StyledCart>
        {selectedHotels.map((hotel, index) => (
          <CartItem
            key={index}
            name={hotel.name}
            price={hotel.price}
            imageUrl={hotel.imageUrl}
            id={hotel.id}
          />
        ))}
        <StyledBottomWrapper>
          <StyledTotalPrice>{totalPrice} $</StyledTotalPrice>
          <Link to="/payment">
            <StyledBuyButton>BUY</StyledBuyButton>
          </Link>
        </StyledBottomWrapper>
      </StyledCart>
    );
  }
};
export default Cart;
