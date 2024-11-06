"use client";

import { signIn } from "next-auth/react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
interface UserInfo {
  email: string;
  password: string;
}
const FormComp = () => {
  const form1 = useForm<UserInfo>();
  const { register, handleSubmit } = form1;

  const handleSignUp = async (userinfo: UserInfo) => {
    console.log(userinfo);

    const response = await signIn("credentials", {
      redirect: false,
      email: userinfo.email,
      password: userinfo.password,
    });

    if (response && !response.ok) {
      toast.error(response.error || "Failed to sign in");
    } else {
      toast.success("Now signed in");
    }
  };

  return (
    <div style={{ margin: "5rem" }}>
      <Form
        style={{ margin: "1rem", padding: "1rem" }}
        onSubmit={handleSubmit(handleSignUp)}
      >
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
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default FormComp;
