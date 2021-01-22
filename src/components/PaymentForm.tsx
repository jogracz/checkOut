import React, { useEffect, useState } from "react";
import styled from "styled-components";

const StyledForm = styled.form`
  min-width: 300px;
  width: 40%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-top: 50px;
`;
interface InputProps {
  error: boolean;
}
const StyledInput = styled.input`
  width: 60%;
  height: 26px;
  font-size: 16px;
  padding: 5px;
  border-radius: 4px;
  border: 1px #888 solid;
  color: #444;
  border: ${(props: InputProps) => (props.error ? "1px red solid" : "auto")};
`;
const StyledLabelInput = styled.label`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media only screen and (max-width: 500px) {
    align-items: center;
    justify-content: center;
  }
`;
const StyledSubmitButton = styled.button`
  margin-top: 50px;
  width: 150px;
  height: 50px;
  font-size: 18px;
  cursor: pointer;
`;
const StyledErrorMessage = styled.p`
  height: 20px;
  color: red;
  font-size: 12px;
`;

const PaymentForm = () => {
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [mobile, setMobile] = useState(window.innerWidth < 500);
  const [errors, setErrors] = useState({
    name: "",
    adress: "",
    phone: "",
    email: "",
  });

  const handleWindowResize = () => {
    if (window.innerWidth < 500) {
      setMobile(true);
    } else setMobile(false);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  useEffect(() => {
    setDisableSubmit(false);
    Object.values(errors).forEach((value: string) => {
      if (value !== "") {
        setDisableSubmit(true);
      }
    });
  }, [errors]);

  const validate = (event: any, fieldName: string) => {
    event.target.checkValidity();
    setErrors((errors) => ({
      ...errors,
      [fieldName]: event.target.validationMessage,
    }));
  };

  return (
    <StyledForm>
      <StyledLabelInput>
        {!mobile && <span>Name:</span>}
        <StyledInput
          type="text"
          name="name"
          required
          minLength={3}
          onChange={(e) => {
            validate(e, "name");
          }}
          onBlur={(e) => validate(e, "name")}
          placeholder={mobile ? "Name" : undefined}
          error={errors.name !== ""}
        />
      </StyledLabelInput>
      <StyledErrorMessage>{errors.name}</StyledErrorMessage>
      <StyledLabelInput>
        {!mobile && <span>Address:</span>}
        <StyledInput
          type="text"
          name="adress"
          required
          onChange={(e) => {
            validate(e, "adress");
          }}
          onBlur={(e) => validate(e, "adress")}
          placeholder={mobile ? "Adress" : undefined}
          error={errors.adress !== ""}
        />
      </StyledLabelInput>
      <StyledErrorMessage>{errors.adress}</StyledErrorMessage>
      <StyledLabelInput>
        {!mobile && <span>Phone:</span>}
        <StyledInput
          type="text"
          name="phone"
          minLength={9}
          maxLength={9}
          onChange={(e) => {
            validate(e, "phone");
          }}
          onBlur={(e) => validate(e, "phone")}
          placeholder={mobile ? "Phone" : undefined}
          error={errors.phone !== ""}
        />
      </StyledLabelInput>
      <StyledErrorMessage>{errors.phone}</StyledErrorMessage>
      <StyledLabelInput>
        {!mobile && <span>Email:</span>}{" "}
        <StyledInput
          required
          type="email"
          name="email"
          onChange={(e) => {
            validate(e, "email");
          }}
          onBlur={(e) => {
            validate(e, "email");
          }}
          placeholder={mobile ? "Email" : undefined}
          error={errors.email !== ""}
        />
      </StyledLabelInput>
      <StyledErrorMessage>{errors.email}</StyledErrorMessage>

      <StyledSubmitButton disabled={disableSubmit} type="submit">
        PAY
      </StyledSubmitButton>
    </StyledForm>
  );
};

export default PaymentForm;
