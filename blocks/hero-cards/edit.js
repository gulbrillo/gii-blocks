import { __ } from '@wordpress/i18n';
import {
    InnerBlocks,
    InspectorControls,
    BlockControls,
    useBlockProps,
} from '@wordpress/block-editor';
import { PanelBody, TextControl, ToolbarButton, Placeholder } from '@wordpress/components';

import mdiIcon from "../../scripts/mdiIcon";
import metadata from './block.json';  // Import block.json

const ALLOWED_BLOCKS = ['gii-blocks/hero-card'];

const Edit = ({ attributes, setAttributes }) => {
    const { cardHeight, alignment } = attributes;

    const blockProps = useBlockProps({
        className: 'edit-hero-cards',
    });

    const innerBlocksProps = {
        style: { width: '100%' }, // Ensure inner blocks take full width
    };


    return (
        <>
            {/* Inspector Controls */}
            <InspectorControls>
                <PanelBody title={__('Card Settings', 'gii-blocks')}>
                    <TextControl
                        label={__('Card Height (e.g., 300px or 50%)', 'gii-blocks')}
                        value={cardHeight}
                        onChange={(value) => setAttributes({ cardHeight: value })}
                        help={__('Set the height for the hero cards.', 'gii-blocks')}
                    />
                </PanelBody>
            </InspectorControls>

            {/* Block Controls */}
            <BlockControls>
            </BlockControls>

            {/* Block Content */}
            <div {...blockProps}>
                <Placeholder
                    icon={mdiIcon(metadata.mdiIcon)}
                    label={metadata.title}
                    instructions={metadata.description}
                    style={{ width: '100%', maxWidth: '100%' }}  // Ensure Placeholder takes full width
                >
                    <div style={{ width: '100%' }}> {/* Wrapper div to ensure 100% width */}
                        <InnerBlocks
                            {...innerBlocksProps}
                            allowedBlocks={ALLOWED_BLOCKS}
                            orientation="vertical" // Ensures vertical stacking
                            renderAppender={() => <InnerBlocks.ButtonBlockAppender />}
                        />
                    </div>
                </Placeholder>
            </div>
        </>
    );
};

export default Edit;
