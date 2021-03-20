
import axios, { AxiosResponse } from "axios";
import { NextApiRequest, NextApiResponse } from 'next';




const handler = (_req: NextApiRequest, res: NextApiResponse) => {
    const { method, query }: any = _req
    let STEAMID = query['openid.identity'].split('/').pop()
    axios.post(
        'localhost:3000/api/users/getProfileSummaries', [STEAMID]).then(response => {
            console.log(response.data)
        }).catch(err => {
            console.log(err)
        });


    res.redirect('/');
}


export default handler

