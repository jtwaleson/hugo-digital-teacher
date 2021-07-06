<template>
    <div v-if="whichTable === null">
        <h1>Welke tafel wil je oefenen?</h1>
        <button v-for="n in 20" :key="n" @click="whichTable = n">{{ n }}</button>
    </div>
    <div v-else-if="mode === null">
        <button @click="mode = 'quiz'">Quiz</button>
        <button @click="mode = 'practice'">Oefen</button>
        <button @click="mode = 'say'">Zeg</button>
    </div>
    <div v-else>
        <SayTable v-if="mode === 'say'" :table="whichTable" @done="reset"/>
        <PracticeTable v-if="mode === 'practice'" :table="whichTable" @done="reset"/>
        <QuizTable v-if="mode === 'quiz'" :table="whichTable" @done="reset"/>
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
    width: 100px;
    height: 100px;
    margin: 20px;
}
</style>
