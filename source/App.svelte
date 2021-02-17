<!--
  Svelte Frontend Template
  Copyright 2021 Frame Factory GmbH, Ralph Wiedemeier
  License: MIT
-->

<script context="module" lang="typescript">
</script>

<script lang="typescript">
    import Icon from "@ff/svc/Icon.svelte";
    import Group from "@ff/svc/Group.svelte";
</script>

<!-- MARKUP ------------------------------------------------------------------->

<template>
    <h1 class="text-2xl">Hello World!</h1>
    <div class="frame flex-col">
        <button class="button"><Icon name="file"/> Button</button>
        <Group class="group-row">
            <button class="button flex-auto"><Icon name="file"/> Button</button>
            <button class="button flex-auto"><Icon name="file"/> Button</button>
        </Group>
    </div>
</template>

<!-- STYLES ------------------------------------------------------------------->

<style>
    .frame {
        width: 200px;
    }
</style>
