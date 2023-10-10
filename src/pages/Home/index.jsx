import { Button, Input } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";

const tweetScheme = Yup.object().shape({
	tweet: Yup.string(),
});

export const Home = () => {
	const [allTweet, setAllTweets] = useState("");
	const [allUser, setAllUser] = useState("");

	const tweets = async (tweet) => {
		try {
			await axios.post("http://localhost:8000/tweet", {
				// username,
				tweet,
			});
		} catch (err) {
			console.log(err);
		}
	};

	const fatchData = async () => {
		try {
			const responseTweet = await axios.get(
				"http://localhost:8000/tweet"
			);
			const responseUser = await axios.get(
				"http://localhost:3000/user"
			);
			setAllTweets(responseTweet.data);
			setAllUser(responseUser.data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fatchData();
	}, []);

	const formikTweet = useFormik({
		initialValues: {
			// username: "",
			tweet: "",
		},
		validationSchema: tweetScheme,
		onSubmit: (values) => {
			tweets(values.tweet);
		},
	});

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
				>
					<Box>Logo</Box>
					<Box>Username</Box>
				</Box>

				<Box
					display="flex"
					w="100%"
					justifyContent={"center"}
					minH={"100vh"}
				>
					{/* left section */}
					<Box
						w={{ base: "20%", md: "15%" }}
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
							</Box>
							<Link to="/">
								<Button mt={"20px"}>Log Out</Button>
							</Link>
						</Box>
					</Box>

					{/* mid section */}
					<Box
						minH={"100vh"}
						bgColor={"white"}
						w={"48%"}
						shadow={"base"}
						borderRadius={"10px"}
						position={"relative"}
						left={"-90"}
					>
						<Box
							display={"flex"}
							flexDirection={"column"}
							justifyContent={"center"}
							alignItems={"center"}
							mt={"20px"}
						>
							<Box
								w={"80%"}
								_focus={{ border: "none", outline: "transparent" }}
								_active={{ border: "none", outline: "none" }}
							>
								<form onSubmit={formikTweet.handleSubmit}>
									<Input
										name="tweet"
										value={formikTweet.values.tweet}
										onChange={formikTweet.handleChange}
										type="textarea"
										variant={"unstyled"}
										h={"80px"}
										outlineColor={"transparent"}
										fontSize={"20px"}
										placeholder="What's happening?"
									/>
									<Button type="submit">Post</Button>
								</form>
							</Box>

							<Box w={"80%"} borderTop={"1px solid black"}>
								{allTweet?.length > 0 ? (
									allTweet.map((items, index) => {
										return (
											<Box key={index}>
												<Box>
													<Text>username</Text>
												</Box>
												<Box>
													<Text>{items.tweet}</Text>
												</Box>
											</Box>
										);
									})
								) : (
									<Box>
										<Text>
											Postingan masih kosong, ayo bagikan postingan mu
										</Text>
									</Box>
								)}
							</Box>
						</Box>
					</Box>

					{/* right section */}
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
				</Box>
			</Box>
		</Box>
	);
};
