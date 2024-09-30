import { Path, SVG } from '@wordpress/components';
import * as mdi from '@mdi/js'; // Import all icons from the MDI library

/**
 * Converts a kebab-case icon name (e.g., 'align-vertical-distribute') to PascalCase
 * and prepends 'mdi' to form the correct MDI icon name (e.g., 'mdiAlignVerticalDistribute').
 *
 * @param {string} kebabName - The kebab-case name from block.json.
 * @returns {string} The PascalCase MDI icon name.
 */
const convertToMdiFormat = (kebabName) => {
    return 'mdi' + kebabName
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
};

/**
 * Utility function to generate an SVG icon
 * @param {string} iconName - The kebab-case icon name from block.json (e.g., 'align-vertical-distribute')
 * @returns {JSX.Element} The SVG icon element
 */
const mdiIcon = (iconName) => {
    const mdiIconName = convertToMdiFormat(iconName); // Convert to MDI format
    const pathData = mdi[mdiIconName]; // Dynamically get the icon path from the MDI library

    if (!pathData) {
        console.error(`Icon "${mdiIconName}" not found in MDI library.`);
        return null; // Return null if the icon doesn't exist
    }

    return (
        <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <Path d={pathData} />
        </SVG>
    );
};

export default mdiIcon;
