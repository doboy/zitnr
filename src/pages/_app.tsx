import { useRouter } from 'next/router';
import "./global.css";
import { parksById } from 'zitnr-utils';

const rerouteOldLinks = (router) : string | null => {
  // #calendar => /calendar/[slug]
  // #donate => /donate
  // #zitnr => /
  if (router.pathname === "/") {
    if (router.asPath.includes("#calendar")) {
      let parkSlug = "miller-playfield";

      if (router.query.parkId) {
        parkSlug = parksById[router.query.parkId.toString()].slug;
        if (parkSlug) {
          return `/calendar/${parkSlug}`;
        }
      }

      return "/calendar/miller-playfield";
    } else if (router.asPath.includes("#donate")) {
      return "/donate";
    } else if (router.asPath.includes("#")) {
      return "/";
    }
  }
}

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const newLink = rerouteOldLinks(router);
  if (newLink) {
    window.location.href = newLink;
  };

  const initGoogleAnalytics = () => {
    if (typeof window !== "undefined") {
      // @ts-ignore
      window.dataLayer = window.dataLayer || [];
      // @ts-ignore
      function gtag() {dataLayer.push(arguments); }
      // @ts-ignore
      gtag('js', new Date());
      // @ts-ignore
      gtag('config', 'G-BM861WX28D');

      console.log("Google Analytics initialized");
    }
  };

  return <div className="my-app">
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/semantic-ui@2.5.0/dist/semantic.min.css"
    />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <link rel="icon" type="image/png" href="public/favicon.png" />
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-BM861WX28D"></script>
    <>{initGoogleAnalytics()}</>
    <Component {...pageProps} />
  </div>
}

export default MyApp;