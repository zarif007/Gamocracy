import { atom } from "recoil";
import postReactionInterface from './../Interfaces/PostReactionInterface';


const reactions: postReactionInterface[] = [];

export const showAllReactionsAtom = atom({
    key: 'showAllReactionsAtom',
    default: false, 
})