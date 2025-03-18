import MainLayout from "../layouts/MainLayout";
import "../styles/globals.css";
import { getEntriesByContentType } from "../lib/helpers";

function MyApp({ Component, pageProps }) {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
}
export default MyApp;
