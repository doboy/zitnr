import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://6f961457509e52d9eb379796711cbdcc@o4509047838081024.ingest.us.sentry.io/4509047839260672",
});

import { App } from "./components/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
