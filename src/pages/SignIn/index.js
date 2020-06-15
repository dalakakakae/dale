import { Form } from "@unform/web";
import React, { useRef, useEffect } from "react";
import {
  Container,
  FormStyled,
  InputStyled,
  PannelRight,
  Submit,
  Title,
} from "./styles";

import { useLazyQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useHistory } from "react-router-dom";

const PLANET = gql`
  query MyQuery($email: String!, $password: String!) {
    users(where: { email: { _eq: $email }, pass: { _eq: $password } }) {
      name
      id
      type
    }
  }
`;

const SignUpPage = () => {
  const formRef = useRef(null);
  const [getUser, { data }] = useLazyQuery(PLANET);
  const history = useHistory();

  async function handleSubmit(value) {
    try {
      getUser({
        variables: {
          email: value.email,
          password: value.password,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    
    if (data && data.users[0]) {
      localStorage.setItem("@raizs/user", JSON.stringify(data.users[0]));

      history.push("/shop");
    } else {
      console.log("erro");
    }
  }, [data]);

  return (
    <Container>
      <img className="logo" src={""} alt="" />
      <img className="background" src={""} alt="" />

      <Title>
        <img src={""} alt="" />
        <h1>LOGIN</h1>
      </Title>
      <PannelRight>
        <img className="logo_form" src={""} alt="" />
        <FormStyled>
          <Form ref={formRef} onSubmit={handleSubmit} method="POST">
            <label>EMAIL</label>
            <InputStyled name="email" type="email" />
            <label>Senha</label>
            <InputStyled name="password" type="password" />
            <Submit type="submit" value="ENTRAR" />
          </Form>
        </FormStyled>
      </PannelRight>
    </Container>
  );
};

export default SignUpPage;
