import React from 'react';
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import styled from 'styled-components';
import axios from 'axios';

const Error = styled.span`
    color: red;
    font-size: 1.3rem;
`

const DivForm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const FormComponent = props => {
    console.log(props);

    return (
        <Form>
            <DivForm>
                {/*////////////////NAME///////////////*/}
                <Field name="name" placeholder="Name"/>
                {props.touched.name && props.errors.name ? (
                    <Error className>{props.errors.name}</Error>
                ) : null}
                {/*////////////////PASSWORD///////////////*/}
                <Field type="password" name="password" placeholder="Password"/>
                {props.touched.password && props.errors.password ? (
                    <Error className>{props.errors.password}</Error>
                ) : null}
                {/*////////////////EMAIL///////////////*/}
                <Field name="email" placeholder="Email"/>
                {props.touched.email && props.errors.email ? (
                    <Error className>{props.errors.email}</Error>
                ) : null}
                {/*////////////////CHECKBOX///////////////*/}
                <label htmlFor="tos">Read the TOS?</label>
                <Field type="checkbox" name="tos"/>
                {props.touched.tos && props.errors.tos ? (
                    <Error className>{props.errors.tos}</Error>
                ) : null}
                {/*////////////////SUBMIT///////////////*/}
                <button type="submit">Create User</button>
            </DivForm>
        </Form>
    );
};

export default withFormik({
    mapPropsToValues: props => {
        return {
            name: props.name || "",
            email: props.email || "",
            password: props.password || "",
            tos: props.tos || false
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required("name is required").min(3, "must be at least 3 characters long"),
        password: Yup.string().min(5, "must be at least 5 characters long").required("password is required"),
        email: Yup.string().email("please enter valid email").required("email is required"),
        tos: Yup.boolean().oneOf([true], "must accept terms of service to continue")
    }),
    handleSubmit: (values, formikBag) => {
        console.log("values", values);
        console.log("bag", formikBag);
        // AXIOS CALL SENDS VALUES AFTER SUBMIT
        axios.post('https://reqres.in/api/users', values)
            .then(res => {
                const userInfo = res.data;
                console.log("response", res)
                // PASS VALUES OF USER TO STATE ON APP.JS
                formikBag.props.addUser({
                    ...userInfo,
                    id: Date.now()
                });
            })
            .catch(err => {console.log("axios error", err)})
        formikBag.setStatus("form submitting");
        formikBag.resetForm();
    }
})(FormComponent);