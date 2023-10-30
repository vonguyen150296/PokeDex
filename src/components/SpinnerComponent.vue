<script setup lang="ts">

</script>

<template>
    <div class="spinner_parent">
        <div id='spinner' class='spinner'>Loading...</div>
    </div>
</template>

<style scoped lang="scss">
/* Spinner */
.spinner_parent {
    @apply bg-gray-100 dark:bg-gray-500;
    position: fixed;
    z-index: 1000;
    width: inherit;
    height: 100%;
    padding-top: 100px;
}

.spinner,
.spinner:before,
.spinner:after {
    @apply bg-gray-100 dark:bg-gray-500;
    -webkit-animation: spinner1 0.5s infinite ease-in-out;
    animation: spinner1 0.5s infinite ease-in-out;
    width: 1em;
    height: 4em;
}

.spinner {
    @apply text-gray-300 dark:text-gray-700;
    text-indent: -9999em;
    margin: 140px auto;
    position: relative;
    font-size: 11px;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
    z-index: 1000;
}

.spinner:before,
.spinner:after {
    position: absolute;
    top: 0;
    content: '';
}

.spinner:before {
    left: -1.5em;
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
}

.spinner:after {
    left: 1.5em;
}

@-webkit-keyframes spinner1 {

    0%,
    80%,
    100% {
        box-shadow: 0 0;
        height: 4em;
    }

    40% {
        box-shadow: 0 -2em;
        height: 5em;
    }
}

@keyframes spinner1 {

    0%,
    80%,
    100% {
        box-shadow: 0 0;
        height: 4em;
    }

    40% {
        box-shadow: 0 -2em;
        height: 5em;
    }
}
</style>