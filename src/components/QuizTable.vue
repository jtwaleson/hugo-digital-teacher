<template>
    <div v-if="language === 'nl'">De tafel van {{ table }}... </div>
    <div v-else>The table of {{ table }}... </div>
    <div>
        <p v-for="(message, index) in messages">
        {{ message }}
        </p>
    </div>
</template>

<script>

import { sayText, hearNumber, sleep, giveCompliment, abortEverything } from '../speechUtil.js';

export default {
    name: "QuizTable",
    props: {
        table: Number,
        language: String,
    },
    data() {
        return {
            running: false,
            messages: [],
        }
    },
    async mounted() {
        if (this.running) {
            return;
        }
        await sayText(this.language === 'nl' ? `We gaan 10 keer iets oefenen uit de tafel van ${this.table}` : `We're going to practice 10 numbers from the table of ${this.table}`, this.language);
        await sleep(800);
        let lastNumber = null;
        for (let i = 1; i <= 10; i++) {
            let x = null;
            while (x === lastNumber) {
                x = Math.floor(Math.random() * 10 + 1);
            }
            await hearNumber(this.language === 'nl' ? `Wat is ${x} keer ${this.table}` : `What is ${x} times ${this.table}`, x * this.table, this.language);
            await sleep(100);
            await giveCompliment(this.language);
            await sleep(200);
            lastNumber = x;
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
