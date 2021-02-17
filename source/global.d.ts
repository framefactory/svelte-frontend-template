/**
 * Svelte Frontend Template
 * Copyright 2021 Frame Factory GmbH, Ralph Wiedemeier
 * License: MIT
 */

declare module '!raw-loader!*' {
    const contents: string;
    export = contents;
}

// Webpack constant: build version
declare const ENV_VERSION: string;
// Webpack constant: true during development build
declare const ENV_DEVELOPMENT: boolean;
// Webpack constant: true during production build
declare const ENV_PRODUCTION: boolean;