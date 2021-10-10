# Charpentier

The Charpentier framework focus on interchangebility of system architecutres
without any code modifications. It's designed so the same code works with a
monolithic system and an microservices environment.

## Concepts

**NOTE**: This section will only concern itself to explain the concepts directly linked to
the user made code, for concepts linked to the architecture produced by the
builds there's the [architeture concepts]() document.

Your code will be split into directories that will refer as `service`. A service
is the biggest unit of your system, aside from the system itself, each service
can have http endpoints, message consumers and producers and database models. Each
`service` is composed by three parts: `requestHandlers`, `messageHandlers` and
`models`, and each of these directories have files that follow a pattern accordingly
to the directory they are in. The developer can create new directories inside these
primordial directories, the files inside them will be captured by the tool, as long
as they follow the pattern of that directory.

### `requestHandlers`

The files here are responsible to handle http requests, mainly done by your external
clients. An example of their API is:

```typescript
const config = {
	route: '/user',
	method: 'post',
};

function handler(req, res, ctx) {
	//...
}

export { config, handler }
```

The `config` object will tell which is the HTTP method to use and the route of
the endpoint, the route follows the patterns defined by express (as the request
engine uses the express framework). The `handler` function uses the `req`
(request), `res` (respose) and `ctx` (context) arguments, the first two are used
to access and/or modify the response and request, the context will house the
mongoose models and the publish function, which will be explained later.

### `messageHandlers`

The files inside here will be used to consume to messages published into the
broker. An example of their API is:

```typescript
const config = {
	event: 'NEW.USER'
};

function handler(msg, ctx) {
	//...
}

export { config, handler };
```


## Installation

NOTE: Futurely this will be done by a NPM install.

Clone this repository:

```shell
# if you use HTTP
git clone https://github.com/leolanavo/charpentier.git

# if you use SSH
git@github.com:leolanavo/charpentier.git
```

This project uses [docker](https://docs.docker.com/get-docker/) and [docker-compose](https://docs.docker.com/compose/install/), for a guide for the installation of
these tools follow their documentation.

## How to use

Enter the directory clone in the installation process:

```shell
cd charpentier
```

There will be 2 directories: `scripts/` and `src/`. The `scripts` directory will
contain the code necessary to the framework to build your application, you don't
need to add or modify any code here. The `src` is where your code will live.
This project have a directory inside `src/user` that will be used as an example.

## Prototype

For the description of the task to test the prototype, read this [document]()
