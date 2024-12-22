export async function searchForItem(page, item) {
    // Wait for search panel to be visible
    await page.waitForSelector('.search-panel');

    // Click the search input to focus it
    await page.click('.multiselect__input');

    // Type the item's base name and wait for dropdown
    await page.type('.multiselect__input', item.baseName);

    const found = await page.evaluate(() => window.find(item.baseName));
    await page.waitForTimeout(1000);
    await page.click(found);

    // // Add stat group for mods if item has explicit mods
    // if (item.explicitMods && item.explicitMods.length > 0) {
    //     // Click "Add Stat Group" button
    //     await page.click('.filter-group-select .multiselect__tags');

    //     // Select "And" group
    //     await page.waitForSelector('.filter-group-select .multiselect__content-wrapper');
    //     await page.click('.filter-group-select .multiselect__option span:contains("And")');

    //     // Add each explicit mod as a stat filter
    //     for (const mod of item.explicitMods) {
    //         await addModFilter(page, mod);
    //     }
    // }

    // Click search button
    // await page.click('.search-btn');
}

export async function addModFilter(page, modText) {
    // Click stat input to open dropdown
    await page.click('.filter-group .multiselect__tags');

    // Type mod text to filter options
    await page.type('.filter-group .multiselect__input', modText);

    // Wait for filtered results
    await page.waitForSelector('.filter-group .multiselect__content-wrapper[style*="display: block"]');

    // Click matching mod option
    await page.evaluate((text) => {
        const elements = Array.from(document.querySelectorAll('.filter-group .multiselect__option span'));
        const element = elements.find(el => el.textContent.includes(text));
        if (element) {
            element.closest('.multiselect__option').click();
        }
    }, modText);
}
