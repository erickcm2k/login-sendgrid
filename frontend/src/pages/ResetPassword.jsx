import React, { useEffect, useState } from "react";
import { Container, Text, Input, Button, VStack } from "@chakra-ui/react";
import { noTokenFetch } from "../helpers/fetch";
import Swal from "sweetalert2";
import { useSearchParams } from "react-router-dom";

const ForgotPassword = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const mail = searchParams.get("email");
    setEmail(mail);
  }, [searchParams]);

  const [form, setForm] = useState({
    authCode: "",
    password1: "",
    password2: "",
  });
  const onChange = ({ target }) => {
    const { name, value } = target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    let password = "";
    if (form.password1 === form.password2) {
      password = form.password1;

      const resp = await noTokenFetch(
        "api/reset",
        { authCode: form.authCode, email, password },
        "POST"
      );
      if (resp.ok) {
        const { user } = resp;
        Swal.fire(
          "Contraseña reestablecida correctamente",
          `${resp.msg}`,
          "success"
        );
        localStorage.setItem("token", user.token);
        localStorage.setItem("email", user.email);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        Swal.fire("Error", `${resp.msg}`, "error");
      }
    } else {
      Swal.fire("Error", `Las contraseñas deben ser iguales`, "error");
    }
  };

  return (
    <Container p="5">
      <form onSubmit={onSubmit}>
        <VStack spacing={3}>
          <Text fontSize="xl" textAlign="center">
            Ingresa tu código.
          </Text>

          <Input
            type="text"
            name="authCode"
            placeholder="Código de verificación"
            value={form.authCode}
            onChange={onChange}
            required
          ></Input>
          <Input
            type="password"
            name="password1"
            placeholder="Nueva contraseña"
            value={form.password1}
            onChange={onChange}
            required
          ></Input>
          <Input
            type="password"
            name="password2"
            placeholder="Repite tu nueva contraseña"
            value={form.password2}
            onChange={onChange}
            required
          ></Input>

          <Button type="submit" colorScheme="green">
            Reestablecer contraseña
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ForgotPassword;
