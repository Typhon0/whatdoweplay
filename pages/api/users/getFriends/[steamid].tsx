
import axios, { AxiosResponse } from "axios";
import { NextApiRequest, NextApiResponse } from 'next';
axios.defaults.baseURL = process.env.STEAM_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_STEAM_API_KEY;


const handler = (_req: NextApiRequest, res: NextApiResponse) => {
    const { method, query: { steamid } } = _req
    switch (method) {
        case 'GET':
            axios.get(
                `ISteamUser/GetFriendList/v0001?key=${API_KEY}&steamid=${steamid}`
            ).then(response => {
                res.send(response.data)
            }).catch(err => {
                console.log(err)
            });
            break
        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${method} Not Allowed`)

    }
};

export default handler
