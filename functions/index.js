// Main entry point for Cloudflare Workers
import { onScheduled as getWeatherScheduled, onRequest as weatherRequest } from './api/weather';
import { onScheduled as getForexScheduled, onRequest as forexRequest } from './api/forex';
import { onRequest as weatherKVRequest } from './weather';
import { onRequest as forexKVRequest } from './forex';

// Export the scheduled handlers
export { onScheduled as scheduled_getWeather } from './api/weather';
export { onScheduled as scheduled_getForex } from './api/forex';

// Handler for HTTP requests
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Add CORS headers to all responses
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    
    // Handle OPTIONS requests for CORS
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders
      });
    }

    // Route API requests to the appropriate handler
    if (path === '/api/weather') {
      const response = await weatherRequest({ request, env, ctx });
      // Add CORS headers to the response
      const newHeaders = new Headers(response.headers);
      Object.keys(corsHeaders).forEach(key => {
        newHeaders.set(key, corsHeaders[key]);
      });
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders
      });
    }
    
    if (path === '/api/forex') {
      const response = await forexRequest({ request, env, ctx });
      // Add CORS headers to the response
      const newHeaders = new Headers(response.headers);
      Object.keys(corsHeaders).forEach(key => {
        newHeaders.set(key, corsHeaders[key]);
      });
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders
      });
    }

    // Handle the new KV-only endpoints
    if (path === '/weather') {
      const response = await weatherKVRequest({ request, env, ctx });
      // Add CORS headers to the response
      const newHeaders = new Headers(response.headers);
      Object.keys(corsHeaders).forEach(key => {
        newHeaders.set(key, corsHeaders[key]);
      });
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders
      });
    }
    
    if (path === '/forex') {
      const response = await forexKVRequest({ request, env, ctx });
      // Add CORS headers to the response
      const newHeaders = new Headers(response.headers);
      Object.keys(corsHeaders).forEach(key => {
        newHeaders.set(key, corsHeaders[key]);
      });
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders
      });
    }

    // Simple API to check if the functions are running
    if (path === '/api/status') {
      return new Response(JSON.stringify({
        status: 'online',
        functions: ['weather', 'forex'],
        endpoints: [
          {
            path: '/api/weather',
            description: 'Get weather data for Philippine cities (fetches from external API)',
            parameters: [
              { name: 'city', required: false, description: 'Specific city to get weather for' },
              { name: 'update', required: false, description: 'Set to "true" to force update KV store' }
            ]
          },
          {
            path: '/api/forex',
            description: 'Get currency exchange rates from BSP API (fetches from external API)',
            parameters: [
              { name: 'symbol', required: false, description: 'Filter by currency symbol (e.g., USD)' },
              { name: 'update', required: false, description: 'Set to "true" to force update KV store' }
            ]
          },
          {
            path: '/weather',
            description: 'Get weather data from KV store only (no external API calls)',
            parameters: [
              { name: 'city', required: false, description: 'Specific city to get weather for' }
            ]
          },
          {
            path: '/forex',
            description: 'Get forex data from KV store only (no external API calls)',
            parameters: [
              { name: 'symbol', required: false, description: 'Filter by currency symbol (e.g., USD)' }
            ]
          }
        ],
        timestamp: new Date().toISOString()
      }), {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    }

    // Return 404 for any other routes
    return new Response(JSON.stringify({
      error: 'Not found',
      availableEndpoints: ['/api/status', '/api/weather', '/api/forex', '/weather', '/forex']
    }), { 
      status: 404,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });
  }
};
