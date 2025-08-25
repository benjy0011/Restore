import { useForm } from "react-hook-form";
import { useRegisterMutation } from "./accountApi"
import { registerSchema, type RegisterSchema } from "../../lib/schemas/registerShema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, IconButton, Paper, TextField, Typography } from "@mui/material";
import { VisibilityOutlined, VisibilityOffOutlined, PermIdentity } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { handleApiError } from "../../lib/util";

export const RegisterForm = () => {
  const [ registerUser, { isLoading } ] = useRegisterMutation();
  const { register, handleSubmit, setError, formState: {errors, isValid} } = useForm<RegisterSchema>({
    mode: 'onTouched',
    resolver: zodResolver(registerSchema)
  })

  const onSubmit = async (data: RegisterSchema) => {
    try {
      await registerUser(data).unwrap();
    } catch (error) {
      // const apiError = error as { message: string };
      // if (apiError.message && typeof apiError.message === 'string') {
      //   const errorArray = apiError.message.split(',');

      //   // can only set one error each time
      //   errorArray.forEach(e => {
      //     if (e.toLowerCase().includes('password')) {
      //       setError('password', {message: e})
      //     } else if (e.toLowerCase().includes('email')) {
      //       setError('email', {message: e})
      //     }
      //   })
      // }
      console.log(error);

      handleApiError<RegisterSchema>(
        error,
        setError,
        ["email", "password"]
      )
    }
  }

  const [ showPassword, setShowPassword ] = useState<boolean>(false);

  return (
    <Container
      component={Paper}
      maxWidth='sm'
      sx={{
        borderRadius: 3
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8
        }}
      >
        <PermIdentity color="primary" sx={{ mt: 3, fontSize: 40, }}/>

        <Typography variant="h5">
          Register
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            my: 3
          }}
        >
          <TextField 
            fullWidth
            label="Email"
            autoFocus
            autoComplete="email"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField 
            fullWidth
            label="Password"
            autoComplete="current-password"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            type={showPassword ? "text" : "password"}
            slotProps={{
              input: {
                endAdornment: (
                  <IconButton
                    color={showPassword ? "primary" : "default"}
                    onClick={() => setShowPassword(prev => !prev)}
                  >
                    {showPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                  </IconButton>
                )
              }
            }}
          />

          <Button type="submit" loading={isLoading} disabled={!isValid}>
            Sign Up
          </Button>

          <Typography sx={{ textAlign: 'center' }}>
            Already have an account?&nbsp;
              <Typography component={Link} to='/login' color='primary'>
                Sign in here
              </Typography>
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}