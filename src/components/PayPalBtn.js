import { useEffect } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

const PayPalBtn = ({
  currency,
  changeAmountRef,
  openSnackbar,
  onCloseModal,
  setIsPaypalError,
}) => {
  // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
  // This is the main reason to wrap the PayPalButtons in a new component
  const [{ options }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency]);

  return (
    <PayPalButtons
      fundingSource="paypal"
      style={{ layout: "vertical", label: "donate" }}
      disabled={false}
      createOrder={(data, actions) => {
        return actions.order
          .create({
            purchase_units: [
              {
                amount: {
                  value: changeAmountRef.current.value,
                  breakdown: {
                    item_total: {
                      currency_code: "USD",
                      value: changeAmountRef.current.value,
                    },
                  },
                },
                items: [
                  {
                    name: "netflix-donation",
                    quantity: "1",
                    unit_amount: {
                      currency_code: "USD",
                      value: changeAmountRef.current.value,
                    },
                    category: "DONATION",
                  },
                ],
              },
            ],
          })
          .then((orderId) => {
            // Your code here after create the donation
            console.log("", orderId);
            return orderId;
          });
      }}
      onApprove={(data, actions) => {
        return actions.order.capture().then(function (details) {
          // This function shows a transaction success message to your buyer.
          onCloseModal(true);
          openSnackbar(
            `Thank you very much for the donation : ${details.payer.name.given_name}`
          );
        });
      }}
      onError={(err) => {
        setIsPaypalError(true);
        onCloseModal(true);
        openSnackbar(`Something went wrong with the transaction`);
      }}
    />
  );
};

export default PayPalBtn;
