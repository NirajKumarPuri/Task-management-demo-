import React, { useEffect, useState } from "react";
import styles from "./login.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
const getData = () => {
  const data = JSON.parse(window.localStorage.getItem("item"));
  if (data) {
    return data;
  } else {
    return [];
  }
};

const resetValue = {
  name: "",
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [item, setItem] = useState(getData());
  const [formData, setFormData] = useState(resetValue);
  const [newProfile, setNewProfile] = useState(false);
  const [cuurentId, setCurrentId] = useState();
  const [toggle, setToggle] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  // useEffect(() => {
  //   setFormData({
  //     ...formData,
  //     name: state?.name ? state.name : "",
  //     email: state?.email ? state.email : "",
  //     password: state?.password ? state.password : "",
  //   });
  //   setCurrentId(state?.id ? state.id : "");
  //   setToggle(state?.name ? false : true);
  // }, [state]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  useEffect(() => {
    window.localStorage.setItem("item", JSON.stringify(item));
    console.log("item", item);
    if (newProfile) {
      navigate(`/dashboard`, { state: formData });
      // setFormData({ ...formData, name: "", email: "", password: "" });
    }
  }, [item, newProfile]);

  const signUp = (e) => {
    e.preventDefault();
    const existingUser = item.find(
      (user) =>
        user.email === formData.email && user.password === formData.password
    );

    if (!formData.email || !formData.name || !formData.password) {
      alert("please inter the value");
    } else if (
      formData.name &&
      formData.email &&
      formData.password &&
      existingUser
    ) {
      alert("Account already exist please SignIn");
      navigate(`/Signup`);
    } else if (
      formData.name &&
      formData.email &&
      formData.password &&
      !toggle
    ) {
      setItem(
        item?.map((item) => {
          if (item.id == cuurentId) {
            return {
              ...item,
              name: formData.name,
              email: formData.email,
              password: formData.password,
            };
          }
          return item;
        })
      );
      setCurrentId("");
      // setFormData({ ...formData, name: "", email: "", password: "" });
      // setToggle(true);
      // setNewProfile(true);
    } else {
      const newObject = {
        id: new Date().getTime().toString(),
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };
      setItem([...item, newObject]);
      setNewProfile(true);
    }
  };

  console.log("state===>", formData);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.box_one}>
          <div className={styles.contentSection}>
            <h3>Welcome To</h3>
            <div className={styles.logo}>
              <div className={styles.companyLogo}>
                <img src={logo} alt="logo" className={styles.logoimage} />
              </div>
            </div>

            <h1 className={styles.headertext}>Company Name</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry Lorem Ipsum is simply dummy text of the printing and
              typesetting industry Lorem Ipsum is simply dummy text of the
              printing and typesetting
            </p>
            <p className={styles.footer}>OREATOR HERE | DESGINER HERE</p>
          </div>
        </div>
        <div className={styles.box_two}>
          <h2 className={styles.header}>Create New Account</h2>
          <div className={styles.form_box}>
            <form onSubmit={signUp}>
              <div className={styles.emailBox}>
                <label>
                  <b>Name</b>
                </label>
                <input
                  className={styles.input}
                  placeholder="Enter your name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                ></input>
              </div>
              <div className={styles.emailBox}>
                <label>
                  <b>Email Address</b>
                </label>
                <input
                  className={styles.input}
                  placeholder="Enter your email"
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                ></input>
              </div>
              <div className={styles.passwardBox}>
                <label>
                  <b>Password</b>
                </label>
                <input
                  className={styles.input}
                  placeholder="Enter your password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                ></input>
              </div>
              <div className={styles.checkedboxcantainer}>
                <input
                  type="checkbox"
                  checked={isChecked}
                  className={styles.checkInput}
                  onChange={handleCheckboxChange}
                  id="checkbox1"
                />
                <label>
                  {" "}
                  By Login Up. I Agree with <a href="#">Terms & condition</a>
                </label>
              </div>
              <div className={styles.btnBox}>
                <div className={styles.buttonBox}>
                  <button type="submit" className={styles.signInBtn}>
                    Login
                  </button>
                </div>
                <div style={{ marginTop: "10px", marginBottom: "20px" }}>
                  account already exist ? <a href="/signup">signIn</a>
                </div>
              </div>
            </form>
            {/* <div>
              <button className={styles.signUpBtn} onClick={signUp}>
                {toggle ? "Sign Up" : "Edit Done"}
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
