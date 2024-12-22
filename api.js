export async function searchPOE2Trade(searchPayload) {
    try {
        const response = await fetch('https://www.pathofexile.com/api/trade2/search/poe2/Standard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'https://www.pathofexile.com',
                'Cookie': 'POESESSID=d35e7756e8c6436615ef108f60b34772; cf_clearance=vRw8Fm.zmy5PEVLSeShOOdABnVoVb9vQiW56AFTRakY-1734822872-1.2.1.1-KBEfbE6iiS1C2s4vMRMir16NgkW8BmR4geM5jmpOL0azquJMGTLX.YjMr4Qj1twi_g3L0clxaUhnCglTnq.QHmIwYRddE9eqV0humfrtzOoUgzmpuIrcEoeaqB9Akld5v4nsRp0RsLGUgPmtHz0MxkfHKe.f.HXs3513PStJp_tzSa2ADKs2ptvjNOzvpJHQEmEjkoGm6P5vcLBWY_aAXUSG9NrtTZWPt8eivLAeXmnxrmwqGU4YBnFyLg4xzWQXCc28cQ5s8hpks8GyBZf6pZMeOTVbnhNKUpgNrDjqUbWV7NxrLiYHWwwRWJU._aAlS_u23O_t2pgP50hCYKBWEtJXsnywalmMr9nWbdfq3xdE3BB4WvLpAQ7SwmraYh2LCZB10iEr1.bHGBaC4VDgDZegWHYsKNfS7ms.gqX07ti63Stj_GcrD.QyoNN9y_cX'
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