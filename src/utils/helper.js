export const validations = (user) => {
  const validateEmail = user.email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

  if (user.email === "" || user.username === "" || user.password === "") {
    return { error: "please fill all the details!" };
  } else if (!validateEmail) {
    return { error: "email invalid" };
  }
};
