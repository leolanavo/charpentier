const config = {
  topic: 'USER_CREATED'
}

function handler(payload: any) {
  console.log(payload);
}

export {
  config,
  handler
}

