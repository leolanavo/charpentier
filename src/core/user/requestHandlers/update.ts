import { Response, Request} from 'express';

const config = {
    method: 'put',
    route: '/user/:id',
};

async function handler(req: Request, res: Response, context: any) {
    const { User } = context.models;

    const user = await User.findById(req.params.id);

    if(!user) {
        res.status(404).send();
        return;
    }

    user.email = req.body.email
    context.publish('USER.UPDATE', user);

    res
            .status(201)
            .json(user)
}

export {
    config,
    handler
}