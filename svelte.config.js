const sveltePreprocess  = require("svelte-preprocess");

module.exports = {
    preprocess: sveltePreprocess({
        typescript: {
            tsconfigDirectory: ".",
            compilerOptions: { noEmit: false },
        },
    }),
};