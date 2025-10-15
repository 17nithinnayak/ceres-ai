// frontend/src/components/voice/VoiceToText.jsx
import React,{ useEffect } from "react";
import { SpeechRecognition } from "@capacitor-community/speech-recognition";

const VoiceToText = ({ language = "en-US", onResult }) => {
    useEffect(() => {
        let listener;

        const startListening = async () => {
            const available = await SpeechRecognition.available();
            if (!available) return alert("Speech recognition not available.");

            await SpeechRecognition.requestPermissions();
            await SpeechRecognition.start({
                language,
                maxResults: 1,
                prompt: "Speak now...",
                partialResults: false,
            });

            listener = SpeechRecognition.addListener("result", (data) => {
                if (data.matches && data.matches.length > 0) {
                    onResult(data.matches[0]);
                }
            });
        };

        startListening();

        return () => {
            SpeechRecognition.stop();
            if (listener) listener.remove();
        };
    }, [language, onResult]);

    return null;
};

export default VoiceToText;
