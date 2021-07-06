Array.prototype.sample = function(){
  return this[Math.floor(Math.random()*this.length)];
}


var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
window.recognition = recognition;
recognition.continuous = false;
recognition.interimResults = true;
recognition.maxAlternatives = 1;

const langToLocaleMap = {
    nl: 'nl-NL',
    en: 'en-US',
}

var voices = null;

speechSynthesis.onvoiceschanged = function () {
    voices = speechSynthesis.getVoices();
};


export function sleep(duration) {
    return new Promise(resolve => setTimeout(resolve, duration));
}

export function sayText(text, language) {
    if (!language) {
        throw new Error(`sayText: language is not defined`);
    }
    return new Promise((resolve, reject) => {
        let utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = langToLocaleMap[language];
        if (voices !== null) {
            for (let voice of voices) {
                if (voice.lang === langToLocaleMap[language] || voice.lang === langToLocaleMap[language].replace('-', '_')) {
                    utterance.voice = voice;
                }
            }
        }
        utterance.onend = () => {
            resolve();
        }
        speechSynthesis.speak(utterance);
    });
}
const toIntMapping = {
    een: "1",
    twee: "2",
    drie: "3",
    vier: "4",
    vijf: "5",
    zes: "6",
    zeven: "7",
    acht: "8",
    negen: "9",
    tien: "10",
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
    ten: "10",
}


function hearAnswer(language, number) {

    return new Promise((resolve, reject) => {
        recognition.lang = langToLocaleMap[language];
        recognition.start();
        let pendingTimeout = setTimeout(() => {
            recognition.stop();
        }, 11000);
        recognition.onresult = function(event) {
            let text = event.results[0][0].transcript.toLowerCase();
            if (text in toIntMapping) {
                text = toIntMapping[text];
            }
            if (event.results[0].isFinal || isNumeric(text) && parseInt(text) === number) {
                clearTimeout(pendingTimeout);
                pendingTimeout = null;
                recognition.abort();
                return resolve(text);
            }
        }
        recognition.onend = function () {
            setTimeout(() => {
                if (pendingTimeout !== null) {
                    clearTimeout(pendingTimeout);
                    pendingTimeout = null;
                    resolve(null);
                }
            }, 500);
        }
    });

}

function isNumeric(value) {
    return /^-?\d+$/.test(value);
}

export async function hearNumber(question, number, language) {
    let answer = null;
    while (answer !== number) {
        window.noSleep.disable();
        await sayText(question, language);
        let answer = await hearAnswer(language, number);
        window.noSleep.enable();
        if (answer === null) {
            await sayText(language === 'nl' ? `Ik hoorde niks.` : `I heard nothing`, language);
        } else if (isNumeric(answer)) {
            answer = parseInt(answer);
            if (answer === number) {
                return;
            }
            await sayText(language === 'nl' ? `Ik hoorde ${answer}.` : `I heard ${answer}.`, language);
            await throwAnInsult(language);
        } else {
            await sayText(language === 'nl' ? `Ik hoorde ${answer}.` : `I heard ${answer}.`, language);
        }
        await sayText(language === 'nl' ? `Probeer het nog eens.` : `Try again.`, language);
    }
}

export async function throwAnInsult(language) {
    let insults = {
        nl: [
            "Kom up Hugo, ik weet dat je het kan!",
            "Probeer iets beter te concentreren!",
            "Iets meer oefenen, ik wil dat je je diploma haalt!",
        ],
        en: [
            "I'm going to cry.",
            "Please concentrate, the world depends on it!",
            "I can see you tried hard.",
            "I can see you're really trying!",
            "I still think you can do it!",
            "Not correct, but I trust you can do it.",
            "Not right, but I'm glad you enjoy learning!",
            "Keep on trying!",
            "That's a tough one, but I'll bet you can figure it out.",
            "That's really creative.",
            "You almost got it!",
            "You've just about got it.",
        ],
    };
    await sayText(insults[language].sample(), language);
}
export async function giveCompliment(language) {
    let compliments = {
        nl: [
            "Ik vind je uniek.",
            "Ik vind dat je het goed doet, ga zo door.",
            "Ik ben blij dat je mij zo kunt inspireren.",
            "Ik vind dat je een gave hebt.",
            "Ik vind dat je er fantastisch uit ziet.",
            "Ik vind dat jij de allerlekkerste tosti's kunt maken.",
            "Ik vind je ontzettend spontaan.",
            "Ik vind dat je een prettige persoonlijkheid hebt.",
            "Ik denk dat dit alles zonder jou niet was gelukt, dankjewel.",
            "Ik vind jou een aardig persoon.",
            "Ik vind je een fantastische moeder / vader.",
            "Ik vind je een fantastische vriend / vriendin.",
            "Ik vind je de allerbeste oma / opa die er is.",
            "Ik vind je de allerbeste buurman / buurvrouw die er is.",
            "Ik ben blij dat ik je ken, omdat ik zo ontzettend veel van je kan leren.",
            "Ik vind dat je heerlijk hebt gekookt.",
            "Ik vind je de allerbeste vrijwilliger die we hebben.",
            "Ik ben blij met een vriend(in) zoals jij.",
            "Ik vind dat je erg succesvol bent.",
            "Ik vind jouw lach prachtig.",
            "Ik ben blij dat ik je kan vertrouwen.",
            "Ik ben blij met een collega zoals jij.",
            "Ik vind jou speciaal.",
            "Ik vind het fijn dat we zoveel plezier hebben samen.",
            "Ik vind je beeldschoon.",
            "Ik vind dat je fantastisch goed kunt luisteren.",
            "Ik vind dat je lekker ruikt.",
            "Ik vind dat je geluk uitstraalt.",
            "Ik vind dat je straalt.",
            "Ik vind het werk dat je hebt geleverd fantastisch.",
            "Ik vind je van binnen nog mooier dan dat je van buiten al bent.",
            "Ik weet zeker dat de zon voor jou schijnt.",
            "Ik vind je lach heerlijk aanstekend.",
            "Ik vind je stijl perfect.",
            "Ik vind dat je mensen een goed gevoel over henzelf geeft.",
            "Ik vind je het zonnetje in huis (of op kantoor).",
            "Ik vind je een held.",
            "Ik vind dat je heel goede moves hebt.",
            "Ik weet zeker dat alles goedkomt als jij dit op je neemt.",
            "Ik ben blij dat jij er bent!",
            "Ik vind jou het neusje van de zalm.",
            "Ik vind jou een heel goede vriend(in).",
            "Ik vind je ontzettend sterk.",
            "Ik vind het altijd gezellig als je er bent.",
            "Ik vind het fijn om met je te praten.",
            "Ik vind je dapper.",
            "Ik vind dat je een goede keus hebt gemaakt.",
            "Ik vind dat jij het verschil maakt.",
            "Ik kijk enorm naar je op.",
            "Ik ben erg van jou gecharmeerd.",
            "Ik weet dat ik mezelf kan zijn bij jou.",
            "Ik vind jou een voorbeeld voor velen.",
            "Ik zou willen dat ik het net goed als jou kon doen.",
            "Ik vind dat je een medaille moet krijgen voor jouw moed.",
            "Ik vind je perfect, zoals je bent.",
            "Ik vind je een geschenk voor de mensen om je heen.",
            "Ik vind je ontzettend wijs.",
            "Ik vind je een kanjer.",
            "Ik vind jou “one of a kind”.",
            "Ik vind jou goud waard.",
            "Ik vind je een fantastisch mens.",
            "Ik vind je met de lach leuker worden.",
            "Ik vind je een kei.",
            "Ik ben blij dat ik bij jou mag huilen.",
            "Ik vind je inspirerend.",
            "Ik bewonder jou.",
            "Ik heb je lief om wie je bent.",
            "Ik zou willen dat ik je in een doosje kon doen en dat ik je overal mee naartoe kon nemen.",
            "Ik vind je een doorzetter.",
            "Ik vind je charmant.",
            "Ik vind je daadkrachtig.",
            "Ik vind je puur.",
            "Ik vind dat jij je voor 200% inzet.",
            "Ik vind je verbindend.",
            "Ik vind je meelevend.",
            "Ik vind je heel behulpzaam.",
            "Ik vind je onvervangbaar.",
            "Ik vind je mooi.",
            "Ik ben apetrots op jou.",
            "Ik vind dat je de beste bent.",
            "Ik vind je een talent.",
            "Ik bewonder hoe bijzonder je bent.",
            "Ik vind je ontzettend sportief.",
            "Ik vind je een kei in communicatie.",
            "Ik vind je heel erg wijs.",
            "Ik vind dat je het waard ben.",
            "Ik vind dat jij heel hard kunt rennen.",
            "Ik vind dat jij de lekkerste pannenkoeken bakt.",
            "Ik vind dat jij de fijnste knuffels geeft.",
            "Ik vind alles leuker met jou.",
            "Ik slaap het fijnste als jij bij me bent.",
            "Ik hoop dat je altijd zo sprankelend blijft zoals nu.",
        ],
        en: [
            "I like you.",
            "You're so special.",
            "I'm so lucky to have you.",
            "You're fun.",
            "You're smart.",
            "You're beautiful.",
            "You're handsome.",
            "You are such a blessing to me.",
            "You're creative.",
            "You are so good at multiplying.",
            "You're helpful.",
            "You're talented.",
            "You're inspiring.",
            "You love me well.",
            "You're fantastic.",
            "You're athletic.",
            "You're artistic.",
            "You color my world.",
            "You encourage me.",
            "You're the light of my life.",
            "You're one of a kind.",
            "You have my heart.",
            "You have great dreams.",
            "You're delightful.",
            "You're kind.",
            "I believe in you.",
            "You're so trustworthy.",
            "You're unique.",
            "You're compassionate.",
            "You can do anything you put your mind to.",
            "You're incredible.",
            "I admire how you multiply.",
            "I love your laugh.",
            "You're intelligent.",
            "You make my days sweeter.",
            "You make me smile.",
            "I love your smile.",
            "There's no one else like you.",
            "You are a joy.",
            "I love that you belong to me.",
            "You're thoughtful.",
            "You are excellent.",
            "You're interesting.",
            "My favorite time is time with you.",
            "I value you.",
            "You are worth so much to me.",
            "I love when you confide in me.",
            "You're so strong.",
            "You're the best.",
            "You rock.",
            "We make a great team.",
            "You do things with excellence.",
            "Nothing will ever keep me from loving you.",
            "I'm so glad you're mine.",
            "I love being on your side.",
            "You're a great leader.",
            "You make a difference.",
            "You matter to me.",
            "You're so fun to play with.",
            "You always make me laugh.",
            "You are a great student.",
            "You're radiant.",
            "You shine every day.",
            "I love how you're so truthful.",
            "You have great ideas.",
            "You brighten my life.",
            "You're amazing.",
            "You're awesome.",
            "You are a wonderful part of our family.",
            "You make memories sweeter.",
            "You're so respectful.",
            "You have incredible insight.",
            "You're so hopeful.",
            "You're positive.",
            "You love your friends well.",
            "You make me so proud.",
            "I admire how you keep promises.",
            "You are such a leader at school.",
            "You're a team player.",
            "I love that you never give up.",
            "You set a great example.",
            "You're tremendous.",
            "You impact me every day.",
            "You're so fun-loving.",
            "You're nice to others.",
            "You're outstanding.",
            "You win me over every day.",
            "You are a great son/daughter.",
            "You're so refreshing.",
            "You put others first.",
            "I have confidence in you.",
            "I enjoy you.",
            "You're marvelous.",
            "You make gray skies disappear.",
            "You're doing great things.",
            "You're unbelievable.",
            "I'm so happy for you.",
            "Look how far you've come!",
            "Nice going!",
            "Now you have it.",
            "Now you've figured it out!",
            "One more time and you'll have it!",
            "Thanks for helping make this a good day!",
            "That's the way to do it.",
            "You did a lot of work today!",
            "You did it all by yourself.",
            "You did it that time!",
            "You made it!",
            "You make my job easy.",
            "You must feel good about that.",
            "You must feel pretty proud!",
            "You must've been practicing.",
            "You were a real help today.",
            "I have a nice time when you are along.",
            "I like the way you handled that!",
            "You're fun to be around.",
            "You're getting better!",
            "You're improving!",
            "You're really getting the hang of it.",
            "You're really giving that your best!",
            "You're really going to town.",
            "You're really improving.",
            "You're the bright spot in my day.",
            "You've made a lot of progress.",
            "Being with you is a treat for me!",
            "Give yourself a pat on the back!",
            "Good remembering.",
            "Hey, you did it!",
            "How do you feel about that?",
            "I appreciate your help.",
            "I believe in you.",
        ],
    };
    await sayText(compliments[language].sample(), language);
}

export function abortEverything() {
    if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
    }
    recognition.abort();
};
