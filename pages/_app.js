import Head from "next/head";
import Script from "next/script";
import '../assets/css/templatemo-stand-blog.css';
import '../assets/css/owl.css';
import '../assets/css/login.css';
import Navbar from "../layout/navbar/navbar";
import Footer from "../layout/footer/Footer";
import "../assets/css/register.css";
import "../assets/css/reset.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../components/firebase/index";

function MyApp({ Component, pageProps }) {
  const [user, loading, error] = useAuthState(auth);
  return (
     <>
     <Head>
        <title> Realestate</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css"
          integrity="sha512-1sCRPdkRXhBV2PBLUdRb4tMg1w2YPf37qatUFeS7zlBy7jJI8Lf4VHwWfZZfpXtYSLy85pkm9GaYVYMfw5BC1A=="
          crossorigin="anonymous" referrerpolicy="no-referrer" />
        <link rel="stylesheet" href="js_and_css/bootstrap/css/bootstrap.min.css" />
        <link rel="stylesheet" href="../../assets/css/fontawesome.css" />
      </Head>
        <Script src="/js_and_css/bootstrap/js/bootstrap.bundle.min"></Script>
        <Script src="/js_and_css/jquery/jquery.min.js"></Script>
        <Script src="/js_and_css/js/accordions.js"></Script>
        <Script src="/js_and_css/js/custom.js"></Script>
        <Script src="/js_and_css/js/isotope.js"></Script>
        <Script src="/js_and_css/js/owl.js"></Script>
        <Script src="/js_and_css/js/slick.js"></Script>
        <Navbar user={user} />
          <Component 
            {...pageProps} 
          />
        <Footer />
     </>
  );
}

export default MyApp;
