import type { IncomingMessage, ServerResponse } from 'node:http';

export type UtilitySource = 'PALECO' | 'PPCWD';

export type AdvisoryCategory =
  | 'power-outage'
  | 'power-interruption'
  | 'power-advisory'
  | 'water-interruption'
  | 'water-advisory'
  | 'water-quality'
  | 'maintenance'
  | 'news';

export interface UtilityAdvisory {
  id: string;
  source: UtilitySource;
  providerName: string;
  title: string;
  date: string;
  url: string;
  category: AdvisoryCategory;
  status: string;
  isUrgent?: boolean;
  timeOut?: string;
  timeRestored?: string;
  reason?: string;
  affectedAreas: string[];
  feeders?: string[];
  summary: string;
  content: string;
  imageUrl?: string;
}

// All 66 official barangays of Puerto Princesa City + notable zones/landmarks
const PPC_BARANGAYS = [
  'Babuyan',
  'Bacungan',
  'Bagong Bayan',
  'Bagong Pag-asa',
  'Bagong Sikat',
  'Bagong Silang',
  'Bahile',
  'Bancao-Bancao',
  'Barangay ng mga Mangingisda',
  'Binduyan',
  'Buenavista',
  'Cabayugan',
  'Concepcion',
  'Inagawan',
  'Inagawan Sub-Colony',
  'Irawan',
  'Iwahig',
  'Kalipay',
  'Kamuning',
  'Langogan',
  'Liwanag',
  'Lucbuan',
  'Luzviminda',
  'Mabuhay',
  'Macarascas',
  'Magkakaibigan',
  'Maligaya',
  'Manalo',
  'Mandaragat',
  'Manggahan',
  'Maningning',
  'Maoyon',
  'Marufinas',
  'Maruyogon',
  'Masigla',
  'Masikap',
  'Masipag',
  'Matahimik',
  'Matiyaga',
  'Maunlad',
  'Milagrosa',
  'Model',
  'Montible',
  'Napsan',
  'New Panggangan',
  'Pagkakaisa',
  'Princesa',
  'Salvacion',
  'San Jose',
  'San Manuel',
  'San Miguel',
  'San Pedro',
  'San Rafael',
  'Santa Cruz',
  'Santa Lourdes',
  'Santa Lucia',
  'Santa Monica',
  'Seaside',
  'Sicsican',
  'Simpocan',
  'Tagabinet',
  'Tagburos',
  'Tagumpay',
  'Tanabag',
  'Tanglaw',
  'Tiniguiban',
];

const LOCAL_ZONES = [
  'Abanico',
  'Baltan',
  'Chariot',
  'Paleco Compound',
  'Wescom',
  'BM Road',
  'Mitra Road',
  'Libis',
  'Rafols',
  'Jacana',
  'Rizal Avenue',
  'Malvar',
  'Valencia',
  'Bgy. Tiniguiban Heights',
  'Campo',
];

function cleanHtml(html?: string): string {
  if (!html) return '';
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<br\s*[/]?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<li[^>]*>/gi, '• ')
    .replace(/<\/li>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8216;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8230;/g, '...')
    .replace(/&#038;/g, '&')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&hellip;/g, '...')
    .replace(/&nbsp;/g, ' ')
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n+/g, '\n\n')
    .trim();
}

function extractAffectedAreas(text: string): string[] {
  const detected = new Set<string>();
  const lower = text.toLowerCase();

  for (const b of PPC_BARANGAYS) {
    const bLower = b.toLowerCase();

    if (b === 'Princesa') {
      if (
        /\b(?:brgy\.?|barangay)\s+princesa\b/i.test(text) ||
        /\bprincesa\b/i.test(text.replace(/puerto\s+princesa/gi, ''))
      ) {
        detected.add(b);
      }
      continue;
    }

    if (
      b === 'Model' ||
      b === 'Seaside' ||
      b === 'Liwanag' ||
      b === 'Mabuhay'
    ) {
      if (
        new RegExp(`\\b(?:brgy\\.?|barangay)\\s+${bLower}\\b`, 'i').test(
          text
        ) ||
        new RegExp(`\\b${b}\\b`).test(text)
      ) {
        detected.add(b);
      }
      continue;
    }

    const wordBoundaryRegex = new RegExp(
      `\\b${bLower.replace(/[-]/g, '[- ]')}\\b`,
      'i'
    );
    if (
      wordBoundaryRegex.test(lower) ||
      lower.includes(`brgy. ${bLower}`) ||
      lower.includes(`brgy ${bLower}`) ||
      lower.includes(`barangay ${bLower}`)
    ) {
      detected.add(b);
    }
  }

  for (const z of LOCAL_ZONES) {
    const zRegex = new RegExp(`\\b${z.toLowerCase()}\\b`, 'i');
    if (zRegex.test(lower)) {
      detected.add(z);
    }
  }

  return Array.from(detected);
}

function extractFeeders(text: string): string[] {
  const feeders = new Set<string>();
  const matches = text.matchAll(/\b(?:Feeder|FDR)\s*#?\s*([0-9]+[A-Z]?)\b/gi);
  for (const m of matches) {
    feeders.add(`Feeder ${m[1]}`);
  }
  return Array.from(feeders);
}

interface WpPost {
  id: number;
  date: string;
  date_gmt?: string;
  link: string;
  title?: { rendered?: string };
  content?: { rendered?: string };
  excerpt?: { rendered?: string };
  jetpack_featured_media_url?: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url?: string }>;
  };
}

// Posts older than this aren't treated as ongoing or urgent anymore. Neither
// site reliably links a final update back to the original report, so age is
// the only signal that an outage is over.
const URGENT_WINDOW_HOURS = 48;

function isRecent(post: WpPost): boolean {
  const published = post.date_gmt
    ? new Date(`${post.date_gmt}Z`)
    : new Date(post.date);
  const ageHours = (Date.now() - published.getTime()) / 36e5;
  return ageHours >= 0 && ageHours <= URGENT_WINDOW_HOURS;
}

function parsePalecoPost(post: WpPost): UtilityAdvisory {
  const rawTitle = post.title?.rendered || '';
  const rawContent = post.content?.rendered || '';
  const rawExcerpt = post.excerpt?.rendered || '';

  const title = cleanHtml(rawTitle);
  const cleanContent = cleanHtml(rawContent);
  const cleanExcerpt = cleanHtml(rawExcerpt);
  const fullText = `${title}\n${cleanContent}\n${cleanExcerpt}`;

  const timeOutMatch = fullText.match(
    /(?:Oras\s*(?:Na)?\s*Nawalan|Time\s*(?:of)?\s*Interruption):\s*([^\n\r]+)/i
  );
  const timeRestoredMatch = fullText.match(
    /(?:Oras\s*(?:Na)?\s*Naibalik|Time\s*(?:of)?\s*Restoration):\s*([^\n\r]+)/i
  );
  const reasonMatch = fullText.match(
    /(?:Detalye|Dahilan|Reason|Cause):\s*([^\n\r]+)/i
  );
  const dateMentionMatch = fullText.match(/(?:Petsa|Date):\s*([^\n\r]+)/i);

  const affectedAreas = extractAffectedAreas(fullText);
  const feeders = extractFeeders(fullText);

  let status = 'Advisory';
  const isFinalUpdate = /Final\s*Update/i.test(title);
  const hasRestoredTime = Boolean(timeRestoredMatch);
  const isScheduled =
    /Scheduled\s*Power\s*Interruption/i.test(title) ||
    /Pabatid/i.test(title) ||
    /Nakatakdang/i.test(title);

  if (isFinalUpdate || hasRestoredTime) {
    status = 'Restored';
  } else if (isScheduled) {
    status = 'Scheduled';
  } else if ((/Emergency/i.test(title) || timeOutMatch) && isRecent(post)) {
    status = 'Ongoing / Investigating';
  }

  let category: AdvisoryCategory = 'power-advisory';
  if (isScheduled) {
    category = 'power-interruption';
  } else if (
    /Power\s*Service\s*Advisory/i.test(title) ||
    /Outage/i.test(title) ||
    /Brownout/i.test(title)
  ) {
    category = 'power-outage';
  } else if (/Warriors of Light|Line clearing|Tapping/i.test(title)) {
    category = 'maintenance';
  } else if (/Bid|Registration|Power Run|Tuklas/i.test(title)) {
    category = 'news';
  }

  let summary = '';
  if (timeOutMatch || timeRestoredMatch || reasonMatch) {
    const parts = [];
    if (dateMentionMatch) parts.push(`Date: ${dateMentionMatch[1].trim()}`);
    if (timeOutMatch) parts.push(`Outage: ${timeOutMatch[1].trim()}`);
    if (timeRestoredMatch)
      parts.push(`Restored: ${timeRestoredMatch[1].trim()}`);
    if (reasonMatch) parts.push(`Details: ${reasonMatch[1].trim()}`);
    summary = parts.join(' • ');
  } else if (cleanExcerpt) {
    summary = cleanExcerpt.replace(/\.\.\.$/, '').slice(0, 260) + '...';
  } else {
    summary =
      cleanContent.slice(0, 260) + (cleanContent.length > 260 ? '...' : '');
  }

  const palecoEmbeddedImg =
    post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const palecoJetpackImg = post.jetpack_featured_media_url;
  const palecoContentImg = rawContent.match(
    /<img[^>]+src=["']([^"']+)["']/i
  )?.[1];
  const imageUrl =
    palecoJetpackImg || palecoEmbeddedImg || palecoContentImg || undefined;

  return {
    id: `paleco-${post.id}`,
    source: 'PALECO',
    providerName: 'Palawan Electric Cooperative',
    title,
    date: post.date || post.date_gmt || new Date().toISOString(),
    url: post.link,
    category,
    status,
    isUrgent: status === 'Ongoing / Investigating',
    timeOut: timeOutMatch ? timeOutMatch[1].trim() : undefined,
    timeRestored: timeRestoredMatch ? timeRestoredMatch[1].trim() : undefined,
    reason: reasonMatch ? reasonMatch[1].trim() : undefined,
    affectedAreas,
    feeders,
    summary,
    content: cleanContent,
    imageUrl,
  };
}

function parsePpcwdPost(post: WpPost): UtilityAdvisory {
  const rawTitle = post.title?.rendered || '';
  const rawContent = post.content?.rendered || '';
  const rawExcerpt = post.excerpt?.rendered || '';

  const title = cleanHtml(rawTitle);
  const cleanContent = cleanHtml(rawContent);
  const cleanExcerpt = cleanHtml(rawExcerpt);
  const fullText = `${title}\n${cleanContent}\n${cleanExcerpt}`;

  let category: AdvisoryCategory = 'water-advisory';
  let status = 'Advisory';

  const isInterruption =
    /Interruption|Low\s*Pressure|Water\s*Advisories|Water\s*Cut|Maintenance|Pipeline/i.test(
      title
    );
  // Only the title: explainers and news posts often mention leaks or
  // emergencies in passing.
  const isEmergency =
    isInterruption && /Emergency|Leak/i.test(title) && isRecent(post);
  // Barangays named in a news article aren't "affected areas".
  const affectedAreas = isInterruption ? extractAffectedAreas(fullText) : [];
  const isQuality = /Laboratory|Testing|Safe\s*Water|Potability/i.test(
    fullText
  );

  if (isInterruption) {
    category = 'water-interruption';
    status = isEmergency ? 'Ongoing / Emergency' : 'Scheduled / Advisory';
  } else if (isQuality) {
    category = 'water-quality';
    status = 'Info';
  } else if (/Transmission\s*Line|Inaugurates|Project|Works/i.test(title)) {
    category = 'maintenance';
    status = 'Project Update';
  } else {
    category = 'news';
    status = 'Official News';
  }

  let summary = '';
  if (cleanExcerpt && cleanExcerpt.length > 30) {
    summary = cleanExcerpt.replace(/\.\.\.$/, '').slice(0, 260) + '...';
  } else {
    summary =
      cleanContent.slice(0, 260) + (cleanContent.length > 260 ? '...' : '');
  }

  const ppcwdEmbeddedImg =
    post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const ppcwdJetpackImg = post.jetpack_featured_media_url;
  const ppcwdContentImg = rawContent.match(
    /<img[^>]+src=["']([^"']+)["']/i
  )?.[1];
  const imageUrl =
    ppcwdJetpackImg || ppcwdEmbeddedImg || ppcwdContentImg || undefined;

  return {
    id: `ppcwd-${post.id}`,
    source: 'PPCWD',
    providerName: 'Puerto Princesa City Water District',
    title,
    date: post.date || post.date_gmt || new Date().toISOString(),
    url: post.link,
    category,
    status,
    isUrgent: isEmergency,
    affectedAreas,
    summary,
    content: cleanContent,
    imageUrl,
  };
}

async function fetchWithTimeout(
  url: string,
  timeoutMs = 9000
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; BetterPuertoPrincesa/1.3; +https://betterpuertoprincesa.org)',
        Accept: 'application/json, text/plain, */*',
      },
    });
    return res;
  } finally {
    clearTimeout(timer);
  }
}

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse
) {
  // CORS headers (Cache-Control is set below, once we know whether the
  // sources responded)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

  const palecoUrl =
    'https://paleco.net/paleco/wp-json/wp/v2/posts?_embed=1&categories=58,9,11,10&per_page=15';
  const ppcwdUrl =
    'https://ppcwater.gov.ph/wp-json/wp/v2/posts?_embed=1&per_page=15';

  const failedSources: UtilitySource[] = [];

  const palecoPromise = fetchWithTimeout(palecoUrl)
    .then(async r => {
      if (!r.ok) throw new Error(`PALECO HTTP ${r.status}`);
      const data = (await r.json()) as WpPost[];
      if (!Array.isArray(data)) throw new Error('PALECO returned no posts');
      return data.map(parsePalecoPost);
    })
    .catch(err => {
      console.warn('[advisories] PALECO fetch failed:', err?.message || err);
      failedSources.push('PALECO');
      return [] as UtilityAdvisory[];
    });

  const ppcwdPromise = fetchWithTimeout(ppcwdUrl)
    .then(async r => {
      if (!r.ok) throw new Error(`PPCWD HTTP ${r.status}`);
      const data = (await r.json()) as WpPost[];
      if (!Array.isArray(data)) throw new Error('PPCWD returned no posts');
      return data.map(parsePpcwdPost);
    })
    .catch(err => {
      console.warn('[advisories] PPCWD fetch failed:', err?.message || err);
      failedSources.push('PPCWD');
      return [] as UtilityAdvisory[];
    });

  const [palecoItems, ppcwdItems] = await Promise.all([
    palecoPromise,
    ppcwdPromise,
  ]);

  // Both sources down: don't let the CDN cache an empty list. With no-store
  // on an error, Vercel keeps serving the last good copy within its
  // stale-while-revalidate window, and the page shows its error state
  // otherwise.
  if (failedSources.length === 2) {
    res.setHeader('Cache-Control', 'no-store');
    res.statusCode = 502;
    res.end(JSON.stringify({ error: 'PALECO and PPCWD are unreachable' }));
    return;
  }

  // One source down: cache briefly so it's retried soon.
  res.setHeader(
    'Cache-Control',
    failedSources.length
      ? 's-maxage=300, stale-while-revalidate=86400'
      : 's-maxage=1800, stale-while-revalidate=86400'
  );

  const combined = [...palecoItems, ...ppcwdItems].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const responsePayload = {
    metadata: {
      lastUpdated: new Date().toISOString(),
      palecoCount: palecoItems.length,
      ppcwdCount: ppcwdItems.length,
      totalCount: combined.length,
      failedSources,
    },
    advisories: combined,
  };

  res.statusCode = 200;
  res.end(JSON.stringify(responsePayload));
}
