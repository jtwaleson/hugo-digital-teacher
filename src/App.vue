<template>

    <div v-if="language === null">
        <button @click="language = 'nl'">Nederlands</button>
        <button @click="language = 'en'">English</button>
    </div>
    <div v-else-if="whichTable === null">
        <h1 v-if="language === 'nl'">Welke tafel wil je oefenen?</h1>
        <h1 v-else>Which table would you like to practice?</h1>
        <button v-for="n in 20" :key="n" @click="whichTable = n">{{ n }}</button>
    </div>
    <div v-else-if="mode === null">
        <button @click="mode = 'quiz'">Quiz</button>
        <button @click="mode = 'practice'">{{ language === 'nl' ? 'Oefen' : 'Practice' }}</button>
        <button @click="mode = 'say'">{{ language === 'nl' ? 'Zeg' : 'Say' }}</button>
    </div>
    <div v-else>
        <SayTable v-if="mode === 'say'" :language="language" :table="whichTable" @done="reset"/>
        <PracticeTable v-if="mode === 'practice'" :language="language" :table="whichTable" @done="reset"/>
        <QuizTable v-if="mode === 'quiz'" :language="language" :table="whichTable" @done="reset"/>
    </div>
</template>

<script>
import SayTable from "./components/SayTable.vue";
import PracticeTable from "./components/PracticeTable.vue";
import QuizTable from "./components/QuizTable.vue";

export default {
    name: "App",
    components: {
        SayTable,
        PracticeTable,
        QuizTable,
    },
    data() {
        return {
            whichTable: null,
            mode: null,
            language: null,
        }
    },
    methods: {
        reset() {
            this.whichTable = null;
            this.mode = null;
        },
    },
}

</script>

<style>
button {
    width: 200px;
    height: 100px;
    margin: 20px;
    font-size: 24px;
}
</style>
