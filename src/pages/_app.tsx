import "./global.css";

function MyApp({ Component, pageProps }) {
  return <div className="my-app">
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/semantic-ui@2.5.0/dist/semantic.min.css"
    />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <link rel="icon" type="image/png" href="public/favicon.png" />
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-BM861WX28D"></script>
    {/* <script>
      window.dataLayer = window.dataLayer || [];
      function gtag() {dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', 'G-BM861WX28D');
    </script> */}
    <Component {...pageProps} />
  </div>
}

export default MyApp;