import { Avatar, Box, Button, Container, Paper, Stack, Typography } from "@mui/material";
import { ScrollFadeIn } from "./ScrollFadeIn";
import { useAppSelector } from "../../app/store/store";
import { ExpandMore, LocalMall, LocalShippingOutlined, PaymentOutlined, VerifiedUserOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { lightModeBgColor } from "../../styling/getBackgroundColor";

const iconSize = "3rem";
const avatarSize = "5rem";

const sellingPoints = [
  {
    title: "Free Shipping",
    icon: (<LocalShippingOutlined sx={{fontSize: iconSize, color: 'primary.main'}} />),
    description: "Free worldwide shipping on all orders over $100. Fast and reliable delivery to your doorstep.",
  }
  ,
  {
    title: "Quality Guarantee",
    icon: (<VerifiedUserOutlined sx={{fontSize: iconSize, color: 'primary.main'}} />),
    description: "Premium quality products with 30-day money-back guarantee. Your satisfaction is our priority.",
  }
  ,
  {
    title: "Secure Payment",
    icon: (<PaymentOutlined sx={{fontSize: iconSize, color: 'primary.main'}} />),
    description: "Advanced encryption and secure payment processing. Shop with confidence and peace of mind.",
  }
];

const HomePage = () => {
  const { darkMode } = useAppSelector((x) => x.ui);

  const fontColor = darkMode ? lightModeBgColor : "white";

  return (
    <>
      <Box
        component="div"
        sx={{
          position: "relative",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          mt: -11,
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "4px",
            filter: darkMode
              ? "brightness(50%)"
              : "brightness(150%) grayscale(20%) contrast(50%)",
            transition: "all 0.5s ease-in-out",
            // zIndex: -2,
          }}
        >
          <source src="/videos/skiing_video.mp4" type="video/mp4" />
        </video>

        <Container
          maxWidth="md"
          sx={{
            zIndex: 1,
            textAlign: "center",
          }}
        >
          <ScrollFadeIn>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h1" fontWeight="600">
                Re-store
              </Typography>

              <ScrollFadeIn delay={400}>
                <Button
                  component={Link}
                  to={"/catalog"}
                  startIcon={<LocalMall />}
                  size="large"
                  variant="contained"
                  sx={{
                    width: 200,
                    transition: "transform 0.2s ease-in-out",
                    ":hover": {
                      transform: "translateY(-5px)",
                    },
                  }}
                >
                  Shop
                </Button>
              </ScrollFadeIn>
            </Box>
          </ScrollFadeIn>
        </Container>

        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            mb: 2,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "& .MuiSvgIcon-root": {
              animation: "jump 1s ease-in-out infinite",
              "@keyframes jump": {
                "0%, 100%": {
                  transform: "translateY(0)",
                },
                "50%": {
                  transform: "translateY(-15px)",
                }
              }
            }
          }}
        >
          <ExpandMore fontSize="large" />
        </Box>
      </Box>

      <ScrollFadeIn>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            mt: 6,
            mb: 4,
          }}
        >
          <Typography variant="h3">Why </Typography>
          &nbsp; &nbsp;
          <Typography variant="h3" fontWeight="bold" color="primary.main" display="inline">Re-store</Typography>
          <Typography variant="h3" display="inline">?</Typography>
        </Box>
      </ScrollFadeIn>
      
      

      <Stack direction="column" rowGap={2} sx={{ my: 2, }}>
        {sellingPoints.map((p, index) => (
          <ScrollFadeIn key={`${p.title}-${index}`}>
            <Paper
              key={`${p.title}-${index}`}
              elevation={8}
              sx={{
                borderRadius: 4,
                display: 'flex',
                flexDirection: 'column',
                p: 4,
                bgcolor: 'primary.dark',
                gap: 2,
              }}
            >
              <Avatar sx={{ width: avatarSize, height: avatarSize, bgcolor: fontColor }}>{p.icon}</Avatar>
              <Typography variant="h4" color={fontColor}>{p.title}</Typography>
              <Typography variant="body1" color={fontColor}>{p.description}</Typography>
            </Paper>
          </ScrollFadeIn>
        ))}
      </Stack>

      <Box
        sx={{
          my: 4
        }}
      >
        <ScrollFadeIn>
          <Box
            component={Paper}
            elevation={2}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 5,
              py: 6,
              borderRadius: 2,
            }}
          >
            <Typography variant="h3" fontWeight="bold" textAlign="center">Ready to have some fun?</Typography>
            <Typography variant="h6" textAlign="center">Gear up for the slopes—Shop premium ski essentials now!</Typography>
            <Button component={Link} to="/catalog" variant="outlined" size="large" sx={{ borderRadius: 100, width: "10rem", alignSelf: 'center' }}>Shop Now</Button>
          </Box>
        </ScrollFadeIn>
      </Box>
      
    </>
  );
};
export default HomePage;
