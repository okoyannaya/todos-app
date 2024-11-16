
import { Navbar } from "@components/navbar/navbar";
import { Router } from "@containers/router/router";

export const App = () => {
  return (
    <div>
      {/* <Loader isLoading={true} /> */}
      <Navbar />
      <Router />
    </div>
  );
};
