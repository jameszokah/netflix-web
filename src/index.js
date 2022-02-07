import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import SnackbarProvider from "react-simple-snackbar";
import * as serviceWorker from "./serviceWorker";
// eslint-disable-next-line
import "swiper/css/bundle";

const queryClient = new QueryClient({
  defaultOptions: { quries: { suspense: true } },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <SnackbarProvider>
            <PayPalScriptProvider
              options={{
                "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
                components: "buttons",
                currency: "USD",
              }}
            >
              <App />
            </PayPalScriptProvider>
          </SnackbarProvider>
        </Router>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
