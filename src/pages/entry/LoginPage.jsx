import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "../../components/entry/Button";
import Footer from "../../components/entry/Footer";
import Header from "../../components/entry/Header";
import InputField from "../../components/entry/InputField";

export default function LoginPage() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [isError, setIsError] = useState({
    username: false,
    password: false,
  });
  const [isIncorrect, setIsIncorrect] = useState(false);
  const [isUserExist, setIsUserExist] = useState(false);
  const [errorUsername, setErrorUsername] = useState("");

  const errorMsgUserExist = isUserExist
    ? "Username doesn't exist."
    : "Username must contain between 4 and 20 characters.";

  const handleErrorRegister = () => {
    let hasError = false;

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
  const handleFakeAccessToken = () => {
    return "fakeAccessToken12345";
  };
  const handleCheckingStoreData = () => {
    const hasError = handleErrorRegister();
    if (hasError) return;

    const usersData = JSON.parse(localStorage.getItem("usersData"));
    const usersArr = usersData ? usersData : [];
    const user = usersArr.find((user) => user.username === data.username);

    if (!user) {
      setIsIncorrect(true);
      setErrorUsername(data.username);
      return;
    }

    if (user.password !== data.password) {
      setIsIncorrect(true);
      setErrorUsername(data.username);
      return;
    }

    const authSession = {
      username: data.username,
      access_token: handleFakeAccessToken(),
    };

    localStorage.setItem("authSession", JSON.stringify(authSession));
    setIsIncorrect(false);
    handleResetForm();

    navigate("/home");
  };
  const handleLogin = (ev) => {
    ev.preventDefault();
    handleCheckingStoreData();
  };

  return (
    <>
      <div className="bg-blue-200 sm:bg-transparent">
        <Header />
        <div className="container mx-auto md:px-4 md:mb-12 sm:max-w-[450px]">
          <div className="w-full mx-auto bg-blue-200 p-6">
            <div className="flex flex-col gap-4 justify-center">
              <div className="text-2xl mb-4">Sign In</div>
              {isIncorrect && (
                <div className="p-4 bg-yellow-500 rounded-md">
                  <p className="font-bold">
                    Incorrect username / password for {errorUsername}.
                  </p>
                </div>
              )}
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
              <Button label="Sign In" onClick={handleLogin} />
            </div>
            <div className="text-center py-4">
              <span>
                New to Myflix? <Link to={"/register"}>Sign Up</Link>
              </span>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
