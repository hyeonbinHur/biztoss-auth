"use client";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface UserInfo {
  email: string;
  password: string;
  "pw check": string;
  username: string;
}

const FormComp = () => {
  const form1 = useForm<UserInfo>();
  const { register, handleSubmit } = form1;
  const handleSignUp = async (userinfo: UserInfo) => {
    console.log(userinfo);
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(userinfo),
    });
    const data = await response.json();

    if (data.error) {
      toast.error(data.error);
    }

    toast.success("Account created");
  };
  return (
    <>
      <Form
        style={{ margin: "1rem", padding: "1rem" }}
        onSubmit={handleSubmit(handleSignUp)}
      >
        <Form.Group className="mb-3" controlId="forUsername">
          <Form.Label>user name</Form.Label>
          <Form.Control
            type="text"
            placeholder="username"
            required
            {...register("username")}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email"
            required
            {...register("email")}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required
            {...register("password")}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPasswordConfirm">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required
            {...register("pw check")}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default FormComp;
