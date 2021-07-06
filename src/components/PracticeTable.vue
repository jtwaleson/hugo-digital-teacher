<template>
    <div>De tafel van {{ table }}... </div>
</template>

<script>

import { sayText, hearNumber, sleep, giveCompliment, abortEverything } from '../speechUtil.js';


export default {
    name: "PracticeTable",
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
        await sayText(`De tafel van ${this.table}`);
        await sleep(800);
        for (let i = 1; i <= 10; i++) {
            await hearNumber(`${i} keer ${this.table} is`, i * this.table);
            await sleep(100);
        }
        await sleep(800);
        await giveCompliment();
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
