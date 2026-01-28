// Replace this with your actual API Key
const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';

export function loadGoogleMapsScript(callback) {
    if (window.google && window.google.maps) {
        callback();
        return;
    }

    // Check if script is already added
    if (document.getElementById('google-maps-script')) {
        return; // Wait for it to load
    }

    const script = document.createElement('script');
    script.id = 'google-maps-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places,geometry&callback=initGoogleMaps`;
    script.async = true;
    script.defer = true;

    window.initGoogleMaps = () => {
        if (callback) callback();
    };

    document.head.appendChild(script);
}

// Helper to check validity
export function isConfigured() {
    return GOOGLE_MAPS_API_KEY && GOOGLE_MAPS_API_KEY !== 'YOUR_GOOGLE_MAPS_API_KEY';
}

export async function getCoordinates(address) {
    if (!isConfigured()) {
        return Promise.reject("API Key not configured");
    }

    return new Promise((resolve, reject) => {
        // Validation with timeout
        if (!window.google || !window.google.maps) {
            reject("Google Maps API not loaded");
            return;
        }

        // Set timeout to prevent hanging forever
        const timeoutId = setTimeout(() => {
            reject("Geocoding timed out");
        }, 5000);

        try {
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ address: address }, (results, status) => {
                clearTimeout(timeoutId);
                if (status === 'OK') {
                    const location = results[0].geometry.location;
                    resolve({
                        lat: location.lat(),
                        lng: location.lng(),
                        formattedAddress: results[0].formatted_address
                    });
                } else {
                    reject("Geocode was not successful for the following reason: " + status);
                }
            });
        } catch (e) {
            clearTimeout(timeoutId);
            reject(e);
        }
    });
}

// Helper to calculate distance in miles
export function calculateDistance(p1, p2) {
    // p1 and p2 are {lat: number, lng: number}
    if (!window.google || !window.google.maps) return 0;

    const point1 = new google.maps.LatLng(p1.lat, p1.lng);
    const point2 = new google.maps.LatLng(p2.lat, p2.lng);

    const distanceInMeters = google.maps.geometry.spherical.computeDistanceBetween(point1, point2);
    return distanceInMeters * 0.000621371; // Convert meters to miles
}

// Helper to generate a random location within radius (miles) of a center point
// Useful for creating mock provider data near the user
export function generateRandomLocation(center, maxRadiusMiles) {
    const r = maxRadiusMiles * 1609.34; // Convert miles to meters
    const randomR = Math.sqrt(Math.random()) * r; // Uniform distribution
    const theta = Math.random() * 2 * Math.PI;

    const dy = randomR * Math.sin(theta);
    const dx = randomR * Math.cos(theta);

    // Rough conversion to lat/lng degrees (approximate)
    const lat = center.lat + (dy / 111320);
    const lng = center.lng + (dx / (111320 * Math.cos(center.lat * Math.PI / 180)));

    return { lat, lng };
}
