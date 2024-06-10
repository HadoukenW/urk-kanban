import * as Yup from "yup";

export const EditProjectValidation = Yup.object().shape({
  title: Yup.string()
    .required("Название необходимо!")
    .min(3, "Слишком короткое название!")
    .max(40, "Название должно быть максимум 40 символов!"),
  description: Yup.string()
    .min(10, "Описание должно быть хотя бы 10 символов")
    .max(200, "Описание не должно превышать 200 символов"),
});
