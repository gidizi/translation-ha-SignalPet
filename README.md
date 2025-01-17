## Project setup

This project consist of 3 part that have to run simultaniously.

### Translation engine

Run [LibreTranslate machine](https://github.com/LibreTranslate/LibreTranslate?tab=readme-ov-file).  
 Run the project with the following configuration "–load-only en,es,de,pt,fr –update-models" and on port 5000 (default)

### Backend - Nest.js

```bash
cd signalpet-backend
$ npm install
$ npm start
```

### Frontend - React.js

```bash
cd signalpet-frontend
$ npm install
$ npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Solution architecture

The project implements i18next library to manage languages.  
For static content, it uses static translation files that are being lazy loaded with http call based on the current language.  
It uses LibreTranslate engine on the server side to translate dynamic content delivered by the backend.
Moreover, it uses the i18next to manage the current language, and triggers http calls to fetch dynamic translated data, based on its language state.  
 It also uses i18next plugins to detect browser language and persist language preferation/selection.  
Note: both i18n's static translations, and libre dynamic translation provide english language as a fallback in case of missing translation.

### Architecture (production) suggested improvement

1.Use next.js to render initial version from server (ssr).  
Then use i18next-fs-backend plugin to load static translations faster directly from FS.  
2.Host the static translation files on the backend.  
Then, use [saveMissing](https://www.i18next.com/overview/configuration-options) mechanism, and a matching backend service that updates missing keys on translation files, and providing their translated value via libre - thus acheive translation updates during runetime.
Both for newly added static keys, and semi-dinamic key such as patient detail titles.

Note: Regarding caching techniques for large list of repeating values, such as medicalTerms, we need to consider several factors:
1.what is the length of the list
2.what will be the cost of translating them on runtime
3.how long is it "acceptable" for user to wait on production for a large translation file that will be loading.
According to this delicate balance we will choose our caching strategy

## Further (mixed) production suggestions:

### General

1.make sure language codes in i18 and libre are fully synced for future use cases.  
2.Use further [caching mechanisem](https://www.i18next.com/how-to/caching).  
3.Set configuration file for each environment.

### Backend

1.Separate the Libre dependency into a standalone project. (both for development and production)  
2.Consider using memo for dynamic translation that repeats often.  
3.work with actual db, rather relational or non relational.  
4.extract data into separate layer (repository).  
5.Add logging and monitoring mechanisms.  
6.Authentication and authorization mechanism.

### Frontend

1.Extract hook for listening to i18next language changes.

## Task's Bonus points -

1.Done.  
2.Done.  
3.Done - described as part of the system's architecture - some translations are manage on static files which auto updates.  
4.Done.

## Bonus tools - how to initiate translation files quickly:

npm run i18n:scan - Scans the project, and create translation files with all relevant words for each language.
Unfortunately it works only with static values so it wasn't much effective in our case :)
