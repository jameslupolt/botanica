import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchRegionalPlants, fetchPlantObservations } from './inaturalist';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

beforeEach(() => {
  mockFetch.mockReset();
});

describe('fetchRegionalPlants', () => {
  const mockApiResponse = {
    results: [
      {
        count: 42,
        taxon: {
          id: 12345,
          name: 'Quercus robur',
          preferred_common_name: 'English Oak',
          default_photo: {
            medium_url: 'https://example.com/oak-medium.jpg',
            attribution: '(c) John Doe',
          },
        },
      },
    ],
  };

  it('parses species_counts response correctly', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse,
    });

    const plants = await fetchRegionalPlants(45.5, -122.6);
    expect(plants).toHaveLength(1);
    expect(plants[0]).toEqual({
      taxonId: 12345,
      scientificName: 'Quercus robur',
      commonName: 'English Oak',
      photoUrl: 'https://example.com/oak-medium.jpg',
      photoAttribution: '(c) John Doe',
      observationCount: 42,
    });
  });

  it('uses correct API endpoint and default params', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: [] }),
    });

    await fetchRegionalPlants(45.5, -122.6);
    const url = mockFetch.mock.calls[0][0] as string;
    expect(url).toContain('observations/species_counts');
    expect(url).toContain('lat=45.5');
    expect(url).toContain('lng=-122.6');
    expect(url).toContain('radius=50');
    expect(url).toContain('taxon_id=47126'); // PLANTAE_TAXON_ID
    expect(url).toContain('quality_grade=research');
    expect(url).toContain('per_page=20');
  });

  it('applies custom options', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: [] }),
    });

    await fetchRegionalPlants(40, -74, { radius: 100, limit: 5, taxonId: 999 });
    const url = mockFetch.mock.calls[0][0] as string;
    expect(url).toContain('radius=100');
    expect(url).toContain('per_page=5');
    expect(url).toContain('taxon_id=999');
  });

  it('throws on API error', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 500 });
    await expect(fetchRegionalPlants(45.5, -122.6)).rejects.toThrow('iNaturalist API error: 500');
  });

  it('handles photo without medium_url by converting square URL', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [
          {
            count: 1,
            taxon: {
              id: 1,
              name: 'Test',
              default_photo: {
                url: 'https://example.com/photos/square.jpg',
                attribution: 'test',
              },
            },
          },
        ],
      }),
    });

    const plants = await fetchRegionalPlants(0, 0);
    expect(plants[0].photoUrl).toBe('https://example.com/photos/medium.jpg');
  });

  it('handles missing photo', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [
          {
            count: 1,
            taxon: {
              id: 1,
              name: 'Test',
              default_photo: null,
            },
          },
        ],
      }),
    });

    const plants = await fetchRegionalPlants(0, 0);
    expect(plants[0].photoUrl).toBeNull();
    expect(plants[0].photoAttribution).toBeNull();
  });
});

describe('fetchPlantObservations', () => {
  it('parses observations response correctly', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [
          {
            id: 999,
            taxon: {
              id: 123,
              name: 'Rosa canina',
              preferred_common_name: 'Dog Rose',
            },
            photos: [
              {
                url: 'https://example.com/photos/square.jpg',
                attribution: '(c) Jane',
              },
            ],
            place_guess: 'Portland, OR',
            observed_on: '2024-06-15',
          },
        ],
      }),
    });

    const obs = await fetchPlantObservations(45.5, -122.6);
    expect(obs).toHaveLength(1);
    expect(obs[0]).toEqual({
      id: 999,
      taxonId: 123,
      scientificName: 'Rosa canina',
      commonName: 'Dog Rose',
      photoUrl: 'https://example.com/photos/medium.jpg',
      photoAttribution: '(c) Jane',
      placeGuess: 'Portland, OR',
      observedOn: '2024-06-15',
    });
  });

  it('uses correct endpoint and includes photos param', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: [] }),
    });

    await fetchPlantObservations(45.5, -122.6);
    const url = mockFetch.mock.calls[0][0] as string;
    expect(url).toContain('/observations?');
    expect(url).not.toContain('species_counts');
    expect(url).toContain('photos=true');
    expect(url).toContain('order_by=votes');
    expect(url).toContain('per_page=12');
  });

  it('handles missing taxon gracefully', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [
          {
            id: 1,
            taxon: null,
            photos: [],
            place_guess: null,
            observed_on: null,
          },
        ],
      }),
    });

    const obs = await fetchPlantObservations(0, 0);
    expect(obs[0].scientificName).toBe('Unknown');
    expect(obs[0].commonName).toBe('Unknown');
    expect(obs[0].taxonId).toBe(0);
  });
});
