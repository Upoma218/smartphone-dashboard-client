import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { persistor, store } from "./redux/store.ts";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router.tsx";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
      <Toaster/>
    </Provider>
  </React.StrictMode>
);
