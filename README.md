# UI toolkit
- [Semantic UI React](http://react.semantic-ui.com)


# How to run the environment
Install it and run:

# for development

```bash
npm install
npm start  // no watch
or
npmr run watch
```

# for production
```bash
npm install
npm run build
npm run prod
```


# Use on pm2

# for development

```bash
npm install
pm2 start npm --name "NOWnews-member-web-dev" -- start
```

# for production

```bash
npm install
npm run build
pm2 start npm --name "NOWnews-member-web-production" -- run prod
```
