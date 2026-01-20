import * as yup from "yup";

export const registerSchema = yup.object({
  email: yup
    .string()
    .email("البريد الالكتروني غير صالح")
    .required("الرجاء ادخال بريد الكتروني"),

  name: yup
    .string()
    .min(3, "الاسم يجب ان يزيد عن 3 احرف")
    .max(30, "الاسم يجب ان لا يزيد عن 30 حرف")
    .required("الرجاء ادخال اسم"),

  password: yup
    .string()
    .required("الرجاء ادخال كلمة السر")
    .min(8, "كلمة السر يجب ان تكون 8 احرف على الاقل")
    .max(17, "كلمة السر يجب ان لا تزيد عن 17 حرف")
    .matches(/[a-z]/, "يجب ان تحتوي على حرف صغير")
    .matches(/[A-Z]/, "يجب ان تحتوي على حرف كبير")
    .matches(/\d/, "يجب ان تحتوي على رقم")
    .matches(/[@#$!%*?&]/, "يجب ان تحتوي على رمز خاص"),

  confirm_password: yup
    .string()
    .required("الرجاء تأكيد كلمة السر")
    .oneOf([yup.ref("password")], "كلمتا السر غير متطابقتين"),
});

export const signinSchema = yup.object({
  email: yup
    .string()
    .email("البريد الالكتروني غير صالح")
    .required("الرجاء ادخال بريد الكتروني"),
  password: yup.string().required("الرجاء ادخال كلمة السر"),
});
