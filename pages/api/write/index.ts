import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { apiEndpoints } from "../../../domain";
import postReactionInterface from './../../../Interfaces/PostReactionInterface';

export default async (
    req: NextApiRequest,
    res: NextApiResponse) => {
        
    const { method } = req;

    const props: any = [];

    await axios.get(apiEndpoints.post)
        .then(res => props.push(...res.data))

    await axios.get(apiEndpoints.blog)
        .then(res => props.push(...res.data))

    console.log(props)

    res.status(200).json({ success: true, data: await shuffleArray(props) })
}

async function shuffleArray(array: any) {
    // for (let i = array.length - 1; i > 0; i--) {
    //     const j = Math.floor(Math.random() * (i + 1));
    //     [array[i], array[j]] = [array[j], array[i]];
    // }

    array.sort((a: any, b: any) => (a.createdAt < b.createdAt) ? 1 : ((b.createdAt < a.createdAt) ? -1 : 0))

    return array;
}