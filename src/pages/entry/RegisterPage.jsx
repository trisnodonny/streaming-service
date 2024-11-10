import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "@components/entry/Button";
import Footer from "@components/entry/Footer";
import Header from "@components/entry/Header";
import InputField from "@components/entry/InputField";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [isError, setIsError] = useState({
    firstname: false,
    lastname: false,
    username: false,
    password: false,
    confirmPassword: false,
  });
  const [isUserexist, setIsUserExist] = useState(false);
  const errorMsgUserExist = isUserexist
    ? "Username already exist."
    : "Username must contain between 4 and 20 characters.";

  const hanldeOnBlurConfirmPw = () => {
    setIsError((prevData) => ({
      ...prevData,
      confirmPassword: data.password !== data.confirmPassword,
    }));
  };
  const handleErrorRegister = () => {
    let hasError = false;

    if (!data.firstname) {
      setIsError((prevData) => ({
        ...prevData,
        firstname: true,
      }));
      hasError = true;
    }

    if (!data.lastname) {
      setIsError((prevData) => ({
        ...prevData,
        lastname: true,
      }));
      hasError = true;
    }

    if (!data.username) {
      setIsError((prevData) => ({
        ...prevData,
        username: true,
      }));
      hasError = true;
    }

    if (!data.password) {
      setIsError((prevData) => ({
        ...prevData,
        password: true,
      }));
      hasError = true;
    }

    return hasError;
  };
  const handleResetForm = () => {
    setData({
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirmPassword: "",
    });
    setIsError({
      firstname: false,
      lastname: false,
      username: false,
      password: false,
      confirmPassword: false,
    });
    setIsUserExist(false);
  };
  const handleStoreData = () => {
    const hasError = handleErrorRegister();
    if (hasError) return;

    const usersData = JSON.parse(localStorage.getItem("usersData"));
    const usersArr = usersData ? usersData : [];
    const userExist = usersArr.find((user) => user.username === data.username);

    const newUser = {
      id: Date.now(),
      firstname: data.firstname,
      lastname: data.lastname,
      username: data.username,
      password: data.password,
    };

    if (userExist) {
      setIsUserExist(true);
      setIsError((prevData) => ({
        ...prevData,
        username: true,
      }));
    } else {
      usersArr.push(newUser);
      localStorage.setItem("usersData", JSON.stringify(usersArr));
      handleResetForm();
      navigate("/login");
    }
  };
  const handleRegister = (ev) => {
    ev.preventDefault();
    handleStoreData();
  };

  return (
    <>
      <div className="bg-black sm:bg-transparent z-50 relative">
        <Header />
        <div className="container mx-auto md:px-4 md:mb-12 sm:max-w-[450px] h-max flex items-center justify-center z-50">
          <div className="w-full mx-auto bg-black bg-opacity-50 p-8 rounded-md">
            <div className="flex flex-col gap-4 justify-center">
              <div className="text-3xl mb-4 font-bold">Sign Up</div>
              <div className="flex gap-2">
                <InputField
                  type="text"
                  name="firstname"
                  label="First name"
                  value={data.firstname}
                  onChange={setData}
                  isError={isError.firstname}
                  onError={setIsError}
                  errorMsg="Firstname is required."
                />
                <InputField
                  type="text"
                  name="lastname"
                  label="Last name"
                  value={data.lastname}
                  onChange={setData}
                  isError={isError.lastname}
                  onError={setIsError}
                  errorMsg="Lastname is required."
                />
              </div>
              <InputField
                type="text"
                name="username"
                label="Username"
                value={data.username}
                onChange={setData}
                isError={isError.username}
                onError={setIsError}
                errorMsg={errorMsgUserExist}
              />
              <InputField
                type="password"
                name="password"
                label="Password"
                value={data.password}
                onChange={setData}
                isError={isError.password}
                onError={setIsError}
                errorMsg="Password must contain between 4 and 60 characters."
              />
              <InputField
                type="password"
                label="Confirm Password"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={setData}
                isError={isError.confirmPassword}
                onError={setIsError}
                errorMsg="Password doesn't match"
                onBlurError={hanldeOnBlurConfirmPw}
              />
              <Button label="Sign Up" onClick={handleRegister} />
            </div>
            <div className="text-center py-4 flex gap-2 items-center justify-center">
              <span className="opacity-50">Already have an account?</span>
              <Link
                className="hover:underline transition-all font-semibold"
                to={"/login"}
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
        <footer className="container mx-auto max-w-[1200px]">
          <Footer />
        </footer>
      </div>
    </>
  );
}
