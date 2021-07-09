<template>
    <div v-if="language === 'nl'">De tafel van {{ table }}... <br/>Zeg je antwoorden in het Nederlands.</div>
    <div v-else>The table of {{ table }}... <br/> Say your answers in English.</div>
    <div v-if="language === 'nl'">Nog {{ amountLeft }} te gaan</div>
    <div v-else>Only {{ amountLeft }} remaining </div>
    <div>
        <p v-for="(message, index) in messages">
        {{ message }}
        </p>
    </div>
</template>

<script>

import { sayText, hearNumber, sleep, giveCompliment, abortEverything, numberMapping } from '../speechUtil.js';

export default {
    name: "QuizTable",
    props: {
        table: Number,
        language: String,
    },
    emits: ['done'],
    data() {
        return {
            running: false,
            messages: [],
            amountLeft: 10,
        }
    },
    async mounted() {
        if (this.running) {
            return;
        }
        await sayText(this.language === 'nl' ? `We gaan tien keer iets oefenen uit de tafel van ${numberMapping['nl'][this.table]}` : `We're going to practice ten numbers from the table of ${numberMapping['en'][this.table]}`, this.language);
        await sleep(800);
        let lastNumber = null;
        for (let i = 1; i <= 10; i++) {
            this.amountLeft = 11 - i;
            let x = null;
            while (x === null || x === lastNumber) {
                x = Math.floor(Math.random() * 10 + 1);
            }
            await hearNumber(this.language === 'nl' ? `Wat is ${numberMapping['nl'][x]} keer ${numberMapping['nl'][this.table]}` : `What is ${numberMapping['en'][x]} times ${numberMapping['en'][this.table]}`, x * this.table, this.language);
            await sleep(100);
            await giveCompliment(this.language);
            await sleep(200);
            lastNumber = x;
        }
        await sleep(800);
        await sayText(this.language === 'nl' ? `Je bent klaar met de quiz.` : `You are done with the quiz.`, this.language);
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
