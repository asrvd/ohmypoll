## Oh My Poll

create and share polls privately or publicly -- its fast and free!

### Tech Stack
- Next.js
- TailwindCSS
- Prisma
- PlanetScale

### External Dependencies
- formik
- nanoid
- react-icons
- nprogress
- react-hot-toast

### Run Locally
- Clone the repository
```bash
git clone https://github.com/asheeeshh/ohmypoll.git
```
- Create a database on [planetscale](https://planetscale.com) and set the `DATABASE_URL` environment variable in a `.env` file, see [`.env.example`](/.env.example) for example. You can also use this command.
```bash
echo "DATABASE_URL=your_databse_url" > .env
```
- Install dependencies
```bash
cd ohmypoll
pnpm i # or npm i
```
- Fire up prisma
```bash
pnpm dlx prisma db push # or npx prisma db push
``` 
- Run the app
```bash
pnpm run dev # or npm run dev
```

### License 
[MIT License](LICENSE)

### Contributing
- Fork the repository
- Create a new branch
- Make your changes
- Commit your changes
- Push your changes to the main branch
- Open a pull request

### Ending Note
- If you have any questions, suggestions or bug reports please open an issue.
- Leave a star if you like the project.
- If you like this project, please consider [supporting](https://www.buymeacoffee.com/asheeshh) me.

