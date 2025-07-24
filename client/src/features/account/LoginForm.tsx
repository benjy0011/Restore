import { LockOutline, VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material"
import { Box, Button, Container, IconButton, Paper, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { loginSchema, type LoginSchema } from "../../lib/schemas/loginSchema"
import { zodResolver } from "@hookform/resolvers/zod";
import { useLazyUserInfoQuery, useLoginMutation } from "./accountApi"

const LoginForm = () => {
  const [ login, { isLoading } ] = useLoginMutation();
  const [ fetchUserInfo ] = useLazyUserInfoQuery();
  const { register, handleSubmit, formState: {errors} } = useForm<LoginSchema>({
    mode: 'onTouched', // validation will kick in once lost focus
    resolver: zodResolver(loginSchema)
  });

  const location = useLocation();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginSchema) => {
    await login(data);
    await fetchUserInfo();
    navigate(location.state?.from || '/catalog');
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
        <LockOutline color="primary" sx={{ mt: 3, fontSize: 40, }}/>

        <Typography variant="h5">
          Sign In
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
            // {...register('email', {required: 'Email is required'})} // no longer need if import zod resolver
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField 
            fullWidth
            label="Password"
            autoComplete="current-password"
            // {...register('password', {required: 'Password is required'})}
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

          <Button type="submit" loading={isLoading}>
            Sign In
          </Button>

          <Typography sx={{ textAlign: 'center' }}>
            Don't have an account?&nbsp;
              <Typography component={Link} to='/register' color='primary'>
                Sign up
              </Typography>
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}
export default LoginForm