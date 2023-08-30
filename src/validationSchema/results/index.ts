import * as yup from 'yup';

export const resultValidationSchema = yup.object().shape({
  result_data: yup.string().required(),
  algorithm_id: yup.string().nullable().required(),
  excel_data_id: yup.string().nullable().required(),
});
