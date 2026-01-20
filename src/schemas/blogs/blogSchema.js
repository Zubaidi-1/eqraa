import * as yup from "yup";

export const addBlogSchema = yup.object({
  title: yup
    .string()
    .required("العنوان مطلوب")
    .max(50, "العنوان يجب ان لا يزيد عن 50 حرف")
    .min(3, "العنوان يجب ان يزيد عن 3 احرف"),
  body: yup
    .string()
    .required("نص الموضوع مطلوب")
    .min(100, "النص يجب ان يزيد عن 100 حرف")
    .max(5000, "المقال يجب ان لا يزيد عن 5000 حرف"),
});
