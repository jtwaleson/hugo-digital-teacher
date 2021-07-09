<template>

    <div v-if="language === null">
        <span v-if="goodVoices.length === 0">We could not speech synthesis support on this device</span>
        <div v-else>
            <h1>Supported voices</h1>
            <button v-for="voice in goodVoices" :key="voice.name" @click="setVoice(voice)">{{ voice.lang }} - {{ voice.name}}</button>
            <h1>English with foreign accents (try "Say" mode)</h1>
            <button v-for="voice in allVoices" :key="voice.name" @click="setVoice(voice, 'en')">{{ voice.lang }} - {{ voice.name}}</button>
            <h1>Dutch with foreign accents (try "Say" mode)</h1>
            <button v-for="voice in allVoices" :key="voice.name" @click="setVoice(voice, 'nl')">{{ voice.lang }} - {{ voice.name}}</button>
        </div>
    </div>
    <div v-else-if="whichTable === null">
        <h1 v-if="language === 'nl'">Welke tafel wil je oefenen?</h1>
        <h1 v-else>Which table would you like to practice?</h1>
        <button v-for="n in 10" :key="n" @click="whichTable = n">{{ n }}</button>
    </div>
    <div v-else-if="mode === null">
        <button @click="setMode('quiz')">Quiz</button>
        <button @click="setMode('practice')">{{ language === 'nl' ? 'Oefen' : 'Practice' }}</button>
        <button @click="setMode('say')">{{ language === 'nl' ? 'Zeg' : 'Say' }}</button>
    </div>
    <div v-else>
        <SayTable v-if="mode === 'say'" :language="language" :table="whichTable" @done="reset"/>
        <PracticeTable v-if="mode === 'practice'" :language="language" :table="whichTable" @done="reset"/>
        <QuizTable v-if="mode === 'quiz'" :language="language" :table="whichTable" @done="reset"/>
    </div>
    <div class="footer">
        <a href="https://github.com/jtwaleson/hugo-digital-teacher" target="_blank">Check my source code on GitHub</a>
        <br/>
        <br/>
        <a href="/">Go Back</a>
    </div>
</template>

<script>
import SayTable from "./components/SayTable.vue";
import PracticeTable from "./components/PracticeTable.vue";
import QuizTable from "./components/QuizTable.vue";
import NoSleep from 'nosleep.js';

var noSleep = new NoSleep();
window.noSleep = noSleep;

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
            navigator: window.navigator,
            goodVoices: [],
            allVoices: [],
        }
    },
    methods: {
        reset() {
            this.whichTable = null;
            this.mode = null;
            noSleep.disable();
        },
        setMode(mode) {
            this.mode = mode;
            noSleep.enable();
        },
        setVoice(voice, language) {
            if (!language) {
                this.language = voice.lang.substring(0, 2) === 'nl' ? 'nl' : 'en';
            } else {
                this.language = language;
            }
            window.voice = voice;
        },
    },
    mounted() {
        speechSynthesis.onvoiceschanged = () => {
            this.goodVoices = [];
            this.allVoices = [];
            for (let voice of speechSynthesis.getVoices()) {
                this.allVoices.push(voice);
                if (voice.lang.indexOf('en-') === 0 || voice.lang.indexOf('nl-') === 0) {
                    this.goodVoices.push(voice);
                }
            }
        }
        speechSynthesis.getVoices();
        setTimeout(() => {
            speechSynthesis.onvoiceschanged();
        }, 1000);
    },
}

</script>

<style>
button {
    width: 200px;
    height: 100px;
    margin: 20px;
    font-size: 24px;
    user-select:none;
}
.footer {
    margin-top: 300px;
}
</style>
