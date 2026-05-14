
import { envs } from "src/config/envs";

export const generateMapboxImage = (
    lat: number,
    lon: number,
    nearbyPoints?: { lat: number; lon: number }[]
): string => {
    const accessToken = envs.MAPBOX_TOKEN;
    const width = 800;
    const height = 400;

    const foundMarker = `pin-s+27ae60(${lon},${lat})`;

    if (!nearbyPoints || nearbyPoints.length === 0) {
        return `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/${foundMarker}/${lon},${lat},15/${width}x${height}?access_token=${accessToken}`;
    }

    const lostMarkers = nearbyPoints
        .map(p => `pin-s+e74c3c(${p.lon},${p.lat})`)
        .join(',');

    const overlays = `${foundMarker},${lostMarkers}`;

    return `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/${overlays}/auto/${width}x${height}?access_token=${accessToken}&padding=50`;
}
