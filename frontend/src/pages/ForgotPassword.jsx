import React, { useState } from "react";
import { Container, Text, Input, Button, VStack } from "@chakra-ui/react";
import { noTokenFetch } from "../helpers/fetch";
import Swal from "sweetalert2";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const resp = await noTokenFetch("api/forget", { email }, "POST");
    if (resp.ok) {
      Swal.fire("Instrucciones enviadas", `${resp.msg}`, "success");
      setEmail("");
    } else {
      Swal.fire("Error", `${resp.msg}`, "error");
    }
  };

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <Container p="5">
      <form onSubmit={onSubmit}>
        <VStack spacing={3}>
          <Text fontSize="xl" textAlign="center">
            Ingresa tu correo electrónico para enviar instrucciones para
            reestablecer tu contraseña.
          </Text>

          <Input
            type="email"
            name="email"
            placeholder="Tu correo"
            value={email}
            onChange={onChange}
            required
          ></Input>

          <Button type="submit" colorScheme="green">
            Enviar instrucciones para reestablecer contraseña
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ForgotPassword;
