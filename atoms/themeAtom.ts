import { atom } from "recoil";

export const theme = atom({
    key: 'theme',
    default: {
        background: 'black',
        wrapper: '#121212',
        crimson: '#DC143C',
        hover: '#e5163f',
    }, 
})