// import { useDispatch, useSelector } from "react-redux"
import { 
  decrement, 
  // decrementLegacy, 
  increment, 
  // incrementLegacy, 
  // type CounterState 
} from "./counterReducer";
import { Button, ButtonGroup, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/store";

const ContactPage = () => {
  // const data = useSelector((state: CounterState) => state.data);
  // const dispatch = useDispatch();
  const data = useAppSelector(state => state.counter.data);
  const dispatch = useAppDispatch();

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
            // dispatch(decrementLegacy(1))
            dispatch(decrement(1))
          }}
        >
          Decrement
        </Button>

        <Button 
          color='success'
          onClick={() => {
            // dispatch(incrementLegacy(1))
            dispatch(increment(1))
          }}
        >
          Increment
        </Button>

        <Button 
          color='primary'
          onClick={() => {
            // dispatch(incrementLegacy(5))
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