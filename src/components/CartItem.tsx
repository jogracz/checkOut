import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../context/CartContext";

interface CartItemProps {
  name: string;
  price: number;
  imageUrl: string;
  id: number;
}
const StyledCardItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: #444;
  padding: 30px;
  border-bottom: solid #ccc 1px;
  height: 170px;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    height: auto;
  }
`;
const StyledImage = styled.img`
  width: 100%;
  max-width: 200px;
  @media only screen and (max-width: 768px) {
    order: 3;
  }
`;
const StyledTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  flex-grow: 1;
  padding: 40px;
  line-height: 80%;
  border-right: 1px solid #ccc;
  @media only screen and (max-width: 1024px) {
    font-size: 20px;
  }
  @media only screen and (max-width: 768px) {
    font-size: 18px;
    border: 0;
    padding: 0;
    padding-bottom: 20px;
    order: 2;
  }
`;
const StyledDeleteWrapper = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #aaa;
  align-self: flex-start;
  @media only screen and (max-width: 768px) {
    align-self: flex-end;
    float: right;
    order: 1;
  }
`;
const StyledSelect = styled.select`
  margin-left: 10px;
  height: 26px;
  width: 50px;
  padding: 2px;
`;
const StyledLabelInput = styled.label`
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
  margin-left: 20px;
  @media only screen and (max-width: 768px) {
    order: 4;
    margin: 20px;
  }
`;
const StyledPrice = styled.p`
  margin: 10px;
  width: 60px;
  text-align: center;
  @media only screen and (max-width: 768px) {
    margin: 0;
    order: 5;
  }
`;

const CartItem = (props: CartItemProps) => {
  const { name, price, imageUrl, id } = props;
  const { selectedHotels, setSelectedHotels } = useContext(CartContext);
  const [days, setDays] = useState(2);
  const [totalPrice, setTotalPrice] = useState(
    Math.round(price * days * 100) / 100
  );
  const nightsRange = Array.from(Array(100).keys());

  useEffect(() => {
    setSelectedHotels((selectedHotels) =>
      selectedHotels.map((hotel) => {
        if (hotel.id === id) {
          return {
            ...hotel,
            days: days,
          };
        } else {
          return hotel;
        }
      })
    );
  }, [days, id, setSelectedHotels]);

  useEffect(() => {
    setTotalPrice(Math.round(price * days * 100) / 100);
  }, [days, price]);

  const handleDeleteClick = () => {
    setSelectedHotels(selectedHotels.filter((hotel) => hotel.id !== id));
  };

  return (
    <StyledCardItem>
      <StyledImage src={imageUrl} />
      <StyledTitle>{name}</StyledTitle>
      <StyledLabelInput>
        <span>Nights:</span>
        <StyledSelect
          defaultValue={2}
          onChange={(e) => setDays(Number(e.target.value))}
        >
          {nightsRange.map((number) => (
            <option key={number} value={number + 1}>
              {number + 1}
            </option>
          ))}
        </StyledSelect>
      </StyledLabelInput>
      <StyledPrice>{totalPrice} $</StyledPrice>
      <StyledDeleteWrapper>
        <FontAwesomeIcon
          icon={faTrash}
          onClick={handleDeleteClick}
          style={{ cursor: "pointer" }}
        />
      </StyledDeleteWrapper>
    </StyledCardItem>
  );
};

export default CartItem;
