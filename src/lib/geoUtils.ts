export const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
): string => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km

    if (d < 1) {
        return `${Math.round(d * 1000)} m`;
    }
    return `${d.toFixed(1)} km`;
};

const deg2rad = (deg: number): number => {
    return deg * (Math.PI / 180);
};

export const getGoogleMapsUrl = (lat: number, lon: number): string => {
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`;
};

export const getAppleMapsUrl = (lat: number, lon: number): string => {
    return `https://maps.apple.com/?daddr=${lat},${lon}`;
};

export const getWazeUrl = (lat: number, lon: number): string => {
    return `https://waze.com/ul?ll=${lat},${lon}&navigate=yes`;
};

export const openMapNavigation = (lat: number, lon: number) => {
    const isIOS =
        /iPad|iPhone|iPod/.test(navigator.userAgent) &&
        !(window as any).MSStream;

    if (isIOS) {
        window.open(getAppleMapsUrl(lat, lon), '_blank');
    } else {
        window.open(getGoogleMapsUrl(lat, lon), '_blank');
    }
};

export interface GeocodeResult {
    display: string;
    full: string;
}

export const reverseGeocode = async (lat: number, lon: number, token: string): Promise<GeocodeResult> => {
    try {
        const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?types=place,locality,neighborhood,address&limit=1&access_token=${token}`
        );
        const data = await response.json();
        if (data.features && data.features.length > 0) {
            const feature = data.features[0];
            const streetName = feature.text;
            const houseNumber = feature.address; // Mapbox stores house number here for 'address' type
            const fullAddress = feature.place_name;

            // Build the specific place name (e.g., "123 Main St" or just "Main St")
            const mainName = houseNumber ? `${houseNumber} ${streetName}` : streetName;

            // Try to find city and country in context
            const city = feature.context?.find((c: any) => c.id.startsWith('place'))?.text;
            const country = feature.context?.find((c: any) => c.id.startsWith('country'))?.text;

            let displayAddress = fullAddress;
            if (city && country) {
                // If it's a city-level search, don't repeat the city
                displayAddress = streetName === city ? `${city}, ${country}` : `${mainName}, ${city}, ${country}`;
            } else {
                // Fallback: If context isn't helpful, take the first and last two parts of place_name
                const parts = fullAddress.split(', ');
                if (parts.length > 3) {
                    displayAddress = `${parts[0]}, ${parts[parts.length - 2]}, ${parts[parts.length - 1]}`;
                }
            }

            return {
                display: displayAddress,
                full: fullAddress
            };
        }
        const coords = `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
        return { display: coords, full: coords };
    } catch (error) {
        console.error("Reverse geocoding error:", error);
        const coords = `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
        return { display: coords, full: coords };
    }
};
