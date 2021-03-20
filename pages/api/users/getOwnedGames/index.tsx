
import axios, { AxiosResponse } from "axios";
import { NextApiRequest, NextApiResponse } from 'next';
import { intersectionBy } from 'lodash';

axios.defaults.baseURL = process.env.STEAM_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_STEAM_API_KEY;


const handler = (_req: NextApiRequest, res: NextApiResponse) => {
    const { method, query: { steamid } } = _req
    switch (method) {
        case 'GET':
            getOwnedGames(steamid).then(data => {
                res.send(data)
            }).catch(err => {
                console.log(err)
            });
            break
        case 'POST':
            getOwnedGamesForUsers(_req.body).then(data => {
                res.send(data)
            }).catch(err => {
                console.log(err)
            });
            break
        default:
            res.setHeader('Allow', ['GET', 'POST'])
            res.status(405).end(`Method ${method} Not Allowed`)

    }
};


const getOwnedGames = (steamId) => {
    return new Promise((resolve, reject) => {
        axios.get(
            `IPlayerService/GetOwnedGames/v0001/?key=${API_KEY}&steamid=${steamId}&format=json&include_appinfo=true&include_played_free_games=true`
        ).then((response) => {
            resolve(response.data)
        });
    });
}

const getOwnedGamesForUsers = (userId: string[]) => {
    return new Promise((resolve, reject) => {
        let response = [];
        userId.forEach((id) => {
            response.push(getOwnedGames(id));
        });
        Promise.all(response).then(data => {
            let result = []
            console.log(data)
            data.forEach((element, index) => {
                result.push({ steamId: userId[index], games: element.response.games })
            });
            resolve(result)
        });
    })
};


export default handler