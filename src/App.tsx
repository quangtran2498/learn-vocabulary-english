import Header from "./components/header";
import Footer from "./components/footer";
import { Outlet } from "react-router-dom";
import  ThemeProvider  from "@mui/styles/ThemeProvider";
import { theme } from "./theme";
import "./App.css"
function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Header />
        <Outlet />
        {/* <Footer /> */}
      </div>
    </ThemeProvider>
  );
}

export default App;
