import { atom } from "recoil";

export const emojiPickerModal = atom({
    key: 'emojiPickerModal',
    default: {
        active: false,
        addEmoji: (e: string) => {},
    }, 
})