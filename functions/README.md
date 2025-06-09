# BetterGov Cloudflare Functions

This folder contains Cloudflare Functions that run on a schedule to fetch and store data for the BetterGov application. The functions are written in TypeScript for improved type safety and developer experience.

## Functions

### 1. Web Crawler (`api/crawl.ts`)

A generic web crawler that fetches and stores web content using multiple backend implementations. Currently supports Jina.ai API and Cloudflare Browser Rendering API.

- **Database**: Cloudflare D1 `BETTERGOV_DB`
- **Environment Variables**:
  - `JINA_API_KEY` - API key for Jina.ai
  - `CF_ACCOUNT_ID` - Cloudflare account ID for browser rendering API
  - `CF_API_TOKEN` - Cloudflare API token for browser rendering API
- **Endpoints**:
  - `/api/crawl?url=<url>&crawler=<crawler_type>&force=<true|false>` - Fetches and stores content
  - Parameters:
    - `url`: The URL to crawl (required)
    - `crawler`: The crawler implementation to use (`jina` or `cfbrowser`)
    - `force`: Whether to force a fresh crawl even if cached data exists

### 2. Weather Data (`api/weather.ts`)

Fetches weather data for major Philippine cities from OpenWeatherMap API and stores it in Cloudflare KV.

- **Schedule**: Runs hourly
- **KV Store**: `WEATHER_KV`
- **Environment Variables**: Requires `OPENWEATHERMAP_API_KEY`
- **Endpoints**:
  - `/api/weather` - Fetches from API if needed
  - `/weather` - Reads only from KV store

### 3. Currency Exchange Rates (`api/forex.ts`)

Fetches currency exchange rates from Bangko Sentral ng Pilipinas (BSP) and stores them in Cloudflare KV.

- **Schedule**: Runs hourly
- **KV Store**: `FOREX_KV`
- **Data Source**: BSP Exchange Rate API
- **Endpoints**:
  - `/api/forex` - Fetches from API if needed
  - `/forex` - Reads only from KV store

### Web Crawler Architecture

The web crawler is designed with a flexible abstraction layer that allows for multiple crawler implementations:

- **WebCrawler Interface** (`lib/crawler.ts`): Defines the contract for any crawler implementation
- **JinaCrawler** (`lib/jina.ts`): Implementation using Jina.ai API
- **CFBrowserCrawler** (`lib/cf-browser.ts`): Implementation using Cloudflare's Browser Rendering API

This architecture allows for easy switching between different crawler backends without changing the API endpoints or business logic.

#### Database Schema

The crawler uses a Cloudflare D1 database with the following main tables:

- `pages`: Stores crawled page content and metadata
- `links`: Stores links found on crawled pages
- `crawl_queue`: Manages URLs to be crawled

#### Testing

A test script is provided to test the crawler functionality:

```bash
node test-crawler.js <url> <api_key> [crawler_type]
```

Example:

```bash
# Test with Jina crawler
node test-crawler.js https://www.dof.gov.ph your_jina_api_key jina

# Test with Cloudflare Browser crawler
node test-crawler.js https://www.dof.gov.ph your_jina_api_key cfbrowser
```

## TypeScript Setup

This project uses TypeScript for improved type safety and developer experience. The TypeScript configuration is located in `tsconfig.json` and includes:

- Target: ES2022
- Module: ES2022
- Types: @cloudflare/workers-types
- Strict type checking enabled

### Type Definitions

The `types.ts` file contains TypeScript interfaces for:

- `Env` - Environment variables and bindings for Cloudflare Workers
- Weather API response data structures
- Forex API response data structures
- Web crawler response data structures (Jina.ai and Cloudflare Browser API)

## Development Workflow

1. Make changes to TypeScript files in the `functions/` directory
2. Run the TypeScript compiler to build the project:

   ```
   npm run functions:build
   ```

3. Run the development server to test locally:

   ```
   npm run functions:dev
   ```

4. Deploy to Cloudflare:

   ```
   npm run functions:deploy
   ```

## Setup Instructions

1. Install Wrangler CLI (Cloudflare Workers CLI):

   ```
   npm install -g wrangler
   ```

2. Login to your Cloudflare account:

   ```
   wrangler login
   ```

3. Create KV namespaces and D1 database:

   ```
   wrangler kv:namespace create WEATHER_KV
   wrangler kv:namespace create FOREX_KV
   wrangler d1 create bettergov
   ```

4. Update the `wrangler.toml` file with the KV namespace IDs and D1 database ID from the previous step.

5. Add your API keys as secrets:

   ```
   wrangler secret put OPENWEATHERMAP_API_KEY
   wrangler secret put JINA_API_KEY
   wrangler secret put CF_API_TOKEN
   wrangler secret put CF_ACCOUNT_ID
   ```

6. Install TypeScript dependencies:

   ```
   npm install --save-dev typescript @cloudflare/workers-types
   ```

7. Build and deploy the functions:

   ```
   npm run functions:build
   npm run functions:deploy
   ```

## Accessing the Data

### KV Storage

The following data is stored in Cloudflare KV with these keys:

- Weather data: `philippines_weather`
- Currency exchange rates: `bsp_exchange_rates`

### D1 Database

Web crawler data is stored in the Cloudflare D1 database `BETTERGOV_DB` with the following schema:

- `pages`: Stores crawled page content and metadata
- `links`: Stores links found on crawled pages
- `crawl_queue`: Manages URLs to be crawled

You can access this data from your frontend application or other Cloudflare Workers/Functions.
