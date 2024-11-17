import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Layout } from "@components/layout";
import { store } from "@containers/redux/store";
import { Router } from "@containers/router/router";

export const App = () => (
  <Provider store={store}>
    <BrowserRouter
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <Layout>
        <Router />
      </Layout>
    </BrowserRouter>
  </Provider>
);
