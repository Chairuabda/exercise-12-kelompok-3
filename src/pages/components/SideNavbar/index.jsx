import { Box, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const SideNavbar = () => {

	return (
				<Box w={{ base: "20%", md: "15%" }}
					display={"flex"}
					justifyContent={"end"}
					position={"fixed"}
					left={"145"}
					h={"90%"}
					mt={"40px"}
				>
					<Box
						display="flex"
						flexDirection={"column"}
						textAlign={"start"}
						w={"80%"}
						h={"100%"}
						justifyContent={"space-between"}
					>
						<Box display={"flex"} flexDirection={"column"}>
							<Link to="/home">
								<Text p={"10px"} mb={"5px"} fontSize={"sm"} fontWeight={"medium"}>
									Home
								</Text>
							</Link>
							<Link>
								<Text p={"10px"} mb={"5px"} fontSize={"sm"} fontWeight={"medium"}>
									Notification
								</Text>
							</Link>
							<Link>
								<Text p={"10px"} mb={"5px"} fontSize={"sm"} fontWeight={"medium"}>
									Messages
								</Text>
							</Link>
							<Link>
								<Text p={"10px"} mb={"5px"} fontSize={"sm"} fontWeight={"medium"}>
									Profile
								</Text>
							</Link>
						</Box>
						<Link to="/">
							<Button mt={"20px"}>Log Out</Button>
						</Link>
					</Box>
				</Box>
			
	);
};
