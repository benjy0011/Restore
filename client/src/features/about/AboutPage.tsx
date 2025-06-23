import { Button, ButtonGroup, Container, Typography } from "@mui/material"
import { useLazyGet400ErrorQuery, useLazyGet401ErrorQuery, useLazyGet404ErrorQuery, useLazyGet500ErrorQuery, useLazyGetValidationErrorQuery } from "./errorApi"

const AboutPage = () => {
  const [trigger400Error]  = useLazyGet400ErrorQuery();
  const [trigger401Error]  = useLazyGet401ErrorQuery();
  const [trigger404Error]  = useLazyGet404ErrorQuery();
  const [trigger500Error]  = useLazyGet500ErrorQuery();
  const [triggerValidationError]  = useLazyGetValidationErrorQuery();

  return (
    <Container maxWidth='lg'>
      <Typography
        gutterBottom
        variant="h3"
      >
        Errors for testing
      </Typography>

      <ButtonGroup
        variant="contained"
        fullWidth
      >
        <Button
          variant="contained"
          onClick={
            () => trigger400Error()
              .unwrap()
              .catch(err => console.log("400 Button trigger: ", err))
          }
        >
          Test 400 Error
        </Button>

        <Button
          variant="contained"
          onClick={
            () => trigger401Error()
              .unwrap()
              .catch(err => console.log("401 Button trigger: ", err))
          }
        >
          Test 401 Error
        </Button>

        <Button
          variant="contained"
          onClick={
            () => trigger404Error()
              .unwrap()
              .catch(err => console.log("404 Button trigger: ", err))
          }
        >
          Test 404 Error
        </Button>

        <Button
          variant="contained"
          onClick={
            () => trigger500Error()
              .unwrap()
              .catch(err => console.log("500 Button trigger: ", err))
          }
        >
          Test 500 Error
        </Button>

        <Button
          variant="contained"
          onClick={
            () => triggerValidationError()
              .unwrap()
              .catch(err => console.log("Validation Button trigger: ", err))
          }
        >
          Test Validation Error
        </Button>
      </ButtonGroup>
    </Container>
  )
}
export default AboutPage