import React from "react";
import {
  Card,
  Input,
  CardBody,
  StackDivider,
  Box,
  FormErrorMessage,
  FormControl,
  Button,
  Text,
  Stack,
  FormLabel,
  Spinner,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
export default function ResultPage() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="main">
        <Stack display={"flex"} alignItems={"center"}>
          <Box>
            <Card
              width={400}
              height={550}
              borderRadius={"0px 0px 15px 15px "}
              className="card"
            >
              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    textAlign={"center"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <img width={250} src={"/assets/check.png"} />
                    <Text
                      marginTop={"50px"}
                      fontSize={"40px"}
                      fontWeight={900}
                      color={"#88B04B"}
                    >
                      Success
                    </Text>
                    <Text fontSize={"17px"} fontWeight={700} color={"#009045"}>
                      User saved Successfully!
                    </Text>
                  </Box>
                </Stack>
                <Button
                  mt={5}
                  onClick={() => navigate("/")}
                  colorScheme="green"
                >
                  Home Page
                </Button>
              </CardBody>
            </Card>
          </Box>
        </Stack>
      </div>
    </div>
  );
}
