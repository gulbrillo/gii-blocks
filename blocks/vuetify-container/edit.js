import { __ } from '@wordpress/i18n';
import {
    InnerBlocks,
    InspectorControls,
    BlockControls,
    useBlockProps,
} from '@wordpress/block-editor';
import {
    PanelBody,
    Placeholder,
    ToggleControl,
    SelectControl
} from '@wordpress/components';

import mdiIcon from "../../scripts/mdiIcon";
import metadata from './block.json';  // Import block.json

const ALLOWED_BLOCKS = ['core/paragraph', 'core/html', 'gii-blocks/hero-cards'];

const Edit = ({ attributes, setAttributes }) => {
    const { fluid } = attributes;

    const blockProps = useBlockProps({
        className: 'edit-vuetify-container',
        style: { width: '100%', display: 'flex', flexDirection: 'column' }, // Full width, vertical stacking
    });

    const innerBlocksProps = {
        style: { width: '100%' }, // Ensure inner blocks take full width
    };

    return (
        <>
            {/* Inspector Controls */}
            <InspectorControls>
                <PanelBody title={__('Container Settings', 'gii-blocks')}>
                    <ToggleControl
                        label={__('Fluid', 'gii-blocks')}
                        checked={fluid}
                        onChange={(value) => setAttributes({ fluid: value })}
                        help={__('Removes viewport maximum-width size breakpoints.', 'gii-blocks')}
                    />
                    <SelectControl
                        label={__('Width', 'gii-blocks')}
                        value={attributes.width}
                        options={[
                            { label: __('Full', 'gii-blocks'), value: 'full' },
                            { label: __('Wide', 'gii-blocks'), value: 'wide' },
                            { label: __('Semi', 'gii-blocks'), value: 'semi' },
                            { label: __('Narrow', 'gii-blocks'), value: 'narrow' },
                        ]}
                        onChange={(value) => setAttributes({ width: value })}
                        help={__('Sets the internal padding and container width.', 'gii-blocks')}
                    />
                    <SelectControl
                        label={__('Background', 'gii-blocks')}
                        value={attributes.background}
                        options={[
                            { label: __('Transparent', 'gii-blocks'), value: 'transparent' },
                            { label: __('Dark', 'gii-blocks'), value: 'dark' },
                            { label: __('Gradient', 'gii-blocks'), value: 'gradient' },
                            { label: __('Light', 'gii-blocks'), value: 'light' },
                        ]}
                        onChange={(value) => setAttributes({ background: value })}
                        help={__('Sets the background of the container.', 'gii-blocks')}
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
                            templateLock={false} // Allow free arrangement
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
