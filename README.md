# Example projects

Prerequisities:

- [Node.js](https://nodejs.org/en)
- [NPM](https://www.npmjs.com/)
- [Apify CLI](https://www.npmjs.com/package/apify-cli)

## Crawlee scraper `my-crawler`

This scraper was created from a Crawlee template `TypeScript` + `CheerioCrawler` using a command:

```bash
npx crawlee create my crawler
```

### Installation

Install dependencies:

```bash
npm ci
```

### Run

```bash
npm start
```

## Apify actor `tripadvisor-actor`

This scraper was created from an Apify template `TypeScript` + `CheerioCrawler` using a command:

```bash
apify create tripadvisor actor
```

### Installation

Install dependencies:

```bash
npm ci
```

### Configuration

Initialize Apify `storage` directory:

```bash
apify init
```

An empty input file was generated by the `apify init` command. It should be located in `storage/key_value_stores/default/INPUT.json`. Fill in a JSON object in the following format:

```json
{
    "startUrls": [
        "https://www.tripadvisor.com/Attractions-g274707-Activities-oa0-Prague_Bohemia.html",
        "https://www.tripadvisor.com/Attractions-g274707-Activities-oa30-Prague_Bohemia.html"
    ]
}
```

Provide at least 1 URL of an attraction listing page at [Tripadvisor](https://tripadvisor.com/), such as [Prague Attractions](https://www.tripadvisor.com/Attractions-g274707-Activities-oa0-Prague_Bohemia.html) from the example above.

Results will be stored into `storage/datasets/default` directory. Each dataset item will have its own JSON file.

### Run

If you omit the `-p` (`--purge`) flag, a storage won't be cleared before starting your next run. If you already processed some requests in the earlier run, those requests will be considered completed.

```bash
apify run -p
```

### Deploy

You can deploy the actor to your Apify account with the following command:

```bash
apify push
```

Alternatively, you can provide a link to a GitHub / GitLab repository and build the project on the platform. The up-to-date code will be fetched from a remote repository.

![Deploy an actor to Apify cloud platform](https://i.imgur.com/GA7O4uS.png)