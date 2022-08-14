import "../styles/globals.css";
import 'tailwindcss/tailwind.css';
import UsersContextProvider from "../context/UsersContext";
function MyApp({ Component, pageProps }) {
  return (
    <UsersContextProvider>
      <Component {...pageProps} />
    </UsersContextProvider>
  );
}

export default MyApp;
