import React, { useState } from "react";
import {
  VStack,
  InputGroup,
  InputRightElement,
  Input,
  FormControl,
  FormLabel,
  Button,
  Box,
} from "@chakra-ui/react";

function Signup() {
  // State variables
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState("");
  const [picLoading, setpicloading] = useState(false);

  // Toggle password visibility
  const handleClick = () => setShowPassword(!showPassword);

  const PostDetail = (pics) => {
    setpicloading(true);
    if (pics === undefined) {
      alert("please select a single image");
      setpicloading(false);
    }

    if (
      pics.type === "image/png" ||
      pics.type === "image/jpeg" ||
      pics.type === "image/jpg"
    ) {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dnixu4d4g");
      fetch("https://api.cloudinary.com/v1_1/dnixu4d4g/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setpicloading(false);
          alert("pic uploaded successfully");
        })
        .catch((err) => {
          setpicloading(false);
          console.log("unable to upload pic");
        });
    } else {
      setpicloading(false);
      alert("Select the proper image extension eg:png/jpeg");
    }
  };

  // Handle form submission
  const submitHandler = async () => {
    const imageUrl = pic;
    try {
      // Continue with user registration
      const response = await fetch("http://localhost:5001/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          pic: imageUrl, // Now sending the full image URL
        }),
      });

      if (response.ok) {
        alert("User registered successfully");
        window.location.href = "/login"
        
      } else {
        console.error("User registration failed");
        // toast.error("User registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      // toast.error("Error during registration");
    }
  };

  return (
    <VStack spacing="5px" color="black">
      {/* Name input */}
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      {/* Email input */}
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      {/* Password input */}
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {showPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      {/* Confirm Password input */}
      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Your Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </FormControl>

      {/* Profile picture upload */}
      <FormControl id="pic" isRequired>
        <FormLabel>Upload Profile</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => PostDetail(e.target.files[0])}
        />
      </FormControl>

      {/* Signup button */}

      {picLoading ? (
        <Box>Loding</Box>
      ) : (
        <Button
          colorScheme="blue"
          width="100%"
          style={{ marginTop: 15 }}
          onClick={submitHandler}
        >
          Signup
        </Button>
      )}
    </VStack>
  );
}

export default Signup;
