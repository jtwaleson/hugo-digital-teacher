<template>
    <div v-if="language === 'nl'">De tafel van {{ table }}... </div>
    <div v-else>The table of {{ table }}... </div>
</template>

<script>

import { sayText, sleep, giveCompliment, abortEverything, numberMapping } from '../speechUtil.js';


export default {
    name: "SayTable",
    props: {
        table: Number,
        language: String,
    },
    emits: ['done'],
    data() {
        return {
            running: false,
        }
    },
    async mounted() {
        if (this.running) {
            return;
        }
        await sayText(this.language === 'nl' ? `De tafel van ${numberMapping.nl[this.table]}` : `The table of ${numberMapping.en[this.table]}`, this.language);
        await sleep(800);
        for (let i = 1; i <= 10; i++) {
            await sayText(`${numberMapping[this.language][i]} ${this.language === 'nl' ? 'keer' : 'times'} ${this.table} is ${i * this.table}`, this.language);
            await sleep(100);
        }
        await sleep(800);
        await giveCompliment(this.language);
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
