import React from 'react'
import { useFormik } from "formik"
import * as Yup from "yup"
import {
    FormControl, Input, FormLabel, Button
} from '@chakra-ui/react'



export default function Login() {
    const emailRegex = '[a-z0-9]+@[a-z]+.[a-z]{2,3}';
    const passwordRegex = /^(?=.\d)(?=.[a-z])(?=.*[A-Z]).{5,}$/;
    let formik = useFormik({
        initialValues:{
            email: "",
            password: "",
        },
        validationSchema: Yup.object().shape({
            email: Yup.string()
            .email("Invalid Email")
            .required("Email Is Required")
            .matches(
                emailRegex,
                "Email must contain @"
              ),
            password: Yup.string()
            .required({ required: "password is required" })
            .min(5, "Password min 5 char")
            .matches(passwordRegex, {
                message:"Password no special char"
            })
            
        }),
        onSubmit: (values) => {
            console.log(values);
            // alert(JSON.stringify(values, null, 2))
          },
    });
  return (
    <form onSubmit={formik.handleSubmit}>
        <FormControl>
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input id="email" name="email" type="email" onChange={formik.handleChange} value={formik.values.email} placeholder='Enter Your Email' />
            {formik.touched.email && formik.errors.email && (
                <p>{formik.errors.email}</p>
            )}
        </FormControl>

        <FormControl mt={10} mb={10}>
            <FormLabel htmlFor='password'>Password</FormLabel>
            <Input id="password" name="password" type="password" onChange={formik.handleChange} value={formik.values.password} placeholder='Enter Your Password'  />
            {formik.touched.password && formik.errors.password && (
                <p>{formik.errors.password}</p>
            )}
        </FormControl>
        <Button type="submit" className="btn-submit">Submit</Button>
    </form>
  )
}
