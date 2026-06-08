// api/rates.js — Vercel Serverless Function
// Proxies CoinPaprika BCH price. Runs server-side → no CORS issues.

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=30');

  try {
    const response = await fetch(
      'https://api.coinpaprika.com/v1/tickers/bch-bitcoin-cash'
    );

    if (!response.ok) {
      throw new Error('CoinPaprika HTTP ' + response.status);
    }

    const data = await response.json();
    const usd = data?.quotes?.USD?.price;

    if (!usd || usd < 1) throw new Error('Invalid price from CoinPaprika');

    res.status(200).json({ usd: +usd.toFixed(2), src: 'CoinPaprika' });

  } catch (err) {
    res.status(502).json({ error: err.message });
  }
}
