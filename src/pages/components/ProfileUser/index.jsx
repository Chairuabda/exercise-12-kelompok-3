import {
	Box,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableContainer,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { SideNavbar } from "../SideNavbar";
import { TopBar } from "../TopBar";

export const ProfileUser = () => {
	const [allUser, setAllUser] = useState([]);

	const fatchData = async () => {
		try {
			const userAccounts = await axios.get(
				"http://localhost:3000/user"
			);
			setAllUser(userAccounts.data);
			console.log(allUser);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fatchData();
	}, []);

	return (
		<Box
			w={"100vw"}
			h={"100vh"}
			display={"flex"}
			justifyContent={"center"}
		>
			<TopBar />
			<Box mt={"50px"}>
				<SideNavbar />
			</Box>
			<Box
				w={"65%"}
				display={"flex"}
				// bgColor={"green"}
				// alignItems={"center"}
				justifyContent={"end"}
			>
				<Box
					w={"85%"}
					mt={"150px"}
					// bgColor={"red"}
					display={"flex"}
					justifyContent={"end"}
                    
				>
					{/* <Text>Profile User</Text> */}
					<TableContainer w={"800px"}>
						<Table variant="simple" colorScheme="teal">
							<Thead>
								<Tr>
									<Th>Username</Th>
									<Th>Email</Th>
									<Th>Password</Th>
								</Tr>
							</Thead>
							{allUser?.length > 0 ? (
								allUser.map((user, index) => {
									return (
										<Tbody key={index}>
											<Tr>
												<Td>{user.username}</Td>
												<Td>{user.email}</Td>
												<Td>{user.password}</Td>
											</Tr>
										</Tbody>
									);
								})
							) : (
								<></>
							)}
						</Table>
					</TableContainer>
				</Box>
			</Box>
		</Box>
	);
};
