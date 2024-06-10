import * as Yup from "yup";

export const createValidation = Yup.object().shape({
  title: Yup.string()
    .required("Введите название!")
    .min(3, "Слишком короткое название!")
    .max(40, "Слишком длинное название!"),
  description: Yup.string()
    .min(20, "Введите описание хотя бы длинной 20 символов")
    .max(300, "Введите описание не более 300 символов"),
});
