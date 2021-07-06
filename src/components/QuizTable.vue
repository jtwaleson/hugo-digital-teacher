<template>
    <div>De tafel van {{ table }}... </div>
</template>

<script>

import { sayText, hearNumber, sleep, giveCompliment, abortEverything } from '../speechUtil.js';


export default {
    name: "QuizTable",
    props: {
        table: Number,
    },
    data() {
        return {
            running: false,
        }
    },
    async mounted() {
        if (this.running) {
            return;
        }
        await sayText(`We gaan 10 keer iets oefenen uit de tafel van ${this.table}`);
        await sleep(800);
        for (let i = 1; i <= 10; i++) {
            let x = Math.floor(Math.random() * 10 + 1);
            await hearNumber(`Wat is ${x} keer ${this.table}`, x * this.table);
            await sleep(100);
            await giveCompliment();
            await sleep(200);
        }
        await sleep(800);
        this.running = false;
        this.$emit("done");
    },
    beforeUnmount() {
        abortEverything();
    },
}
</script>
<style>
</style>
