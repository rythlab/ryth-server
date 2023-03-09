# soundry-hub

### Dev

```sh
pnpm run start
pnpm run build:dev
```

```sh
ipfs daemon
```

### Prod

```sh
pnpm run build:prod
```

### Generate graphql codegen

```sh
pnpm run generate
```

### Boot up relevant services locally

```sh
docker compose up
```

### Clean up docker locally

```sh
docker rm -f $(docker ps -qa)
docker rmi -f $(docker images -q)
docker volume rm -f $(docker volume ls -q)
docker system prune -f
```
# ryth-server
