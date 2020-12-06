# Svelte Frontend Template

Front-end development with Svelte, Typescript, SASS.

## Getting Started

- Make local copy of template: `npx degit framefactory/svelte-frontend-template`
- Install dependencies: `npm install`
- Copy and edit environment settings: `cp .env.template .env`
- Development with hot reloading: `npm run dev`
- Development build: `npm run build:dev`
- Production build: `npm run build:prod`

### Hot reloading behind reverse proxy / secure connection

Proper web socket configuration:
```shell script
DEV_SERVER_WEBSOCKET_HOST=myhost.net  # The dev server's outside URL
DEV_SERVER_WEBSOCKET_PORT=443         # The dev server's outside port (443 for SSL connection)
DEV_SERVER_PORT=9000                  # The dev server's internal port
```
