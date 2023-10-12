import {
	Box,
	Text,
	Input,
	Button,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Image,
	Heading
} from "@chakra-ui/react";
// import { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Logo from "/src/assets/BlackAbstract.png";

const registerScheme = Yup.object().shape({
	email: Yup.string()
		.email("Invalid Email")
		.required("Email is required"),
	password: Yup.string()
		.min(8, "Password must be 8 characters minimum")
		.required("Password is required"),
});

export const Register = () => {
	// const [data, setData] = useState("");

	const Navigate = useNavigate();

	const register = async (username, email, password) => {
		try {
			await axios.post("http://localhost:3000/user", {
				username,
				email,
				password,
			});
		} catch (err) {
			console.log(err);
		}
	};

	const formikRegister = useFormik({
		initialValues: {
			username: "",
			email: "",
			password: "",
		},
		validationSchema: registerScheme,
		onSubmit: (values) => {
			register(values.username, values.email, values.password);
			Navigate("/home");
		},
	});

	return (
		<Box
		display={"flex"}
		w={"100vw"}
		justifyContent={"center"}
		alignItems={"center"}
		minH={"100vh"}
		bgImage="url('/src/assets/wickedbackground.svg')"
		backgroundSize="cover"
		backgroundRepeat="repeat"
		>
			<Box
				display={"flex"}
				flexDirection={"column"}
				justifyContent={"center"}
				alignItems={"center"}
				bgColor="#eff0f3"
				p="30px 50px"
				borderRadius="20px"
				color="black"
				w="350px"
				outline={"9px solid rgba(255, 255, 255, 0.09)"}
				boxShadow={'0px 6px 13px 3px rgba(64, 15, 104, 0.38)'}
			>
				<form onSubmit={formikRegister.handleSubmit}>
					<Box
						display={"flex"}
						flexDirection={"column"}
						justifyContent={"center"}
						mb={"30px"}
					>
								<Box
							display={"flex"}
							justifyContent={"center"}
							alignItems={"center"}
						>
						<Box display={"flex"} mt={"2rem"} mb={"2rem"}>
							<Image src={Logo}></Image>
							<Heading size="lg" fontWeight={"normal"}>MySosmed</Heading>
						</Box>
						</Box>
						<FormControl
							display="flex"
							flexDirection="column"
							justifyContent="start"
							mb={"1rem"}
						>
							<FormLabel fontSize={"sm"} fontWeight={"medium"}>Nama</FormLabel>
							<Input
								type="text"
								name="username"
								value={formikRegister.values.username}
								onChange={formikRegister.handleChange}
								borderRadius="4px"
								bgColor="transparent"
								border="1px solid #1A008F"
								h="35px"
								color="gray.700"
							/>
						</FormControl>
						<FormControl
							isInvalid={
								formikRegister.touched.email &&
								formikRegister.errors.email
							}
							display="flex"
							flexDirection="column"
							justifyContent="start"
							mb={"1rem"}
						>
							<FormLabel fontSize={"sm"} fontWeight={"medium"}>Email</FormLabel>
							<Input
								type="text"
								name="email"
								value={formikRegister.values.email}
								onChange={formikRegister.handleChange}
								borderRadius="4px"
								bgColor="transparent"
								border="1px solid #1A008F"
								h="35px"
								color="gray.700"
							/>
							{formikRegister.touched.email &&
								formikRegister.errors.email && (
									<FormErrorMessage>
										{formikRegister.errors.email}
									</FormErrorMessage>
								)}
						</FormControl>

						<FormControl
							isInvalid={
								formikRegister.touched.password &&
								formikRegister.errors.password
							}
							display="flex"
							flexDirection="column"
							justifyContent="start"
							mb={"1rem"}
						>
							<FormLabel fontSize={"sm"} fontWeight={"medium"}>Password</FormLabel>
							<Input
								type="password"
								name="password"
								value={formikRegister.values.password}
								onChange={formikRegister.handleChange}
								borderRadius="4px"
								bgColor="transparent"
								border="1px solid #1A008F"
								h="35px"
								color="gray.700"
							/>
							{formikRegister.touched.password &&
								formikRegister.errors.password && (
									<FormErrorMessage>
										{formikRegister.errors.password}
									</FormErrorMessage>
								)}
						</FormControl>
						<Box display={"flex"} justifyContent={"center"}>
							<Button
								type="submit"
								mt="30px"
								p="6px 20px"
								textAlign="center"
								fontSize="16px"
								justifyContent={"center"}
								bgColor={"#400f68"}
								color={"white"}
							>
								Register
							</Button>
						</Box>
					</Box>
				</form>

				<Box mt={"20px"}>
					<Text>
						Sudah Punya Akun <Link to="/">Login</Link>
					</Text>
				</Box>
			</Box>
		</Box>
	);
};
