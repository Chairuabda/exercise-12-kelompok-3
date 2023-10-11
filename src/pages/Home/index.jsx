import { Box, Image, Text } from "@chakra-ui/react";
import { SideNavbar } from "../components/SideNavbar";
import { UserBar } from "../components/UserBar";
import { MidSection } from "../components/MidSection";
import Logo from "../../assets/BlackAbstract.png";
import { useEffect, useState } from "react";
import axios from "axios";

export const Home = () => {

	const [myAccount, setMyAccount] = useState()

	const accountsIndex = localStorage.getItem("akun")

	const fatchUser = async () => {
		try {
			const responseUser = await axios.get("http://localhost:3000/user")
			setMyAccount(responseUser.data[accountsIndex])
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		fatchUser();
	},[myAccount])
 
	return (
		<Box
			w="100vw"
			minH={"100vh"}
			display={"flex"}
			bgColor={"#eff0f3"}
			justifyContent={"center"}
			color={"black"}
			overflow={"hidden"}
		>
			<Box
				display="flex"
				flexDirection="column"
				w={"95%"}
				m={"0px 200px"}
			>
				<Box
					display="flex"
					justifyContent="space-between"
					h={"50px"}
					alignItems={"center"}
					position={"fixed"}
					left={"200"}
					right={"200"}
				>
					<Box display={"flex"} alignItems={"center"}>
						<Image src={Logo} h={"24px"} />
						<Text ml={"5px"}>MySosmed</Text>
					</Box>
					<Box
						border={"1px solid black"}
						p={"2px 18px"}
						borderRadius={"20px"}
					>
						{myAccount?.email}
					</Box>
				</Box>

				<Box
					display="flex"
					w="100%"
					justifyContent={"center"}
					minH={"100vh"}
					mt={"50px"}
				>
					<SideNavbar />

					<MidSection />

					<UserBar />
				</Box>
			</Box>
		</Box>
	);
};
