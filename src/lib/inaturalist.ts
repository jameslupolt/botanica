const API_BASE = 'https://api.inaturalist.org/v1';
const PLANTAE_TAXON_ID = 47126;

export interface RegionalPlant {
  taxonId: number;
  scientificName: string;
  commonName: string;
  photoUrl: string | null;
  photoAttribution: string | null;
  observationCount: number;
}

export interface PlantObservation {
  id: number;
  taxonId: number;
  scientificName: string;
  commonName: string;
  photoUrl: string | null;
  photoAttribution: string | null;
  placeGuess: string;
  observedOn: string;
}

function mediumPhotoUrl(url: string): string {
  // iNaturalist photo URLs use "square" by default; swap to "medium" for better quality
  return url.replace('/square.', '/medium.');
}

/**
 * Fetch the most commonly observed plant species near a location.
 * Uses the species_counts endpoint for aggregated results.
 */
export async function fetchRegionalPlants(
  lat: number,
  lng: number,
  options: { radius?: number; limit?: number; taxonId?: number } = {},
): Promise<RegionalPlant[]> {
  const { radius = 50, limit = 20, taxonId } = options;

  const params = new URLSearchParams({
    lat: lat.toString(),
    lng: lng.toString(),
    radius: radius.toString(),
    taxon_id: (taxonId ?? PLANTAE_TAXON_ID).toString(),
    quality_grade: 'research',
    per_page: limit.toString(),
  });

  const response = await fetch(`${API_BASE}/observations/species_counts?${params}`);
  if (!response.ok) throw new Error(`iNaturalist API error: ${response.status}`);

  const data = await response.json();

  return (data.results ?? []).map((result: Record<string, unknown>) => {
    const taxon = result.taxon as Record<string, unknown>;
    const photo = taxon.default_photo as Record<string, unknown> | null;
    return {
      taxonId: taxon.id as number,
      scientificName: taxon.name as string,
      commonName: (taxon.preferred_common_name as string) ?? (taxon.name as string),
      photoUrl: photo?.medium_url
        ? (photo.medium_url as string)
        : photo?.url
          ? mediumPhotoUrl(photo.url as string)
          : null,
      photoAttribution: (photo?.attribution as string) ?? null,
      observationCount: result.count as number,
    };
  });
}

/**
 * Fetch recent plant observations near a location, optionally filtered by taxon.
 */
export async function fetchPlantObservations(
  lat: number,
  lng: number,
  options: { radius?: number; limit?: number; taxonId?: number } = {},
): Promise<PlantObservation[]> {
  const { radius = 50, limit = 12, taxonId } = options;

  const params = new URLSearchParams({
    lat: lat.toString(),
    lng: lng.toString(),
    radius: radius.toString(),
    taxon_id: (taxonId ?? PLANTAE_TAXON_ID).toString(),
    quality_grade: 'research',
    photos: 'true',
    per_page: limit.toString(),
    order_by: 'votes',
  });

  const response = await fetch(`${API_BASE}/observations?${params}`);
  if (!response.ok) throw new Error(`iNaturalist API error: ${response.status}`);

  const data = await response.json();

  return (data.results ?? []).map((obs: Record<string, unknown>) => {
    const taxon = obs.taxon as Record<string, unknown> | null;
    const photos = obs.photos as Record<string, unknown>[];
    const photo = photos?.[0];
    return {
      id: obs.id as number,
      taxonId: (taxon?.id as number) ?? 0,
      scientificName: (taxon?.name as string) ?? 'Unknown',
      commonName: (taxon?.preferred_common_name as string) ?? (taxon?.name as string) ?? 'Unknown',
      photoUrl: photo?.url ? mediumPhotoUrl(photo.url as string) : null,
      photoAttribution: (photo?.attribution as string) ?? null,
      placeGuess: (obs.place_guess as string) ?? '',
      observedOn: (obs.observed_on as string) ?? '',
    };
  });
}
