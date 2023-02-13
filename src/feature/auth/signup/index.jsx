import { Stack, Paper, Box } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import RHFTextField from "components/hook-forms/RHFTextField";
import { Company, Links, StyledGrid, StyledGridItem, StyledLink, Title, Content } from "./styled";
import * as authApi from "api/auth";
import { useSnackbar } from "notistack";
import Button from "components/Button";
import { useRouter } from "next/router";
import Image from "next/image";

const SignUp = () => {
  const [loading, setLoading] = useState();
  const { control, handleSubmit } = useForm();
  const router = useRouter({});
  const { enqueueSnackbar } = useSnackbar();

  const signup = handleSubmit(async (values) => {
    setLoading(true);
    const signResponse = await authApi.signup(values.email, values.password);
    if (signResponse.error) enqueueSnackbar(signResponse.error.message, { variant: "error" });
    else {
      const loginResponse = await authApi.login(values.email, values.password);
      if (loginResponse.error) enqueueSnackbar(loginResponse.error.message, { variant: "error" });
      else router.push("/create-account");
    }
    setLoading(false);
  });

  return (
    <Paper elevation={5}>
      <Content>
        <StyledGrid container spacing={2}>
          <StyledGridItem item xs={12} md={7}>
            <Company variant="h5">Tinnitus pal</Company>
            <Title variant="h4">Create account</Title>
            <Stack spacing={2} sx={{ width: "100%" }}>
              <RHFTextField name="email" control={control} label="Email" />
              <RHFTextField name="password" control={control} label="Password" type="password" />
              <RHFTextField
                name="confirmPassword"
                control={control}
                label="Confirm Password"
                type="password"
                sx={{ mb: 2 }}
              />
              <Button size="large" onClick={signup} loading={loading}>
                Create
              </Button>
            </Stack>
            <Links onClick={() => router.push("/login")}>
              <StyledLink fontWeight={500}>Already have a account? Login</StyledLink>
            </Links>
          </StyledGridItem>
          <StyledGridItem item xs={12} md={5}>
            <Box sx={{ position: "relative", width: "100%", height: 300 }}>
              <Image src="/assets/auth-background.png" alt="Logo" fill style={{ objectFit: "contain" }} />
            </Box>
          </StyledGridItem>
        </StyledGrid>
      </Content>
    </Paper>
  );
};

export default SignUp;
