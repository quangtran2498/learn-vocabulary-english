import { makeStyles } from "@mui/styles";
import { FastField, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { TextField } from "../../components/common/form/inputField";
import { path } from "../../contant/path";
import { loginValidate } from "../../utils";
import { LoginReqI } from "../../types/auth";
import { LoginApi } from "../../service/login";
import { store } from "../../redux";
import { setToken } from "../../redux/slice/auth";
import httpsService from "../../service/httpsService";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      height: "100vh",
      background:
        "linear-gradient(90deg, rgba(0,36,34,0.9921218487394958) 0%, rgba(9,107,121,1) 34%, rgba(0,212,255,1) 100%)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    content: {
      width: "500px",
      background: "#fff",
      borderRadius: "16px",
      margin: "0 auto",
    },
    title: {
      textAlign: "center",
      padding: "24px 0",
      borderBottom: "1px solid #ccc",
      margin: "0",
    },
    rootForm: {
      padding: "24px",
    },
    btn: {
      background: "#0284c7",
      width: "80%",
      padding: "16px",
      borderRadius: "24px",
      border: "none",
      color: "#fff",
      fontWeight: 600,
      fontSize: "18px",
    },
    rootBtn: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "24px",
    },
    textSignIn: {
      color: "#333",
      textAlign: "center",
    },
    textForgetPass: {
      color: "#666666",
    },
    textLink: {
      color: "#0284c7",
      cursor: "pointer",
    },
  };
});

const initialValue = {
  userName: "",
  password: "",
};

const Login = () => {

  const classes = useStyles();
  const navigate = useNavigate()
  const navigateSignUp = () => {
    navigate(path.signUp)
  }

  const callLogin = async (body:LoginReqI) => {

    try {
      const res = await LoginApi(body)
      
      store.dispatch(setToken(`${res.data.access_token}`))
      localStorage.setItem("token", res.data.access_token)
      httpsService.attachTokenToHeader(res.data.access_token)
      navigate(path.home)

    }catch {

    }
  }
  
  return (
    <div className={classes.root} style={{}}>
      <div className={classes.content}>
        <h1 className={classes.title}>Đăng nhập</h1>
        <div className={classes.rootForm}>
          <Formik
            initialValues={initialValue}
            onSubmit={() => {}}
            validationSchema={loginValidate}
          >
            {(formik) => {

              const body = {
                name:formik.values.userName,
                password:formik.values.password,
              }
              
              return (
                <Form>
                  <div className="">
                    <div className="" style={{marginBottom:"16px"}}>
                      <FastField
                        component={TextField}
                        placeholder="Tên đăng nhập"
                        {...formik.getFieldProps("userName")}
                        label={"Tên đăng nhập"}
                      />
                    </div>
                    <div className="">
                      <FastField
                        component={TextField}
                        placeholder="Mật khẩu"
                        {...formik.getFieldProps("password")}
                        label={"Mật khẩu"}
                      />
                    </div>
                    <p className={classes.textForgetPass}>Quên mật khẩu ?</p>
                    <div className={classes.rootBtn}>
                      <button className={classes.btn} onClick={() => callLogin(body)}>Đăng nhập</button>
                    </div>
                    <p className={classes.textSignIn}>Bạn chưa có tài khoản <span className={classes.textLink} onClick={navigateSignUp} >Đăng kí</span></p>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
