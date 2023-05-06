import graphqlRequestClient from "@/@core/clients/graphqlRequestClient";
import { withSessionRoute } from "@/@core/lib/withSession";
import { NextApiRequest, NextApiResponse } from "next";

export default withSessionRoute(loginRoute);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { user } = req.body;

        req.session.user = user;
        graphqlRequestClient.setHeader('authorization', `Bearer ${user.login.accessToken}`)

        await req.session.save();
        res.send({ ok: true });
    }
}
