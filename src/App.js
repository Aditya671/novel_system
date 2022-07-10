import React from 'react';
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store,persistor } from "./redux/store";
import { AppTheme } from "./store_theme";
import Boundary from "./helpers/ErrorBoundary";
import Container from "./container";
import history from "./component/common/history";
import ToastNotrification from "./component/toastNotrification";

function App() {
   return (
      <AppTheme>
         <Boundary>
            <Router history={history}>
               <Provider store={store}>
                  <PersistGate loading={<h1 style={{margin:'0'}}>loading....</h1>} persistor={persistor}>
                     <Container/>
                     <ToastNotrification/>
                  </PersistGate>
               </Provider>
            </Router>
         </Boundary>
      </AppTheme>
  );
}

export default App;
