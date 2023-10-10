import {
	Box,
	Text,
	Input,
	Button,
	FormControl,
	FormLabel,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const LoginSchema = Yup.object().shape({
	email: Yup.string()
		.email("Invalid Email")
		.required("Email is required"),
	password: Yup.string()
		.min(8, "Password must be 8 characters minimum")
		.required("Password is required"),
});

export const Login = () => {
	const [accounts, setAccounts] = useState([]);
	const Navigate = useNavigate();

	const fatchDataLogin = async () => {
		try {
			const response = await axios.get("http://localhost:3000/user");
			setAccounts(response.data);
		} catch (err) {
			console.log(err);
		}
	};

	const allEmail = accounts.map((item) => item.email);
	const allPassword = accounts.map((item) => item.password);
	useEffect(() => {
		fatchDataLogin();
	}, []);

	const check = (email, password) => {
		if (allEmail.includes(email) && allPassword.includes(password)) {
			Navigate("/home");
		} else if (
			allEmail.includes(email) &&
			!allPassword.includes(password)
		) {
			alert("Password salah");
		} else {
			alert("Email Belum Terdaftar");
		}
	};

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: LoginSchema,
		onSubmit: (values) => {
			check(values.email, values.password);
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
				<form onSubmit={formik.handleSubmit}>
					<Box
						display={"flex"}
						flexDirection={"column"}
						justifyContent={"center"}
						mb={"30px"}
					>
						<Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
							<Text fontSize="20px">Login</Text>
						</Box>
						<FormControl
							display="flex"
							flexDirection="column"
							justifyContent="center"
						>
							<FormLabel>Email</FormLabel>
							<Input
								type="text"
								name="email"
								value={formik.values.email}
								onChange={formik.handleChange}
								borderRadius="5px"
								bgColor="transparent"
								border="1px solid black"
								h="30px"
								color="black"
                                pl={"5px"}
							/>
						</FormControl>
						<FormControl
							display="flex"
							flexDirection="column"
							justifyContent="center"
						>
							<FormLabel>Password</FormLabel>
							<Input
								type="password"
								name="password"
								value={formik.values.password}
								onChange={formik.handleChange}
								borderRadius="5px"
								bgColor="transparent"
								border="1px solid black"
								h="30px"
								color="black"
                                pl={"5px"}
							/>
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
								Login
							</Button>
						</Box>
					</Box>
				</form>
				<Box>
					<Text>
						Belum punya akun <Link to="/register">Register</Link>
					</Text>
				</Box>
			</Box>
		</Box>
	);
};
