import "../styles/globals.css";
import Layout from "../components/Layout";
import AuthState from "../context/auth/AuthState";
import setAuthToken from "../utils/setAuthToken";
import Cookies from "js-cookie";

function MyApp({ Component, pageProps }) {
  const token = Cookies.get("token");

  if (Cookies.get("token")) setAuthToken(token);

  return Component.name === "login" || Component.name === "register" ? (
    <AuthState>
      <Component {...pageProps} />
    </AuthState>
  ) : (
    <AuthState>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthState>
  );
}

export default MyApp;
