import { atom } from "recoil";

export const currentPlayingBlog = atom({
    key: 'currentPlayingBlog',
    default: {
        title: '',
        image: '',
    }, 
})