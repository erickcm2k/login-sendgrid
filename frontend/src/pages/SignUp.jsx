import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Button } from "@chakra-ui/button";
import { Container, Input, Text, VStack, Box } from "@chakra-ui/react";
import { AuthContext } from "../auth/AuthContext";

const SignIn = () => {
  const { register } = useContext(AuthContext);

  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
  });

  const onChange = ({ target }) => {
    const { name, value } = target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();

    const { username, password, email } = form;
    const msg = await register(username, email, password);

    if (!msg) {
      Swal.fire("Error", msg, "error");
    }
  };

  const completeFields = () => {
    return form.username.length > 0 && form.password.length > 0 ? true : false;
  };

  return (
    <Box backgroundSize="100vw" height="100vh">
      <Container p="5">
        <form onSubmit={onSubmit}>
          <VStack spacing={3}>
            <Text fontSize="xl" fontWeight="bold" textAlign="center">
              Crea una cuenta nueva en nuestra app
            </Text>

            <Input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={form.email}
              onChange={onChange}
            />
            <Input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={onChange}
            />

            <Input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={onChange}
            />

            <Button variant="link" colorScheme="blue">
              <Link to="/auth/signin">Ya tengo una cuenta</Link>
            </Button>

            <Button
              type="submit"
              colorScheme="green"
              disabled={!completeFields()}
            >
              Crear cuenta
            </Button>
          </VStack>
        </form>
      </Container>
    </Box>
  );
};

export default SignIn;
