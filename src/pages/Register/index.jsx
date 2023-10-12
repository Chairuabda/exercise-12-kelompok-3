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
import { useEffect, useState } from "react";

// Skema register
const registerScheme = Yup.object().shape({
	email: Yup.string()
		.email("Invalid Email")
		.required("Email is required"),
	password: Yup.string()
		.min(8, "Password must be 8 characters minimum")
		.required("Password is required"),
});

export const Register = () => {
	const [accounts, setAccounts] = useState([]);
	const Navigate = useNavigate();

	// Ambil data user yang sudah register
	const fatchData = async () => {
		try {
			const response = await axios.get("http://localhost:3000/user");
			setAccounts(response.data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fatchData();
	}, [accounts]);

	// Ngeset semua email ke dalam variable allEmail
	const allEmail = accounts.map((item) => item.email);


	// Pengecekan email yang di input oleh user dengan email yang ada di db.json, jika ada yang sama maka akan menjalankan alert email sudah terdaftar, jika berbeda inputan akan dikirim ke db.json, ngeset localstorage, lalu me navigate ke home
	const register = async (username, email, password) => {
		try {
			if (allEmail.includes(email)) {
				alert("Email Sudah terdaftar");
			} else {
				await axios.post("http://localhost:3000/user", {
					username,
					email,
					password,
				});
				localStorage.setItem("akun", allEmail.length);
				Navigate("/home");
			}
		} catch (err) {
			console.log(err);
		}
	};

	// menginisialisasi values dan loginschame, lalu ketika di submit, onsubmit akan dijalan kan memanggil function register untuk mengirimkan username, email dan password yang di input user
	const formikRegister = useFormik({
		initialValues: {
			username: "",
			email: "",
			password: "",
		},
		validationSchema: registerScheme,
		onSubmit: (values) => {
			register(values.username, values.email, values.password);
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
						<Text fontSize="20px">Register</Text>
						<FormControl
							display="flex"
							flexDirection="column"
							justifyContent="start"
							mb={"1rem"}
						>
							<FormLabel>Nama</FormLabel>
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
								pl={"5px"}
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
							<FormLabel>Email</FormLabel>
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
								pl={"5px"}
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
							<FormLabel>Password</FormLabel>
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
								pl={"5px"}
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
