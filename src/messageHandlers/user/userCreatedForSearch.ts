const config = {
  topic: 'USER_CREATED'
}

function handler(payload: string) {
  console.log(payload);
}

export {
  config,
  handler
}


