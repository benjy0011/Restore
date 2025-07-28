import { Box, Button, Paper, Step, StepLabel, Stepper } from "@mui/material";
import { useRef, useState } from "react"
import { CSSTransition, SwitchTransition } from "react-transition-group";

import './CheckoutStepper.css'

const steps = ['Address', 'Payment', 'Review'];

// const CustomStepIcon = (props: StepIconProps) => (
//   <StepIcon
//     {...props}
//     sx={{
//       '& .MuiStepIcon-text': {
//         fontFamily: 'Roboto'
//       }
//     }}
//   />
// );

const CheckoutStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const nodeRef = useRef<HTMLDivElement | null>(null);

  const handleNext = () => {
    setActiveStep(step => {
      if (step < steps.length - 1) {
        setDirection('forward');
        return step + 1;
      }
      return step;
    });
  }

  const handleBack = () => {
    setActiveStep(step => {
      if (step > 0) {
        setDirection('backward');
        return step - 1;
      }
      return step;
    });
  }

  const handleStep = (step: number) => {
    setDirection(step > activeStep ? 'forward' : 'backward');
    setActiveStep(step);
  }

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 3
      }}
    >
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          return (
            <Step key={`${index}-${label}`}>
              <StepLabel
              onClick={() => handleStep(index)}
              sx={{ cursor: 'pointer' }}
                // slots={{ stepIcon: CustomStepIcon }}
              >{label}</StepLabel>
            </Step>
          )
        })}
      </Stepper>
      
      
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={activeStep}
          nodeRef={nodeRef}
          timeout={200}
          classNames={direction === 'forward' ? 'slide-left' : 'slide-right'}
          unmountOnExit
        >
          <Box ref={nodeRef} sx={{ mt: 2 }}>
            {activeStep === 0 && <Box>Address Step</Box>}
            {activeStep === 1 && <Box>Payment Step</Box>}
            {activeStep === 2 && <Box>Review Step</Box>}
          </Box>
        </CSSTransition>
      </SwitchTransition>
      

      <Box>
        <Button onClick={handleBack}>Back</Button>
        <Button onClick={handleNext}>Next</Button>
      </Box>
    </Paper>
  )
}

export default CheckoutStepper;