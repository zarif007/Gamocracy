import { atom } from "recoil";

export const creationModal = atom({
    key: 'creationModal',
    default: {   
        modal: false,
        blog: false,
        post: false,
        ask: false,
        idea: false,
        review: false,
        poll: false,
    },
})