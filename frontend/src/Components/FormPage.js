import React, { useState, useEffect } from "react";
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
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
export default function FormPage() {
  const navigate = useNavigate();
  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [userID, setuserID] = useState("");
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    GetUser();
  }, [null]);

  async function GetUser() {
    let userName = window.location.pathname.split("form/")[1];
    setuserID(userName);
    if (userName) {
      setIsUser(true);
      setUserLoading(true);
      const response = await fetch(
        `http://localhost:8080/users/get/${userName}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setuserName(data.user.userName);
      setEmail(data.user.emailAdress);
      setFullName(data.user.FullName);
      setDateOfBirth(data.user.DateOfBirth);
      setPhoneNumber(data.user.phoneNumber);
      setUserLoading(false);
    }
  }
  async function handleSubmit() {
    setIsLoading(true);
    if (
      userName === "" &&
      email === "" &&
      fullName === "" &&
      dateOfBirth === "" &&
      phoneNumber === ""
    ) {
      setIsError("all");
    } else if (userName === "") {
      setIsError("userName");
    } else if (email === "") {
      setIsError("email");
    } else if (fullName === "") {
      setIsError("fullName");
    } else if (dateOfBirth === "") {
      setIsError("dateOfBirth");
    } else if (phoneNumber === "") {
      setIsError("phoneNumber");
    } else if (userID === undefined) {
      setIsError(false);
      const user = {
        userName: userName,
        phoneNumber: phoneNumber,
        emailAdress: email,
        DateOfBirth: dateOfBirth,
        FullName: fullName,
      };
      const response = await fetch(`http://localhost:8080/users/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const result = await response.json();
      console.log(result);
      if (result.result === true) {
        navigate("/result");
      } else {
        swal("", result.message, "error");
      }
    } else {
      setIsError(false);
      const user = {
        userName: userName,
        phoneNumber: phoneNumber,
        emailAdress: email,
        DateOfBirth: dateOfBirth,
        FullName: fullName,
      };
      const response = await fetch(
        `http://localhost:8080/users/update/${userID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      const result = await response.json();
      console.log(result);
      if (result.result === true) {
        navigate("/result");
      } else {
        swal("", result.message, "error");
      }
    }
    console.log(isUser);
    setIsLoading(false);
  }

  return (
    <div>
      {userLoading ? (
        <div className="loading">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </div>
      ) : null}
      <div className="main">
        <Card mt={5} borderRadius={"15px "} className="card">
          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box display={"flex"}>
                <Text fontSize={25} textAlign={"start"}>
                  {isUser ? "Edit User" : "Add User"}
                </Text>
              </Box>
              <Box>
                <FormControl
                  isInvalid={isError === "userName" || isError === "all"}
                >
                  <FormLabel>Username</FormLabel>
                  <Input
                    placeholder={"doe412"}
                    type="email"
                    value={userName}
                    onChange={(e) => {
                      setuserName(e.target.value);
                    }}
                  />
                  {isError === "userName" || isError === "all" ? (
                    <FormErrorMessage>Username is required.</FormErrorMessage>
                  ) : null}
                </FormControl>

                <FormControl
                  mt={5}
                  isInvalid={isError === "email" || isError === "all"}
                >
                  <FormLabel>Email</FormLabel>
                  <Input
                    placeholder={"doe@gmail.com"}
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  {isError === "email" || isError === "all" ? (
                    <FormErrorMessage>Email is required.</FormErrorMessage>
                  ) : null}
                </FormControl>

                <FormControl
                  mt={5}
                  isInvalid={isError === "fullName" || isError === "all"}
                >
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    placeholder={"Doe John"}
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                    }}
                  />
                  {isError === "fullName" || isError === "all" ? (
                    <FormErrorMessage>Full Name is required.</FormErrorMessage>
                  ) : null}
                </FormControl>
                <FormControl
                  mt={5}
                  isInvalid={isError === "dateOfBirth" || isError === "all"}
                >
                  <FormLabel>Date of Birth</FormLabel>
                  <Input
                    placeholder={"Doe John"}
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => {
                      setDateOfBirth(e.target.value);
                    }}
                  />
                  {isError === "dateOfBirth" || isError === "all" ? (
                    <FormErrorMessage>
                      Date of Birth is required.
                    </FormErrorMessage>
                  ) : null}
                </FormControl>
                <FormControl
                  mt={5}
                  isInvalid={isError === "phoneNumber" || isError === "all"}
                >
                  <FormLabel>Phone Number</FormLabel>
                  <Input
                    placeholder={"+120100000"}
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                    }}
                  />
                  {isError === "phoneNumber" || isError === "all" ? (
                    <FormErrorMessage>
                      Phone Number is required.
                    </FormErrorMessage>
                  ) : null}
                </FormControl>
              </Box>
              <Box textAlign={"end"}>
                <Button onClick={() => navigate("/")} mr={5} width={150}>
                  {" "}
                  Cancel
                </Button>{" "}
                <Button colorScheme="teal" onClick={handleSubmit} width={150}>
                  {isLoading ? <Spinner size="sm" mr={3} /> : null} Submit
                </Button>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
