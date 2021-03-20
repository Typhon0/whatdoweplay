
import axios, { AxiosResponse } from "axios";
import { NextApiRequest, NextApiResponse } from 'next';
axios.defaults.baseURL = process.env.STEAM_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_STEAM_API_KEY;


const handler = (_req: NextApiRequest, res: NextApiResponse) => {
    const { method } = _req
    switch (method) {
        case 'POST':
            getProfileSummaries(_req.body).then(data => {
                res.send(data)
            }).catch(err => {
                console.log(err)
            });
            break
        default:
            res.setHeader('Allow', ['POST'])
            res.status(405).end(`Method ${method} Not Allowed`)

    }
};


const getProfileSummaries = (userIdArray) => {
    return new Promise((resolve, reject) => {
        axios.get(
            `ISteamUser/GetPlayerSummaries/v0002/?key=${API_KEY}&steamids=${userIdArray.toString()}`
        ).then((response) => {
            resolve(response.data)
        });
    });
}


export default handler