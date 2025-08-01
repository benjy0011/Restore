import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, Typography } from "@mui/material"
import { useLazyGet400ErrorQuery, useLazyGet401ErrorQuery, useLazyGet404ErrorQuery, useLazyGet500ErrorQuery, useLazyGetValidationErrorQuery } from "./errorApi"
import { useState } from "react";

const AboutPage = () => {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const [trigger400Error]  = useLazyGet400ErrorQuery();
  const [trigger401Error]  = useLazyGet401ErrorQuery();
  const [trigger404Error]  = useLazyGet404ErrorQuery();
  const [trigger500Error]  = useLazyGet500ErrorQuery();
  const [triggerValidationError]  = useLazyGetValidationErrorQuery();

  const getValidationError = async () => {
    try {
      await triggerValidationError().unwrap();
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'message' in error && typeof (error as {message: unknown}).message === 'string') {
        const errorArray = (error as {message: string}).message.split(', ');
        setValidationErrors(errorArray);
      }
      
    }
  }

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
          // onClick={
          //   () => triggerValidationError()
          //     .unwrap()
          //     .catch(err => console.log("Validation Button trigger: ", err))
          // }
          onClick={getValidationError}
        >
          Test Validation Error
        </Button>
      </ButtonGroup>
      {validationErrors.length > 0 && (
        <Alert severity="error">
          <AlertTitle>Validation Errors</AlertTitle>
          <List>
            {validationErrors.map(err => (
              <ListItem key={err}>{err}</ListItem>
            ))}
          </List>
        </Alert>
      )}
    </Container>
  )
}
export default AboutPage