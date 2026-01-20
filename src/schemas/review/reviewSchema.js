import * as yup from "yup";
export const reviewSchema = yup.object({
  review: yup
    .string()
    .required("يرجى ادخال مراجعتك")
    .max(700, "المراجعة يجب ان لا تزيد عن 700 حرف")
    .min(20, "المراجعة يجب ان تزيد عن 20 حرف"),
});
