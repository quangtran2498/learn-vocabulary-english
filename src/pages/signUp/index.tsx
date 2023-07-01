import { makeStyles } from "@mui/styles";
import { FastField, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { TextField } from "../../components/common/form/inputField";
import { path } from "../../contant/path";
import { CreateNewUser } from "../../service/create-user";
import { CreateNewUserReqI } from "../../types/users";
import { signUpValidate } from "../../utils";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      ...theme.custom?.flexBox.centerCenter,
      height: "100vh",
      background:
        "linear-gradient(90deg, rgba(0,36,34,0.9921218487394958) 0%, rgba(9,107,121,1) 34%, rgba(0,212,255,1) 100%)",
        backgroundColor:"red"
    },
    content: {
      width: "500px",
      background: "#fff",
      borderRadius: "16px",
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
    btn:{
      background:"#0284c7",
      width:"80%",
      padding:"16px",
      borderRadius:"24px",
      border:"none",
      color:"#fff",
      fontWeight:600,
      fontSize:"18px"    
    },
    rootBtn:{
      ...theme.custom?.flexBox.horizontalCenter,
      marginBottom:"24px"
    },
    textSignIn:{
       color:"#333",
       textAlign:"center"
    },
    textForgetPass:{
      color:"#666666"
    },
    textLink:{
      color:"#0284c7",
      cursor:"pointer"
    }
  };
});

const initialValue = {
  userName: "",
  email:"",
  password: "",
};

const SignUp = () => {

  const classes = useStyles();
  const navigate = useNavigate()
  const navigateLogin = () => {
    navigate(path.login)
  }
  
  const callCreateNewUser = async (body:CreateNewUserReqI) => {

    try {
      const res = await CreateNewUser(body)
      navigate(path.login)

    }catch {

    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <h1 className={classes.title}>Đăng kí</h1>
        <div className={classes.rootForm}>
          <Formik
            initialValues={initialValue}
            onSubmit={() => {}}
            validationSchema={signUpValidate}
          >
            {(formik) => {

              const body = {
                name:formik.values.userName,
                password:formik.values.password,
                email:formik.values.email
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
                    <div className="">
                      <FastField
                        component={TextField}
                        placeholder="Email"
                        {...formik.getFieldProps("email")}
                        label={"Email"}
                      />
                    </div>
                    <p className={classes.textForgetPass}>Quên mật khẩu ?</p>
                    <div className={classes.rootBtn}>
                      <button className={classes.btn} onClick={() => callCreateNewUser(body)}>Đăng kí</button>
                    </div>
                    <p className={classes.textSignIn}>Bạn chưa có tài khoản <span className={classes.textLink} onClick={navigateLogin}>Đăng nhập</span></p>
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

export default SignUp;
