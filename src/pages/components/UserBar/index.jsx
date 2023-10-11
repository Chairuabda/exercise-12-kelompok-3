import { Box, Text, Button } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

export const UserBar = () => {
	const [allUser, setAllUser] = useState([]);
	const [myAccount, setMyAccount]= useState([])

	const accountsIndex = localStorage.getItem("akun");

	const fatchData = async () => {
		try {
			const responseUser = await axios.get(
				"http://localhost:3000/user"
			);
			setMyAccount(responseUser.data[accountsIndex].username)
			const user = responseUser.data
			console.log(user)
			setAllUser(user);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fatchData();
	}, []);
	return (
		<Box
			w={"25%"}
			minH={"100vh"}
			display={"flex"}
			justifyContent={"start"}
			position={"fixed"}
			right={"145"}
			overflow={"hidden"}
		>
			<Box
				display={"flex"}
				flexDirection={"column"}
				h={"fit-content"}
				justifyContent={"center"}
				bgColor={"white"}
				borderRadius={"20px"}
				w={"90%"}
				alignItems={"center"}
			>
				<Box m={"20px 0"}>
					<Text fontSize={"22px"} mb={"0"}>
						Who to follow
					</Text>
				</Box>

				{allUser?.length > 0 ? (
					allUser.map((user, index) => {
						return (
							<Box
								bgColor={"#eff0f3"}
								p={"10px"}
								w={"75%"}
								borderRadius={"5px"}
								color={"black"}
								m={"2px"}
								key={index}
							>
								<Text m={"0"}>{user.username}</Text>
							</Box>
						);
					})
				) : (
					<></>
				)}
				<Box color={"black"} m={"20px"} fontSize={"12px"}>
					<Button
						variant={"link"}
						border={"none"}
						_focus={{ border: "none", outline: "none" }}
					>
						see more
					</Button>
				</Box>
			</Box>
		</Box>
	);
};
