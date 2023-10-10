import { Box, Image, Text } from "@chakra-ui/react";
import { SideNavbar } from "../components/SideNavbar";
import { UserBar } from "../components/UserBar";
import { MidSection } from "../components/MidSection";
import Logo from "../../assets/BlackAbstract.png";

export const Home = () => {
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
						Username
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
