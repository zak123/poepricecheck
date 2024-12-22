export async function searchPOE2Trade(searchPayload) {
    try {
        const response = await fetch('https://www.pathofexile.com/api/trade2/search/poe2/Standard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'https://www.pathofexile.com',
            },
            body: JSON.stringify(searchPayload),
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${JSON.stringify(response.status)}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error searching POE2 trade:', error);
        throw error;
    }
}