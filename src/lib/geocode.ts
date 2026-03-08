export interface GeocodingResult {
  label: string;
  lat: number;
  lng: number;
}

/**
 * Geocode a location string using OpenStreetMap Nominatim.
 * Free, no API key required. Rate limit: 1 req/sec.
 */
export async function geocodeLocation(query: string): Promise<GeocodingResult[]> {
  if (!query.trim()) return [];

  try {
    const params = new URLSearchParams({
      q: query,
      format: 'json',
      limit: '5',
      addressdetails: '0',
    });

    const response = await fetch(`https://nominatim.openstreetmap.org/search?${params}`, {
      headers: { 'User-Agent': 'Botanica-Learning-App/1.0' },
    });

    if (!response.ok) return [];

    const data = await response.json();

    return (data as Record<string, unknown>[]).map((item) => ({
      label: item.display_name as string,
      lat: parseFloat(item.lat as string),
      lng: parseFloat(item.lon as string),
    }));
  } catch {
    return [];
  }
}
