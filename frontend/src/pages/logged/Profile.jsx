import React, { useContext } from "react";
import { Container, Text, Input, Button, VStack } from "@chakra-ui/react";
import { AuthContext } from "../../auth/AuthContext";

const Profile = () => {
  const { auth } = useContext(AuthContext);
  return (
    <Container p="5">
      <Text fontSize="md" textAlign="center" fontWeight={'bold'}>
        Inicio de nuestra app
      </Text>

      <h1>{`Hola de nuevo, ${auth.username}`}</h1>
    </Container>
  );
};

export default Profile;
