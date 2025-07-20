import { LockOutline, VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material"
import { Box, Button, Container, IconButton, Paper, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { Link } from "react-router-dom"

const LoginForm = () => {
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
          />

          <TextField 
            fullWidth
            label="Password"
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

          <Button>
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