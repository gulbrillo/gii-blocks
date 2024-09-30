import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import { InnerBlocks } from '@wordpress/block-editor'; // Add this line
import edit from './edit';
import mdiIcon from "../../scripts/mdiIcon";
import metadata from "./block.json";

registerBlockType('gii-blocks/vuetify-container', {
    icon: mdiIcon(metadata.mdiIcon),
    edit,
    save({ attributes}) {
        const {
            fluid
        } = attributes;

        const blockProps = useBlockProps.save({
            className: 'vuetify-container',
            fluid: fluid ? 'fluid' : undefined
        });

        return (
            <v-container {...blockProps}>
                <InnerBlocks.Content />
            </v-container>
        );
    },
});
