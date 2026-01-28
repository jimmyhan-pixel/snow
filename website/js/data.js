export const providers = [
    {
        id: 1,
        name: "Jake Thompson",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
        badges: ["Verified", "Great with Seniors"],
        rating: 4.9,
        reviews: 127,
        bio: "College student, reliable and respectful with seniors",
        price: 28,
        // Mocking coordinates relative to user for demo purposes
        // In a real app, these would be fixed database coordinates
    },
    {
        id: 2,
        name: "Lisa Martinez",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
        badges: ["Verified", "Great with Seniors"],
        rating: 4.8,
        reviews: 89,
        bio: "Nursing student, caring and great at communicating with seniors",
        price: 32,
    },
    {
        id: 3,
        name: "Mike Johnson",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
        badges: ["Verified", "Great with Seniors"],
        rating: 4.6,
        reviews: 56,
        bio: "Army veteran, strong and efficient, perfect for heavy lifting",
        price: 25,
    },
    {
        id: 4,
        name: "Sarah Wilson",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
        badges: ["Verified", "Punctual"],
        rating: 4.7,
        reviews: 42,
        bio: "Experienced with outdoor maintenance and gardening.",
        price: 30,
    },
    {
        id: 5,
        name: "David Chen",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
        badges: ["Verified", "Strong"],
        rating: 4.5,
        reviews: 31,
        bio: "Dedicated worker, happy to help with any heavy tasks.",
        price: 26,
    }
];

export function renderProviderCard(provider, distance) {
    const stars = '★'.repeat(Math.floor(provider.rating)) + '★'.replace('★', '☆').repeat(5 - Math.floor(provider.rating)); // Simple star logic

    // Better star rendering
    let starHtml = '';
    for (let i = 0; i < 5; i++) {
        starHtml += `<span class="star ${i < Math.floor(provider.rating) ? '' : 'empty'}">★</span>`;
    }

    return `
    <div class="provider-card" onclick="viewProvider(${provider.id})">
        <div class="provider-header">
            <img src="${provider.avatar}" alt="${provider.name}" class="provider-avatar">
            <div class="provider-info">
                <div style="display: flex; justify-content: space-between; align-items: start;">
                    <h3 class="provider-name">${provider.name}</h3>
                    <span style="background: #E8F5E9; color: #2E7D32; padding: 4px 8px; border-radius: 4px; font-size: 14px; font-weight: 600;">
                        ${distance.toFixed(1)} miles
                    </span>
                </div>
                <div class="provider-badge">
                    <svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
                    ${provider.badges.join(' · ')}
                </div>
                <div class="provider-rating">
                    <div class="stars">
                        ${starHtml}
                    </div>
                    <span class="rating-text">${provider.rating}</span>
                    <span class="review-count">(${provider.reviews} reviews)</span>
                </div>
                <p class="provider-bio">${provider.bio}</p>
            </div>
        </div>
        <div class="provider-footer">
            <div class="provider-price">$${provider.price}<span>/hour</span></div>
            <button class="view-btn">View Details →</button>
        </div>
    </div>
    `;
}
