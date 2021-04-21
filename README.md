![Dev Quotes homepage](./.github/screenshots/dev-quotes-screenshot.png)

# Dev Quotes

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/quote](http://localhost:3000/api/quote). This endpoint can be edited in `pages/api/quote.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

To run the tests:

```bash
npm test
# or
yarn test
```

## Application features

- Fetch a single quote
- Continuously fetch new quotes in a loop on a timer, indicated by a progress bar. Kind of like a slide show.
- Share quotes on Twitter, Facebook or WhatsApp

## Tests

The tests can be found in the `__tests__` directory. The tests are also written in TypeScript.

Jest features like fake timers and mocking have been used to skip timers and to mock requests.

React Testing Library has been used to mimic user interactions as much as possible in the tests.

## Tech used

- TypeScript
- ReactJS
- NextJS
- CSS modules
- Jest
- React Testing Library
- react-share
- Babel
- ESLint
- Prettier
- Husky
- Lint Staged

### NextJS

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
