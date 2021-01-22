import React from "react";
import styled from "styled-components";
import CartItem from "./CartItem";
import loadingHotel from "../images/loadingHotel.jpeg";

const StyledLoading = styled.div`
  min-height: ${window.innerHeight}px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
`;

const Loading = () => {
  return (
    <StyledLoading>
      <CartItem
        name="Loading Hotel Paradise"
        price={45}
        id={1}
        imageUrl={loadingHotel}
      />
    </StyledLoading>
  );
};

export default Loading;
