import { useRouter } from 'next/router';
import "./global.css";
import { parksById } from 'zitnr-utils';

const rerouteOldLinks = (router) : string | null | undefined => {
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
    } else if (router.asPath.includes("#ledger")) {
      return `/ledger?code=${router.query.code}`;
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

  return <div className="my-app">
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/semantic-ui@2.5.0/dist/semantic.min.css"
    />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <link rel="icon" type="image/ico" href="/favicon.ico" />
    <script defer src="https://cloud.umami.is/script.js" data-website-id="753118b8-8c43-4a88-aa53-3bfee1b8437e"></script>
    <script type="text/javascript" src="http://classic.avantlink.com/affiliate_app_confirm.php?mode=js&authResponse=c5c57e90099e1ecf445f304047b4b4cb22b3f7e5"></script>
    <Component {...pageProps} />
  </div>
}

export default MyApp;