import { Box, Button, Checkbox, FormControlLabel, Paper, Step, StepLabel, Stepper } from "@mui/material";

import './CheckoutStepper.css'
import { AddressElement, PaymentElement, useElements } from "@stripe/react-stripe-js";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { Review } from "./Review";
import { useFetchAddressQuery, useUpdateUserAddressMutation } from "../account/accountApi";
import type { Address } from "../../app/models/user";
import CircularProgressScreen from "../../app/shared/components/CircularProgressScreen";
import type { StripeAddressElementChangeEvent, StripePaymentElementChangeEvent } from "@stripe/stripe-js";
import { useBasket } from "../../lib/hooks/useBasket";
import { currencyFormat } from "../../lib/util";

const steps = ['Address', 'Payment', 'Review'];
const animationTime = '0.3s';

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

const SlidingStepContent = (
  { children, step, activeStep, isTransitioning, direction, onHeightChange } 
  : {
    children: ReactNode, 
    step: number, 
    activeStep: number, 
    isTransitioning: boolean, 
    direction: 'forward'|'backward',
    onHeightChange?: (height: number) => void
  }
) => {
  const isActive = activeStep === step;
  const contentRef = useRef<HTMLDivElement>(null);

  const getAnimationClass = () => {
    if (!isTransitioning) return '';

    if (isActive) {
      return direction === 'forward' ? 'slide-in-from-right' : 'slide-in-from-left';
    } else {
      return direction === 'forward' ? 'slide-out-left' : 'slide-out-right';
    }
  }

  useLayoutEffect(() => {
    if (isActive && contentRef.current && onHeightChange) {
      const updateHeight = () => {
        if (contentRef.current) {
          const height = contentRef.current.scrollHeight;
          onHeightChange(height);
        }
      };

      updateHeight();

      const resizeObserver = new ResizeObserver(() => {
        updateHeight();
      });
      
      resizeObserver.observe(contentRef.current);

      // Also use MutationObserver to catch DOM changes (like Stripe Elements loading)
      const mutationObserver = new MutationObserver(() => {
        // Small delay to ensure DOM changes are complete
        setTimeout(updateHeight, 1);
      });

      mutationObserver.observe(contentRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class']
      });
    
      return () => {
        resizeObserver.disconnect();
        mutationObserver.disconnect();
      }
    }
  }, [isActive, onHeightChange]);

  return (
    <Box
      ref={contentRef}
      className={`step-content ${isActive ? 'active' : 'inactive'} ${getAnimationClass()}`}
      sx={{
        position: 'absolute',
        width: '100%',
        top: 0,
        left: 0,
        opacity: isActive ? 1 : 0,
        visibility: isActive ? 'visible' : 'hidden',
        transform: isActive ? 'translateX(0)' : 
          (direction === 'forward' ? 'translateX(-100%)' : 'translateX(100%)'),
        transition: `all ${animationTime} ease-in-out`,
        zIndex: isActive ? 1 : 0
      }}
    >
      {children}
    </Box>
)}

const CheckoutStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [containerHeight, setContainerHeight] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: {name, ...restAddress} = {} as Address, isLoading } = useFetchAddressQuery();
  const [ updateAddress ] = useUpdateUserAddressMutation();
  const [ saveAddressChecked, setSaveAddressChecked ] = useState<boolean>(false);
  const elements = useElements();
  const [ addressComplete, setAddressComplete ] = useState<boolean>(false);
  const [ paymentComplete, setPaymentComplete ] = useState<boolean>(false);
  const unableToProcced = (activeStep === 0 && !addressComplete) || (activeStep === 1 && !paymentComplete);

  const { total } = useBasket();

  const handleNext = async () => {
    if (activeStep === 0 && saveAddressChecked && elements) {
      const address = await getStripeAddress();

      if (address) await updateAddress(address);
    }

    setActiveStep(step => {
      if (step < steps.length - 1) {
        setDirection('forward');
        setIsTransitioning(true);
        return step + 1;
      }
      return step;
    });
  }

  const handleBack = () => {
    setActiveStep(step => {
      if (step > 0) {
        setDirection('backward');
        setIsTransitioning(true);
        return step - 1;
      }
      return step;
    });
  }

  const handleStep = async (step: number) => {
    if (unableToProcced) return;

    if (activeStep === 0 && saveAddressChecked && elements) {
      const address = await getStripeAddress();

      if (address) await updateAddress(address);
    }

    setDirection(step > activeStep ? 'forward' : 'backward');
    setIsTransitioning(true);
    setActiveStep(step);
  }

  const handleAddressChange = (event: StripeAddressElementChangeEvent) => {
    setAddressComplete(event.complete)
  }

  const handlePaymentChange = (event: StripePaymentElementChangeEvent) => {
    setPaymentComplete(event.complete)
  }

  const handleHeightChange = (height: number) => {
    setContainerHeight(height);
  }

  const getStripeAddress = async (): Promise<null | Address> => {
    const addressElement = elements?.getElement('address');

    if (!addressElement) return null;

    const { value: {name, address} } = await addressElement.getValue();

    if (name && address) return ({...address, name} as Address);

    return null;
  }


  // Show incomplete message for stripe's address element
  const triggerAddressValidation = async () => {
    const addressElem = elements?.getElement('address');

    if (!addressElem) return;

    await addressElem.getValue();
  };

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 300); // match css transition duration

      return () => clearTimeout(timer);
    }
  }, [isTransitioning])

  if (isLoading) return (<CircularProgressScreen />)

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
            <Step key={`${index}-${label}`} sx={{ cursor: 'pointer' }}>
              <StepLabel
              onClick={() => handleStep(index)}
                // slots={{ stepIcon: CustomStepIcon }}
              >{label}</StepLabel>
            </Step>
          )
        })}
      </Stepper>
      
        
        <Box
          ref={containerRef}
          sx={{ 
            mt: 2,
            position: "relative",
            overflow: "hidden",
            height: `${containerHeight}px`,
            transition: `height ${animationTime} ease-in-out`,
          }}
        >

          {/* Address Step */}
          <SlidingStepContent 
            step={0} 
            activeStep={activeStep} 
            direction={direction} 
            isTransitioning={isTransitioning}
            onHeightChange={handleHeightChange}
          >
            <AddressElement 
              options={{
                mode: 'shipping',
                defaultValues: {
                  name: name,
                  address: restAddress,
                }
              }}
              onChange={handleAddressChange}
              onBlur={() => {
                triggerAddressValidation();
              }}
            />
            <FormControlLabel 
              sx={{ display: 'flex', justifyContent: 'end', mt: 1 }}
              control={<Checkbox 
                checked={saveAddressChecked}
                onChange={e => setSaveAddressChecked(e.target.checked)}
              />}
              label="Save as default address"
            />
          </SlidingStepContent>
          
          {/* Payment step */}
          <SlidingStepContent 
            step={1} 
            activeStep={activeStep} 
            direction={direction} 
            isTransitioning={isTransitioning}
            onHeightChange={handleHeightChange}
          >
            <PaymentElement 
              onChange={handlePaymentChange}
            />
          </SlidingStepContent>
          
          {/* Review Step */}
          <SlidingStepContent 
            step={2}
            activeStep={activeStep} 
            direction={direction} 
            isTransitioning={isTransitioning}
            onHeightChange={handleHeightChange}
          >
            <Review />
          </SlidingStepContent>

        </Box>

      

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Button 
          onClick={handleBack} 
          disabled={activeStep === 0}
        >
          Back
        </Button>
        
        <Button 
          onClick={handleNext} 
          disabled={
            unableToProcced
          }
        >
          {activeStep === steps.length - 1 ? `Pay ${currencyFormat(total)}` : 'Next'}
        </Button>
      </Box>
    </Paper>
  )
}

export default CheckoutStepper;