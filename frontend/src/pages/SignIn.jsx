import { Button } from "@chakra-ui/button";
import { Container, Input, Text, VStack, Box } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../auth/AuthContext";

const Login = () => {
  const { signIn } = useContext(AuthContext);

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

    const { password, email } = form;
    const { ok, msg } = await signIn(email, password);
    if (!ok) {
      Swal.fire("Error", `${msg}`, "error");
    }
  };

  const completeFields = () => {
    return form.password.length && form.password.email > 0 ? true : false;
  };
  return (
    <Box backgroundSize="100vw" height="100vh">
      <Container p="5">
        <form onSubmit={onSubmit}>
          <VStack spacing={3}>
            <Text fontSize="xl" fontWeight="bold" textAlign="center">
              Inicia sesión en nuestra app
            </Text>

            <Input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={form.email}
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
              <Link to="/auth/signup">No tengo cuenta</Link>
            </Button>

            <Button variant="link" colorScheme="red">
              <Link to="/auth/forgot">Olvidé mi contraseña</Link>
            </Button>

            <Button
              type="submit"
              colorScheme="green"
              disabled={!completeFields()}
            >
              Iniciar sesión
            </Button>
          </VStack>
        </form>
      </Container>
    </Box>
  );
};

export default Login;
