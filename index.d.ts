export {};

declare global {
  interface window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}