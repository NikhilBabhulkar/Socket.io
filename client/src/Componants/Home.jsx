import React from "react";
import "./Home.css";
import { Container, Box, Text,Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Login from "./Login";
import Signup from "./Signup";

function Home() {
  return (
    <Container className="home" maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="1g"
        borderWidth="1px"
      >
        <Text
          fontSize="4xl"
          fontFamily="work sans"
          color="black"
          textAlign="center"
        >
          Chat Application
        </Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="1g" borderWidth="1px">
        <Tabs variant="soft-rounded" >
          <TabList mb="1em">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sing Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
             {/* login  */}
             <Login />
            </TabPanel>
            <TabPanel>
             {/* signup   */}
             <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Home;
