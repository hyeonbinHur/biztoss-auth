type IsValid = "valid" | "empty" | "wrong" | "none";

const isEmailValid = (email: string): IsValid => {
  if (email === "") return "empty";
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(email) ? "valid" : "wrong";
};

const isPasswordValid = (password: string): IsValid => {
  if (password === "") return "empty";
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;
  return passwordRegex.test(password) ? "valid" : "wrong";
};

const isConformPasswordValid = (
  password: string,
  passwordCheck: string
): IsValid => {
  if (passwordCheck === "") return "empty";

  return password === passwordCheck ? "valid" : "wrong";
};

const isContactValid = (contact: string): IsValid => {
  if (contact === "") return "empty";
  return contact.length === 11 ? "valid" : "wrong";
};

const isNameValid = (name: string): IsValid => {
  if (name === "") return "empty";
  return "valid";
};

export {
  isEmailValid,
  isPasswordValid,
  isContactValid,
  isConformPasswordValid,
  isNameValid,
};
