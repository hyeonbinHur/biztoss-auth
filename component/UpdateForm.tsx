"use client";

import { reloadSession } from "@/lib/func";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
interface UserInfo {
  email: string;
  newEmail: string;
}
const UpdateForm = ({ email }: { email: string }) => {
  const form1 = useForm<UserInfo>();
  const { register, handleSubmit } = form1;
  const { data: session, update } = useSession();
  const router = useRouter();

  const handleSignUp = async (userinfo: UserInfo) => {
    userinfo.email = email;
    console.log(userinfo);

    const response = await fetch("/api/updateEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userinfo),
    });

    const data = await response.json();

    if (data.error) {
      toast.error(data.error);
    }

    await update({
      ...session,
      user: {
        ...session?.user,
        email: userinfo.newEmail,
      },
    });

    reloadSession();

    router.refresh();

    console.log(session?.user);

    // await signIn("credentials", { redirect: false });

    toast.success("Account created");
  };

  return (
    <>
      <Form
        style={{ margin: "1rem", padding: "1rem" }}
        onSubmit={handleSubmit(handleSignUp)}
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="text"
            placeholder={email}
            required
            {...register("newEmail")}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default UpdateForm;
