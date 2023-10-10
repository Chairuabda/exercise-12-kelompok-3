import { Button, Input } from "@chakra-ui/react";
import { Box, Text } from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { SideNavbar } from "../components/SideNavbar";
import { Image, Microphone, MapPin } from "@phosphor-icons/react";

const tweetScheme = Yup.object().shape({
	tweet: Yup.string().required(),
});

export const Home = () => {
	const [allTweet, setAllTweets] = useState([]);
	const [allUser, setAllUser] = useState([]);
	const [date, setDates] = useState("");

	const tweets = async (tweet, time) => {
		try {
			await axios.post("http://localhost:8000/tweet", {
				// username,
				tweet,
				time,
			});
		} catch (err) {
			console.log(err);
		}
	};

	const time = () => {
		const time = new Date();
		const fromatedTime = time.toLocaleString();
		setDates(fromatedTime);
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
			time();
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fatchData();
	}, [allTweet]);

	const formikTweet = useFormik({
		initialValues: {
			// username: "",
			tweet: "",
			time: "",
		},
		validationSchema: tweetScheme,
		onSubmit: (values) => {
			tweets(values.tweet, date);
			formikTweet.values.tweet = "";
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
					<SideNavbar />

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
									<Box
										display={"flex"}
										flexDirection={"column"}
										alignItems={"end"}
									>
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

										<Box
											display={"flex"}
											w={"95%"}
											mb={"10px"}
											justifyContent={"space-between"}
											alignItems={"center"}
										>
											<Box display={"flex"}>
												<Image size={26} />
												<Box m={"0px 15px"}><Microphone size={26} /></Box>
												<MapPin size={26} />
											</Box>
											<Button justifyContent={"end"} type="submit">
												Posting
											</Button>
										</Box>
									</Box>
								</form>
							</Box>

							<Box w={"80%"} borderTop={"1px solid black"}>
								{allTweet?.length > 0 ? (
									allTweet
										.map((items, index) => {
											return (
												<Box
													key={index}
													borderRadius={"10px"}
													mt={"10px"}
													p={"10px 30px"}
													boxShadow={"md"}
												>
													<Box
														display={"flex"}
														justifyContent={"start"}
														alignItems={"center"}
														h={"30px"}
													>
														<Text
															alignItems={"center"}
															fontWeight={"600"}
														>
															username
														</Text>
														<Text
															fontSize={"10px"}
															alignItems={"end"}
															ml={"30px"}
														>
															{items.time}
														</Text>
													</Box>
													<Box p={"20px"}>
														<Text textAlign={"justify"}>
															{items.tweet}
														</Text>
													</Box>
												</Box>
											);
										})
										.reverse()
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
