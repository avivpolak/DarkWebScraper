# darkweb scraper

typescript darkweb scraper 

## Usage
clone this repo

## Installation

```bash
npm i
```

put your configuration in ./configs/sites

add .env file with:
- postgresql link as DATABASE_URL2="your link here"
- google as env:GOOGLE_APPLICATION_CREDENTIALAS =C:\dev\...your path to env file

set the database up:
```bash
cd src
npx prisma migrate dev --name init
npm run scrap
```
run the scraper:
```bash
cd ..
npm run scrap
```
run the api:
```bash
npm run api
```



## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)