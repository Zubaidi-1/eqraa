import * as yup from "yup";

export const ListingSchema = yup.object({
  name: yup
    .string()
    .required("يرجى ادخال عنوان الكتاب")
    .min(2, "عنوان الكتاب يجب ان يكون حرفين على الاقل")
    .max(60, "عنوان الكتاب يجب ان لا يزيد عن 30 حرف"),

  category: yup
    .string()
    .required("يرجى ادخال نوع الكتاب")
    .oneOf(
      [
        "روايات",
        "تطوير الذات",
        "تاريخ",
        "علوم دينية",
        "كتب اطفال",
        "كتب جامعية",
        "اخر",
      ],
      "يرجى ادخال نوع صحيح"
    ),
  isbn: yup
    .string()
    .nullable()
    .notRequired()
    .test("isbn-length", "رقم الكتاب يجب أن يكون 10 أو 13 رقمًا", (value) => {
      if (!value) return true; // optional field
      return value.length === 10 || value.length === 13;
    }),
  phone_number: yup.string().required("يرجى ادخال رقم الهاتف"),
  price: yup
    .number()
    .max(120, "السعر لا يجب ان يتجاوز 120 دينار")
    .required(" يرجى ادخال السعر المراد"),
  buy_or_trade: yup
    .string()
    .required("يرجى تحديد كيفية البيع")
    .oneOf(["بيع", "البدل"], "يرجى تحديد بيع او بدل"),
  delivery: yup
    .string()
    .required("يرجى تحديد امكانية التوصيل")
    .oneOf(["نعم", "لا"], "يرجى تحديد ب نعم او لا"),
  author: yup.string().required("يرجى ادخال المؤلف"),
  display_name: yup
    .string()
    .min(3, "الاسم يجب ان يزيد عن 3 احرف")
    .max(60, "الاسم يجب ان لا يزيد عن 60 حرف")
    .required("يرجى ادخال الاسم"),
});
