import * as Yup from "yup";

export const registerValidation = Yup.object().shape({
  username: Yup.string()
    .required("Придумайте имя!")
    .min(3, "Слишком короткое имя")
    .max(15, "Слишком длинное имя"),
  email: Yup.string()
    .email("Введите корректный адрес!")
    .required("Не забудьте ввести почту!"),
  password: Yup.string()
    .required("Введите пароль!")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
      "Включите хотя бы одну букву верхнего регистра, одну маленького регистра и одну цифру."
    ),
});

export const loginValidation = Yup.object().shape({
  email: Yup.string()
    .email("Неверная почта")
    .required("Введите почту!"),
  password: Yup.string().required("Введите пароль!"),
});
