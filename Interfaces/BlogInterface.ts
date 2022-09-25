import gameForOptionInterface from "./GameForOptionInterface";

export default interface blogInterface {
    type: string;
    blogId: string;
    coverImage: string;
    title: string;
    content: string;
    selectedGames: gameForOptionInterface[];
    selectedCategories: string[];
    author: string;
    createdAt: string;
    updatedAt: string;
    views: number;
}