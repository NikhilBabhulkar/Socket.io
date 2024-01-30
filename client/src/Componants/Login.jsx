import React, { useState } from "react";
import {
  VStack,
  InputGroup,
  InputRightElement,
  Input,
  FormControl,
  FormLabel,
  Button,
} from "@chakra-ui/react";

// Utility function for API calls
const apiCall = async (url, method, body) => {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (response.ok) {
      return data; // Successful response
    } else {
      throw new Error(data.message || 'Request failed');
    }
  } catch (error) {
    throw new Error(error.message || 'Request failed');
  }
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => setShowPassword(!showPassword);

  const submitHandler = async () => {
    try {
      const data = await apiCall('http://localhost:5001/api/user/login', 'POST', { email, password });
      console.log('Login successful:', data);
      // Handle success as needed (e.g., set user state, redirect)
    } catch (error) {
      console.error('Login failed:', error.message);
      // Handle error (e.g., display error message)
    }
  };

  const getGuestUserCredentials = async () => {
    try {
      const data = await apiCall('http://127.0.0.1:5001/api/guest-user', 'GET');
      console.log('Guest User Credentials:', data);
      // Handle success as needed (e.g., display guest user credentials)
    } catch (error) {
      console.error('Failed to get guest user credentials:', error.message);
      // Handle error (e.g., display error message)
    }
  };

  return (
    <VStack spacing="5px" color="black">
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          autoComplete="off"
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem" autoComplete="off">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {showPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Login
      </Button>

      <Button
        colorScheme="red"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={getGuestUserCredentials}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
}

export default Login;
