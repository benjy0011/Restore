import { useDispatch, useSelector } from "react-redux"
import { decrement, increment, type CounterState } from "./counterReducer";
import { Button, ButtonGroup, Typography } from "@mui/material";

const ContactPage = () => {
  const data = useSelector((state: CounterState) => state.data);
  const dispatch = useDispatch();

  return (
    <>
      <Typography variant="h2">
        Contact Page
      </Typography>
      <Typography variant="body1" >
        The data is: {data}
      </Typography>

      <ButtonGroup >
        <Button
          color='error'
          onClick={() => {
            dispatch(decrement())
          }}
        >
          Decrement
        </Button>

        <Button 
          color='success'
          onClick={() => {
            dispatch(increment())
          }}
        >
          Increment
        </Button>

        <Button 
          color='primary'
          onClick={() => {
            dispatch(increment(5))
          }}
        >
          Add 5
        </Button>
      </ButtonGroup>
    </>
    
  )
}
export default ContactPage