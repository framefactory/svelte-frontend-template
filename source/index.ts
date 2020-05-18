import App from "./App.svelte";

const app: App = new App({
    target: document.body,
    props: {
        name: 'worlds'
    }
});

export default app;
