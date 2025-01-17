### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

##Described solution architecture
The project implements i18next library to manage static by usinng i18next library.  
It makes a lazy http call to get only the relevant language files on language change.

##Steps when adding new language or dynamic values:
if adding a new language - add the new language to the lngs attr at i18next-scanner.config.js  
npm run i18n:scan - files with all relevant keys for each language will be generate (i.e public\locales\i18n\es\extractedKeysFromText.json)  
Change the new languages file name and translate the values (can be done with LibreTranslate), or for existing languages just add the missing key to the relevant translation files.  
note a: The functionality is still limited and misses dynamicly extracted fields.
note: This method can be improved, view futher improvement tips about saveMissing config.

additions:

write about initiating the libre

prod:
libre server at prod
update translations - https://www.i18next.com/how-to/extracting-translations

//todo: fallbacklng iii18n config
//todo: i18 browser language detecotor library and use it
//interpolation for jsx, note escaping
//theres a function on min 15:30 to change language with i18n library
//he installed i18next-http-backend (and talked about i18next-fs-backend for server side so read about it) - it seems that even the basic backend library aims to make http request to translator to missing translations but read more about it
//react suspense

//convert stuff to nextjs, adjust the i18 libraries
//load the files at ssr, and then use them at api endpoint for language change.
//note that also ssr might have to translate according to use preference

//note: 15:49 - the manual selected language is persistd at the local storage
//make sure language codes in i18 and libre are sync
//some caching guide https://www.i18next.com/how-to/caching

Further production tasks:

1.Translation fallbacks - https://www.i18next.com/how-to/backend-fallback
2.use i18next-fs-backend to load files during ssr directly from the backend
3.Activate the saveMissing config, to notify our backend about missing keys. Then define logic at the backend to create these keys and get their translate via libreTranslate
4.Integrae existing translation files into backend server
5.implement the logic that updates translation file on saveMissing event/call from i18next
6.migrate to next js 7. it worth try to find some method to sync between i18n supportedlngs lists and the libre configuration

Areas that need further consideration:
1.summarySentenceStructures - The text template is being translated (in attempt saving unnecessary calculations) and then the injected terms are being translated separately. verify that this methodology works well enough.

//current steps:
1.figure out how to make the relevant translation without much manual work - VVV
2.convert to nextjs - or alternatively create a nest project - current step
קראתי מה שכתוב במחברת ומסתמן ממש שאני רוצה להרים פרויקט נפרד לבק שזה מה שנאמר בראיון כי אמרו בכל שפה שנח ואז הכוונה לא לנסט

backend project - describe how would we handle saveMissing functionality, maybe just high level (include holding description files at be)

Bonus points -

1.Done.  
2.Done.  
3.Done - described as part of the system's architecture - some translations are manage on static files which auto updates.  
4.Done.
