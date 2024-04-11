import * as yup from 'yup';

// yup schemas

const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/;

export const signinSchema = yup.object({
  email: yup.string().email().required('* email is required').trim(),
  password: yup.string().required('* required').trim(),
});

export const signUpSchema = yup.object({
  name: yup
    .string()
    .required('* required')
    .min(2, '* must contain atleast 2 characters')
    .max(25, '* must not contain more than 25 characters')
    .trim(),
  email: yup.string().email().required('* email is required').trim(),
  password: yup
    .string()
    .required('* required')
    .matches(
      passwordRules,
      '* Password must contain 1 UpperCase, 1 Lowercase, 1 special characters and 1 number',
    ),
  cpassword: yup
    .string()
    .required('* required')
    .oneOf([yup.ref('password')], '* Passwords must match'),
});

export const AddEditCategorySchema = yup.object({
  parentCategory: yup
    .string()
    .required('* required')
    .min(2, '* must contain atleast 2 characters')
    .max(25, '* must not contain more than 25 characters')
    .trim(),
});

export const AddEditSubAdminSchema = yup.object({
  name: yup
    .string()
    .required('* required')
    .min(2, '* must contain atleast 2 characters')
    .max(25, '* must not contain more than 25 characters')
    .trim(),
  email: yup.string().email().required('* email is required').trim(),
  password: yup
    .string()
    .required('* required')
    .matches(
      passwordRules,
      '* Password must contain 1 UpperCase, 1 Lowercase, 1 special characters and 1 number',
    ),
  cpassword: yup
    .string()
    .required('* required')
    .oneOf([yup.ref('password')], '* Passwords must match'),
  parentCategory: yup.string().required('* required'),
});
