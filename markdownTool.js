export function parseItemMarkdown(markdown) {
    const lines = markdown.split('\n').map(line => line.trim()).filter(line => line && line !== '-------------------');
    const item = {};
    
    // Parse header information
    item.class = lines[0].replace('Item Class: ', '');
    item.rarity = lines[1].replace('Rarity: ', '');
    item.prefixName = lines[2];
    item.baseName = lines[3];
    
    // Initialize properties object for stats
    item.properties = {};
    
    let currentSection = 'properties';
    for (let i = 4; i < lines.length; i++) {
        const line = lines[i];
        
        // Skip separator lines
        if (line.startsWith('--------')) {
            continue;
        }
        
        // Handle section headers
        if (line === 'Requirements:') {
            currentSection = 'requirements';
            item.requirements = {};
            continue;
        }
        
        // Parse based on current section
        if (currentSection === 'properties') {
            const match = line.match(/(.*?): (.*?) \((.*?)\)/);
            if (match) {
                item.properties[match[1]] = {
                    value: match[2],
                    type: match[3]
                };
            }
        } else if (currentSection === 'requirements') {
            const [key, value] = line.split(': ');
            item.requirements[key] = value;
        }
        
        // Handle sockets
        if (line.startsWith('Sockets:')) {
            item.sockets = line.replace('Sockets: ', '').split(' ');
        }
        
        // Handle item level
        if (line.startsWith('Item Level:')) {
            item.itemLevel = parseInt(line.replace('Item Level: ', ''));
        }
        
        // Handle implicit and explicit mods
        if (line.includes('(rune)')) {
            if (!item.implicitMods) item.implicitMods = [];
            item.implicitMods.push(line.replace(' (rune)', ''));
        } else if (!line.includes(':') && !line.startsWith('Item Class') && !line.startsWith('Rarity')) {
            if (!item.explicitMods) item.explicitMods = [];
            item.explicitMods.push(line);
        }
    }
    
    return item;
}


export function createTradeQuery(item) {
    const query = {
        query: {
            status: {
                option: "online"
            },
            type: item.baseName,
            stats: [{
                type: "and",
                filters: []
            }]
        },
        sort: {
            price: "asc"
        }
    };

    return JSON.stringify(query);
}
