import Router from "~/router";
import { Header } from "./components/Header";
import RegisterProvider from "./context/registrations.context";
import LoadingProvider from "./context/loading.context";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Header>
        <h1>Caju Front Teste</h1>
      </Header>
      <LoadingProvider>
        <RegisterProvider>
          <Router />
        </RegisterProvider>
      </LoadingProvider>
    </>
  );
}

export default App;
