import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import { InnerBlocks } from '@wordpress/block-editor';
import { createElement, RawHTML } from '@wordpress/element';

import edit from './edit';
import mdiIcon from "../../scripts/mdiIcon";
import metadata from "./block.json";

registerBlockType('gii-blocks/vuetify-container', {
    icon: mdiIcon(metadata.mdiIcon),
    edit,
    save({ attributes }) {
        const { fluid, width, background } = attributes;

        const containerProps = {
            className: 'vuetify-container',
        };

        if (fluid) {
            containerProps.fluid = 'fluid'; // Required for Vuetify
        }

        if (width === 'narrow') {
            containerProps[':style'] = `$vuetify.breakpoint.smAndDown ? 'padding: 12px' : $vuetify.breakpoint.mdOnly ? 'padding: 12px 7%' : 'padding: 12px 12%'`;
            containerProps.style = 'max-width: calc(1904px + 10%)';
        } else if (width === 'wide') {
            containerProps[':style'] = `$vuetify.breakpoint.smAndDown ? 'padding: 12px' : $vuetify.breakpoint.mdOnly ? 'padding: 12px 12px' : 'padding: 12px 7%'`;
            containerProps.style = 'max-width: calc(1904px + 10%)';
        } else if (width === 'semi') {
            containerProps[':style'] = `$vuetify.breakpoint.smAndDown ? 'padding: 12px' : $vuetify.breakpoint.mdOnly ? 'padding: 12px 12px 12px 7%' : 'padding: 12px 7% 12px 12%'`;
            containerProps.style = 'max-width: calc(1904px + 10%)';
        }

        // Compute background style for outer div
        let outerStyle = '';
        switch (background) {
            case 'dark':
                outerStyle = 'background-color: #161c2a; position: relative;';
                break;
            case 'light':
                outerStyle = 'background-color: #25344f; position: relative;';
                break;
            case 'gradient':
                outerStyle = 'background-image: linear-gradient(to top, #161c2a, transparent); position: relative;';
                break;
            default:
                outerStyle = 'position: relative;';
        }

        return createElement(
            'div',
            outerStyle ? { style: outerStyle } : {},
            createElement('v-container', containerProps,
                createElement(InnerBlocks.Content)
            )
        );
    },
});