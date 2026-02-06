export interface Poem {
    id: number;
    telugu: string[]; // Array of strings for line breaks
    englishTransliteration?: string[];
    wordMeaning?: Record<string, string>;
    meaning: {
        telugu: string;
        english: string;
    };
    commentary?: {
        english: string;
    };
}

export const poems: Poem[] = [
    {
        id: 1,
        telugu: [
            "శ్రీ కాళహస్తీశ్వరా! నువ్వు సకల లోకాలకు తండ్రివి.",
            "నీ మహిమను వర్ణించడానికి వేదాలు కూడా సరిపోవు.",
            "నా మనస్సును నీ పాదాలపై లగ్నం చేయి.",
            "నన్ను ఈ సంసార సాగరం నుంచి దాటించు."
        ],
        meaning: {
            telugu: "ఓ శ్రీకాళహస్తీశ్వరా! నువ్వే జగత్తుకు తండ్రివి. వేదాలు సైతం నిన్ను పూర్తిగా వర్ణించలేవు. నా చిత్తాన్ని నీ పాదాల చెంత నిలిపి, నన్ను ఈ జనన మరణ చక్రం నుంచి విముక్తుడిని చేయి.",
            english: "O Lord of Srikalahasti! You are the father of all worlds. Even the Vedas are insufficient to describe your glory. Please fix my mind upon your lotus feet and help me cross this ocean of worldly existence (Samsara)."
        },
        commentary: {
            english: "The poet begins with total surrender (Saranagati), acknowledging the limitations of human intellect and even sacred texts in comprehending the infinite nature of the Divine."
        }
    },
    {
        id: 42,
        telugu: [
            "వట్టి మాయల మారి వాడురా ఈ మానవుడు",
            "తెలిసి తెలియక చేసే తప్పులెన్నో",
            "నీ దయ ఉంటేనే గాని బ్రతకలేడు",
            "కావు కావుమని మొరపెట్టుకుంటున్నాడు"
        ],
        meaning: {
            telugu: "మానవుడు మాయలో పడి కొట్టుమిట్టాడుతున్నాడు. ఎన్నో తప్పులు చేస్తున్నాడు. నీ కృప లేనిదే వీడికి మనుగడ లేదు. అందుకే రక్షించమని వేడుకుంటున్నాడు.",
            english: "Man is caught in the web of illusion (Maya). He commits many mistakes knowingly or unknowingly. Without your grace, he cannot survive. Hence, he is crying out for protection."
        }
    }
];
