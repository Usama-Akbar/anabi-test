import React, { useState, useEffect } from "react";
import "../Styles/Home.css";
import {
  Card,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  InputGroup,
  Input,
  InputLeftElement,
  CardBody,
  StackDivider,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Text,
  Stack,
  IconButton,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Search2Icon } from "@chakra-ui/icons";
import swal from "sweetalert";

export default function HomePage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  async function getUsers() {
    setIsLoading(true);
    const response = await fetch("http://localhost:8080/users/list");
    const data = await response.json();
    setUsers(data.users);
    setFilteredUsers(data.users);
    console.log(data.users);
    setIsLoading(false);
  }
  useEffect(() => {
    if (searchQuery.length > 0) {
      const filteredUsers = users.filter(
        (user) =>
          (user.userName &&
            user.userName.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (user.fullName &&
            user.fullName.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredUsers(filteredUsers);
      console.log(filteredUsers);
    } else {
      setFilteredUsers(users);
    }
  }, [searchQuery]);

  useEffect(() => {
    getUsers();
  }, [null]);

  return (
    <div>
      <div className="main">
        <Box textAlign={"end"}>
          <Button
            onClick={() => navigate(`/form`)}
            colorScheme="green"
            variant="solid"
          >
            + Add User
          </Button>
        </Box>
        <Card mt={5} borderRadius={"15px 15px 0px 0px "} className="card">
          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box display={"flex"} justifyContent={"space-between"}>
                <Text fontSize={25} textAlign={"start"}>
                  Users List
                </Text>
                <InputGroup width={250}>
                  <InputLeftElement pointerEvents="none">
                    <Search2Icon color="gray.300" />
                  </InputLeftElement>
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    type="tel"
                    placeholder="Search By Username"
                  />
                </InputGroup>
              </Box>
            </Stack>
          </CardBody>
        </Card>

        <Card borderRadius={"0px 0px 15px 15px "} className="card">
          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Username</Th>
                        <Th>Full Name</Th>
                        <Th>Phone Number</Th>
                        <Th>Email</Th>
                        <Th>Date Of Birth</Th>
                        <Th>Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {!isLoading
                        ? filteredUsers.map((user) => (
                            <Tr key={user._id}>
                              <Td>{user.userName}</Td>
                              <Td>{user.FullName}</Td>
                              <Td>{user.phoneNumber}</Td>
                              <Td>{user.emailAdress}</Td>
                              <Td>{user.DateOfBirth}</Td>
                              <Td>
                                <Menu>
                                  <MenuButton
                                    as={IconButton}
                                    aria-label="Options"
                                    icon={<BsThreeDotsVertical />}
                                    variant="outline"
                                  />

                                  <MenuList>
                                    <MenuItem
                                      onClick={() =>
                                        navigate(`/form/${user.userName}`)
                                      }
                                    >
                                      Edit
                                    </MenuItem>
                                    <MenuItem
                                      onClick={() => {
                                        swal({
                                          text: "Are you sure you want to Delete the user ?",
                                          buttons: true,
                                          dangerMode: true,
                                        }).then(async (willDelete) => {
                                          if (willDelete) {
                                            console.log("RUNGING");
                                            const response = await fetch(
                                              `http://localhost:8080/users/delete/${user._id}`,
                                              {
                                                method: "POST",
                                                headers: {
                                                  "Content-Type":
                                                    "application/json",
                                                },
                                                body: JSON.stringify(),
                                              }
                                            );
                                            const result =
                                              await response.json();
                                            console.log(result);
                                            if (result.result === true) {
                                              swal(
                                                "",
                                                result.message,
                                                "success"
                                              );
                                              getUsers();
                                            } else {
                                              swal("", result.message, "error");
                                            }
                                          }
                                        });
                                      }}
                                    >
                                      Delete
                                    </MenuItem>
                                  </MenuList>
                                </Menu>
                              </Td>
                            </Tr>
                          ))
                        : [1, 2, 3, 4].map((user) => (
                            <Tr>
                              <Td>
                                <div v-else class="shimmer"></div>
                              </Td>
                              <Td>
                                <div v-else class="shimmer"></div>
                              </Td>
                              <Td>
                                <div v-else class="shimmer"></div>
                              </Td>
                              <Td>
                                <div v-else class="shimmer"></div>
                              </Td>
                              <Td>
                                <div v-else class="shimmer"></div>
                              </Td>
                              <Td>
                                <div v-else class="shimmer"></div>
                              </Td>
                            </Tr>
                          ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
