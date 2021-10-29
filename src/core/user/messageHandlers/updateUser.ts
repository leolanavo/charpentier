const config = {
    topic: 'USER.UPDATE'
}

function handler(payload: any, context: any) {
    const { User } = context.models;
    User.findOneAndUpdate({ id:payload.id }, payload);
}

export {
    config,
    handler
}