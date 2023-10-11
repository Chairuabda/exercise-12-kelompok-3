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
							<Link>
								<Text p={"10px"} mb={"5px"}>
									Home
								</Text>
							</Link>
							<Link>
								<Text p={"10px"} mb={"5px"}>
									Notification
								</Text>
							</Link>
							<Link>
								<Text p={"10px"} mb={"5px"}>
									Messaged
								</Text>
							</Link>
							<Link>
								<Text p={"10px"} mb={"5px"}>
									Profile
								</Text>
							</Link>
							<Link to="/profileuser">
								<Text p={"10px"} mb={"5px"}>
									Profile User
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
