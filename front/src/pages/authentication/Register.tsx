import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import {
  SocialIconButton,
  TextFieldWrapper,
} from "../../components/authentication/StyledComponents";
import FlexBox from "../../components/FlexBox";
import LightTextField from "../../components/LightTextField";
import { H1, H3, Small } from "../../components/Typography";
import { useFormik } from "formik";
import useAuth from "../../hooks/useAuth";
import FacebookIcon from "../../icons/FacebookIcon";
import GoogleIcon from "../../icons/GoogleIcon";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import useApi from "../../hooks/useApi";

const Register: FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    role : "USER",
    terms: true,
    submit: null,
  };

  // form field value validation schema
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("Un prénom est requis."),
    lastname: Yup.string().required("Un nom est requis."),
    email: Yup.string()
      .email("L'email doit être valide.")
      .max(255)
      .required("Un email est requis."),
    password: Yup.string()
      .min(6, "Le mot de pasase doit comporter 6 caractères minimum.")
      .required("Un mot de passe est requis."),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], "Les mots de passe ne sont pas concordant.")
      .required("La confirmation du mot de passe est requise."),
  });

  const {
    errors,
    values,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values: any) => {
      setLoading(true);
      try {
        if (values.password !== values.passwordConfirmation) {
          setError("Le mot de passe et la confirmation du mot de passe ne sont pas concordant"); 
          setLoading(false);
        } else {
            const response = await api.addUser({
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        password: values.password,
        role: values.role,
            });

          if (response.status === 201) {
            setLoading(false);
            toast.success("Félicitation vous êtes inscrit !");
            navigate("/dashboard");
          } else {
            setError("Erreur lors de l'inscription");
        setLoading(false);
          } 
        }
      } catch (error: any) {
        setError(error?.message);
        setLoading(false);

      }
    },
  });

  const boutonStyle = {
  backgroundColor: 'black', 
  color: 'white'
  };
  
  const api = useApi();


  return (
    <FlexBox
      sx={{
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        height: { sm: "100%" },
      }}
    >
      <Card sx={{ padding: 4, maxWidth: 600, boxShadow: 1 }}>
        <FlexBox
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
          mb={1}
        >
          <Box width={150} mb={1}>
            <img src="/static/logo/logo.svg" width="100%" alt="Uko Logo" />
          </Box>
        </FlexBox>

        <FlexBox justifyContent="space-between" flexWrap="wrap" my="1rem">
          <form noValidate onSubmit={handleSubmit} style={{ width: "100%" }}>
            <FlexBox justifyContent="space-between" flexWrap="wrap">
              <TextFieldWrapper>
                <LightTextField
                  fullWidth
                  name="firstname"
                  type="text"
                  label="Prénom"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstname || ""}
                  error={Boolean(touched.firstname && errors.firstname)}
                  helperText={touched.firstname && errors.firstname}
                />
              </TextFieldWrapper>

              <TextFieldWrapper>
                <LightTextField
                  fullWidth
                  name="lastname"
                  type="text"
                  label="Nom"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastname || ""}
                  error={Boolean(touched.lastname && errors.lastname)}
                  helperText={touched.lastname && errors.lastname}
                />
              </TextFieldWrapper>

              <TextFieldWrapper sx={{ mt: 2, width: "100%" }}>
                <LightTextField
                  fullWidth
                  name="email"
                  type="email"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email || ""}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
              </TextFieldWrapper>
            </FlexBox>

            <TextFieldWrapper sx={{ mt: 2, width: "100%" }}>
              <LightTextField
                fullWidth
                name="password"
                type="password"
                label="Mot de passe"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password || ""}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />
            </TextFieldWrapper>

            <TextFieldWrapper sx={{ mt: 2, width: "100%" }}>
              <LightTextField
                fullWidth
                name="passwordConfirmation"
                type="password"
                label="Confirmation du mot du passe"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.passwordConfirmation || ""}
                error={Boolean(
                  touched.passwordConfirmation && errors.passwordConfirmation
                )}
                helperText={
                  touched.passwordConfirmation && errors.passwordConfirmation
                }
              />
            </TextFieldWrapper>
            {error && (
              <FormHelperText
                error
                sx={{
                  mt: 2,
                  fontSize: 13,
                  fontWeight: 500,
                  textAlign: "center",
                }}
              >
                {error}
              </FormHelperText>
            )}

          <Box sx={{ mt: 4 }}>
              {loading ? (
                <LoadingButton loading fullWidth variant="contained">
                  S'Inscrire
                </LoadingButton>
              ) : (
                <Button fullWidth type="submit" variant="contained" style={boutonStyle}>
                 S'Inscrire
                </Button>
              )}
            </Box>
          </form>

          <Small margin="auto" mt={3} color="text.disabled">
            Vous avez déjà un compte?{" "}
            <Link to="/login">
              <Small color="primary.main">Se Connecter </Small>
            </Link>
          </Small>
        </FlexBox>
      </Card>
    </FlexBox>

    
    
  );
};

export default Register;