import { FormLabel, Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Slider from "components/mui-form/Slider";
import React from "react";
import CardPayment from "./CardPayment";
import GooglePay from "./GooglePay";
import OrderSummery from "./OrderSummery";
import { PaymentContainer } from "./styled";

const Plans = () => {
  return (
    <Grid container spacing={12}>
      <Grid item xs={12} md={6}>
        <Stack spacing={2}>
          <div>
            <Typography variant="subtitle1">Select payment amount</Typography>
            <Typography variant="caption">Payment option can be changed a any time with zero penalties</Typography>
          </div>
          <Slider />
        </Stack>
        <PaymentContainer>
          <Typography variant="subtitle1" mb={1}>
            Select a payment method
          </Typography>
          <CardPayment />
          <GooglePay />
        </PaymentContainer>
      </Grid>
      <Grid item xs={12} md={6}>
        <OrderSummery />
      </Grid>
    </Grid>
  );
};

export default Plans;