/* eslint-disable no-dupe-else-if */
import {
	Box,
	Text,
	Input,
	Button,
	FormControl,
	FormLabel,
	Heading,
	Image,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Logo from "/src/assets/BlackAbstract.png";

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

	useEffect(() => {
		fatchDataLogin();
	}, []);

	// console.log(accounts);
	const check = (email, password) => {
		if (allEmail.includes(email)) {
			const newEmail = accounts[allEmail.indexOf(email)];
			if (newEmail.password.includes(password)) {
				localStorage.setItem("akun", allEmail.indexOf(email));
				Navigate("/home");
			} else {
				alert("Password salah");
			}
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
				<form onSubmit={formik.handleSubmit}>
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
							justifyContent="center"
							mb={"1rem"}
						>
							<FormLabel fontSize={"sm"} fontWeight={"medium"}>Email</FormLabel>
							<Input
								type="text"
								name="email"
								value={formik.values.email}
								onChange={formik.handleChange}
								borderRadius="4px"
								bgColor="transparent"
								border="1px solid #1A008F"
								h="35px"
								color="gray.700"
							/>
						</FormControl>
						<FormControl
							display="flex"
							flexDirection="column"
							justifyContent="center"
						>
							<FormLabel fontSize={"sm"} fontWeight={"medium"}>Password</FormLabel>
							<Input
								type="password"
								name="password"
								value={formik.values.password}
								onChange={formik.handleChange}
								borderRadius="4px"
								bgColor="transparent"
								border="1px solid #1A008F"
								h="35px"
								color="gray.700"
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
								bgColor={"#400f68"}
								color={"white"}
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
