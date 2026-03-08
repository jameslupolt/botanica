import { describe, it, expect, vi, beforeEach } from 'vitest';
import { geocodeLocation } from './geocode';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

beforeEach(() => {
  mockFetch.mockReset();
});

describe('geocodeLocation', () => {
  it('returns empty array for empty query', async () => {
    const result = await geocodeLocation('');
    expect(result).toEqual([]);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('returns empty array for whitespace-only query', async () => {
    const result = await geocodeLocation('   ');
    expect(result).toEqual([]);
  });

  it('parses Nominatim response correctly', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { display_name: 'Portland, Oregon, USA', lat: '45.5152', lon: '-122.6784' },
        { display_name: 'Portland, Maine, USA', lat: '43.6591', lon: '-70.2568' },
      ],
    });

    const results = await geocodeLocation('Portland');
    expect(results).toHaveLength(2);
    expect(results[0]).toEqual({
      label: 'Portland, Oregon, USA',
      lat: 45.5152,
      lng: -122.6784,
    });
  });

  it('sends correct User-Agent header', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => [] });

    await geocodeLocation('test');
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('nominatim.openstreetmap.org'),
      expect.objectContaining({
        headers: { 'User-Agent': 'Botanica-Learning-App/1.0' },
      }),
    );
  });

  it('returns empty array on API error', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 500 });

    const results = await geocodeLocation('Portland');
    expect(results).toEqual([]);
  });

  it('includes query in URL params', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => [] });

    await geocodeLocation('New York');
    const url = mockFetch.mock.calls[0][0] as string;
    expect(url).toContain('q=New+York');
    expect(url).toContain('format=json');
    expect(url).toContain('limit=5');
  });
});
