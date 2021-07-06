Array.prototype.sample = function(){
  return this[Math.floor(Math.random()*this.length)];
}


var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
window.recognition = recognition;
recognition.continuous = false;
recognition.lang = 'nl-NL';
recognition.interimResults = true;
recognition.maxAlternatives = 1;


export function sleep(duration) {
    return new Promise(resolve => setTimeout(resolve, duration));
}

export function sayText(text) {
    return new Promise((resolve, reject) => {
        let utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "nl-NL";
        utterance.onend = () => {
            resolve();
        }
        speechSynthesis.speak(utterance);
    });
}
const mapping = {
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


function hearAnswer() {
    return new Promise((resolve, reject) => {
        recognition.start();
        let goodResult = false;
        recognition.onresult = function(event) {
            console.log(event.results[0][0].transcript);
            if (event.results[0].isFinal) {
                goodResult = true;
                let text = event.results[0][0].transcript.toLowerCase();
                if (text in mapping) {
                    text = mapping[text];
                }
                recognition.abort();
                resolve(text);
            }
        }
        recognition.onend = function () {
            setTimeout(() => {
                if (!goodResult) {
                    resolve(null);
                }
            }, 500);
        }
    });

}

function isNumeric(value) {
    return /^-?\d+$/.test(value);
}

export async function hearNumber(question, number) {
    let answer = null;
    while (answer !== number) {
        await sayText(question);
        let answer = await hearAnswer();
        if (answer === null) {
            await sayText(`Ik hoorde niks.`);
        } else if (isNumeric(answer)) {
            answer = parseInt(answer);
            if (answer === number) {
                return;
            }
            await sayText(`Ik hoorde ${answer}.`);
            await throwAnInsult();
        } else {
            await sayText(`Ik hoorde ${answer}.`);
        }
        await sayText(`Probeer het nog eens.`);
    }
}

export async function throwAnInsult() {
    let insults = [
        "Kom up Hugo, ik weet dat je het kan!",
        "Probeer iets beter te concentreren!",
        "Iets meer oefenen, ik wil dat je je diploma haalt!",
    ];
    await sayText(insults.sample());
}
export async function giveCompliment() {
    let compliments = [
        "Ik vind je uniek.",
        "Ik vind dat je het goed doet, ga zo door.",
        "Ik ben blij dat je mij zo kunt inspireren.",
        "Ik vind dat je een gave hebt.",
        "Ik vind dat je er fantastisch uit ziet.",
        "Ik vind dat jij de allerlekkerste tosti’s kunt maken.",
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
        "Ik vind dat die kleur je heel erg goed staat.",
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
        "Ik vind dat je mooie kleding draagt.",
        "Ik vind je nieuwe bril goed staan.",
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
    ];
    await sayText(compliments.sample());
}

export function abortEverything() {
    if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
    }
    recognition.abort();
};
