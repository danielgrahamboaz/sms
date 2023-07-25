import ScrollToTop from "./base-components/ScrollToTop";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./stores/store";
import Router from "./router";
import "./assets/css/app.css";
import LoadingProvider from "./contexts/LoadingContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <AuthProvider>
      <Provider store={store}>
        <ThemeProvider>
          <LoadingProvider>
            <Router />
          </LoadingProvider>
        </ThemeProvider>
      </Provider>
    </AuthProvider>
    <ScrollToTop />
  </BrowserRouter>
);
