# Web-push Svelte-kit Sample

1. Set your VAPID in .env (use my .env.exampl)

```zsh
bun install
bunx web-push generate-vapid-keys
# then it will give you keys
```

2. Migrate DB

```zsh
bun run db:migrate
```

3. Run dev server

```zsh
bun run dev --open
```

4. Clicks subscribe Button (src/+page.svelte)

</br>

5. Subscribe alarm (src/api/subscribe/+server.ts)

</br>

6. Visit /web-push endpoint. it will send you a alarm (src/web-push/+server.ts)


## Tech stack

- Sveltekit for frontend and backend
- web-push for push notification
- drizzle for Orm (to save Subscription in DB)
- sqlite 