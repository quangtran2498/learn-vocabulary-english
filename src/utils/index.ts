import * as  Yup from 'Yup';

 const loginValidate = Yup.object().shape({
    userName: Yup
      .string()
      .default("")
      .strict(true)
      .required("userName không được bỏ trống"),
    password: Yup.string().required("password là bắt buộc").default(""),

  });

  const signUpValidate = Yup.object().shape({
    userName: Yup
      .string()
      .default("")
      .strict(true)
      .required("userName không được bỏ trống"),
    email: Yup.string().required("password là bắt buộc").default(""),
    password: Yup.string().required("password là bắt buộc").default(""),
  });

  export {loginValidate,signUpValidate}