<template>
    <div v-if="language === 'nl'">De tafel van {{ table }}... <br/>Zeg je antwoorden in het Nederlands.</div>
    <div v-else>The table of {{ table }}... <br/> Say your answers in English.</div>
    <div v-if="language === 'nl'">Nog {{ amountLeft }} te gaan</div>
    <div v-else>Only {{ amountLeft }} remaining </div>
</template>

<script>

import { sayText, hearNumber, sleep, giveCompliment, abortEverything, numberMapping } from '../speechUtil.js';


export default {
    name: "PracticeTable",
    props: {
        table: Number,
        language: String,
    },
    emits: ['done'],
    data() {
        return {
            running: false,
            amountLeft: 10,
        }
    },
    async mounted() {
        if (this.running) {
            return;
        }
        await sayText(this.language === 'nl' ? `De tafel van ${numberMapping.nl[this.table]}` : `The table of ${numberMapping.en[this.table]}`, this.language);
        await sleep(800);
        for (let i = 1; i <= 10; i++) {
            this.amountLeft = 11 - i;
            await hearNumber(`${numberMapping[this.language][i]} ${this.language === 'nl' ? 'keer' : 'times'} ${numberMapping[this.language]['this.table']} is`, i * this.table, this.language);
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
