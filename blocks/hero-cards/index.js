import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor'; // Add this line
import edit from './edit';
import mdiIcon from "../../scripts/mdiIcon";
import metadata from "./block.json";

registerBlockType('gii-blocks/hero-cards', {
    icon: mdiIcon(metadata.mdiIcon),
    edit,
    save() {
        return (
            <v-row className="hero-cards">
                <InnerBlocks.Content />
            </v-row>
        );
    },
});