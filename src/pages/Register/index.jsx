import {
	Box,
	Text,
	Input,
	Button,
	FormControl,
	FormLabel,
	FormErrorMessage,
} from "@chakra-ui/react";
// import { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
		>
			<Box
				display={"flex"}
				flexDirection={"column"}
				justifyContent={"center"}
				alignItems={"center"}
				bgColor="#eff0f3"
				p="30px 50px"
				borderRadius="10px"
				color="black"
				w="300px"
			>
				<form onSubmit={formikRegister.handleSubmit}>
					<Text fontSize="20px">Register</Text>
					<FormControl
						display="flex"
						flexDirection="column"
						justifyContent="start"
					>
						<FormLabel>Nama</FormLabel>
						<Input
							type="text"
							name="username"
							value={formikRegister.values.username}
							onChange={formikRegister.handleChange}
							borderRadius="5px"
							bgColor="transparent"
							border="1px solid black"
							h="25px"
							color="black"
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
					>
						<FormLabel>Email</FormLabel>
						<Input
							type="text"
							name="email"
							value={formikRegister.values.email}
							onChange={formikRegister.handleChange}
							borderRadius="5px"
							bgColor="transparent"
							border="1px solid black"
							h="25px"
							color="black"
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
					>
						<FormLabel>Password</FormLabel>
						<Input
							type="password"
							name="password"
							value={formikRegister.values.password}
							onChange={formikRegister.handleChange}
							borderRadius="5px"
							bgColor="transparent"
							border="1px solid black"
							h="25px"
							color="black"
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
							bgColor={"blue.300"}
						>
							Register
						</Button>
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
