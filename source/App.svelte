<script lang="typescript">
    import { noop } from "svelte/internal";
</script>

<style global src="./global.css">
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
    
    body {
        @apply bg-color-800 text-color-100 font-sans;
    }
    a {
        @apply text-primary-500;
    }
</style>

<template>
    <h1 class="text-secondary-600">Hello World!</h1>
    <p>
        Visit the
        <a href="https://svelte.dev/tutorial">Svelte tutorial</a>
        to learn how to build Svelte apps.
    </p>
</template>
