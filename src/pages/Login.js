const React = require('react');
const { useState, useEffect } = require('react');
const { Link, useNavigate } = require("react-router-dom");
const jwtDecode = require("jwt-decode");


const Login = () => {
  const [error, setError] = useState({ username: "", password: "" });
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });

  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const navigate = useNavigate();

  const onLogin = (e) => {
    // console.log(" on loging -------------------");
    // console.log(isLoggedIn);
    // e.preventDefault();
    // setError(false);
    // setLoading(true);

    // if (loginForm.username.length <= 0) {
    //   setLoading(false);
    //   return setError({ username: "Please Enter username Address" });
    // }
    // if (loginForm.password.length <= 0) {
    //   setLoading(false);
    //   return setError({ password: "Please Enter Password" });
    // }

    // client.login(loginForm.username, loginForm.password)
    //   .then(() => {
    //     navigate('/');
    //   })
    //   .catch((err) => {
    //     setLoading(false);
    //     setError(true);
    //     console.log(err);
    //     alert('Invalid credentials');
    //   });
    // setIsLoggedIn(true);
  };

  useEffect(() => {
    const tokenString = localStorage.getItem("token");
    console.log("In Login useEffect items", localStorage);
    if (tokenString) {
      console.log("Is valid");
      const token = JSON.parse(tokenString);
      const isAccessTokenValid =
        JSON.stringify(token) !== JSON.stringify({ error: "invalid credentials" });
      console.log("is Access", isAccessTokenValid);
      if (isAccessTokenValid) {
        const decodedAccessToken = jwtDecode(token.access_token);
        setIsLoggedIn(true);
      }
    }
  }, []);

  const handleLogout = () => {
    // client.logout();
    setIsLoggedIn(false);
    // navigate('/login');
  };

  const handleLogin = () => {
    // navigate("/login");
  };

//   let displayButton;
//   const buttonStyle = "inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0";

//   if (isLoggedIn) {
//     displayButton = <button className={buttonStyle} onClick={() => handleLogout()}>Logout</button>;
//   } else {
//     displayButton = <button className={buttonStyle} onClick={() => handleLogin()}>Login</button>;
//   }

  return (
    <div><span>Login Page</span> </div>
  );
};

export default Login;

