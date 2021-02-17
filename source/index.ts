/**
 * Svelte Frontend Template
 * Copyright 2021 Frame Factory GmbH, Ralph Wiedemeier
 * License: MIT
 */

import App from "./App.svelte";

import "@ff/svc/styles.css";
import "./styles.css";

const app: App = new App({
    target: document.body,
});

export default app;
