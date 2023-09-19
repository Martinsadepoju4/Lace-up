import axios from "axios";

const getShopData = async () => {
  console.log("shop data fetching");
  try {
    const response = await axios.get(
      process.env.REACT_APP_API_URL + "/shopdata"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching shop data:", error);
    throw error; // Rethrow the error to be caught by the caller
  }
};
const fetchBrands = async () => {
  console.log("home usequery ran");
  try {
    const response = await axios.get(
      process.env.REACT_APP_API_URL + "/branddata"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching shop data:", error);
    throw error; // Rethrow the error to be caught by the caller
  }
};
const fetchTrending = async () => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_API_URL + "/trendingdata"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching shop data:", error);
    throw error; // Rethrow the error to be caught by the caller
  }
};
const fetchNewArrival = async () => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_API_URL + "/newarrivaldata"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching shop data:", error);
    throw error; // Rethrow the error to be caught by the caller
  }
};

const fetchUserInfo = async (username) => {
  console.log(username);
  try {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/profiledata",
      {
        username,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching shop data:", error);
    throw error; // Rethrow the error to be caught by the caller
  }
};
const registerUser = async (signupinfo, navigate, saveUser) => {
  console.log(signupinfo);
  try {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/register",
      signupinfo
    );
    console.log(response);
    if (response.data) {
      const route = response.data;
      saveUser(signupinfo.username);
      navigate(route);
    } else if (response.status === 500) {
      console.log("user exists");
    }
  } catch (error) {
    console.log(error);
  }
};
const loginUser = async (logininfo, navigate, saveUser) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/login",
      logininfo
    );
    if (response) {
      const route = response.data;
      saveUser(logininfo.username);
      navigate(route);
    } else {
      console.log("invalid username or password");
    }
  } catch (error) {
    console.log(error);
  }
};

const logout = async (saveUser, navigate) => {
  try {
    const response = await axios.get(process.env.REACT_APP_API_URL + "/logout");
    if (response) {
      const route = response.data;
      saveUser(null);
      navigate(route);
    }
  } catch (error) {
    console.log(error);
  }
};
const changePassword = async (
  oldAndNewPasswords,
  userLoggedIn,
  setPasswordErrorMessage,
  setLoginInfoFormCompletion
) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/changepassword",
      {
        ...oldAndNewPasswords,
        userLoggedIn,
      }
    );
    if (response.data === "successfully change password") {
      setPasswordErrorMessage("successfully changed password✅");
      setTimeout(() => setLoginInfoFormCompletion(true), 4000);
    } else if (response.data.name === "IncorrectPasswordError") {
      setPasswordErrorMessage("initial Password is incorrect");
      console.log("frontend", response);
    }
  } catch (error) {
    console.log(error);
  }
};

export {
  getShopData,
  fetchBrands,
  fetchTrending,
  fetchNewArrival,
  fetchUserInfo,
  registerUser,
  loginUser,
  logout,
  changePassword,
};
