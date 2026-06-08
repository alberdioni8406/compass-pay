export default async function handler(req, res) {
  // Allow browser requests from any origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  // Cache at Vercel's CDN edge for 60s, serve stale for 30s while revalidating
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=30');

  try {
    const r = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin-cash&vs_currencies=usd,eur,gbp,zar,brl',
      { headers: { 'Accept': 'application/json' } }
    );
    if (!r.ok) throw new Error('CoinGecko ' + r.status);
    const data = await r.json();
    const bch = data['bitcoin-cash'];
    if (!bch || !bch.usd) throw new Error('No BCH data');

    res.status(200).json({
      usd: bch.usd,
      eur: bch.eur,
      gbp: bch.gbp,
      zar: bch.zar,
      brl: bch.brl,
      // MZN & NGN not available in CoinGecko free tier — calculated from USD
      mzn: parseFloat((bch.usd * 63.8).toFixed(2)),
      ngn: parseFloat((bch.usd * 1605).toFixed(2)),
      src: 'CoinGecko'
    });
  } catch (e) {
    res.status(502).json({ error: 'upstream failed', detail: e.message });
  }
}
