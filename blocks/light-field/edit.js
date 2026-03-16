import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    MediaUpload,
    MediaUploadCheck,
    InspectorControls,
} from '@wordpress/block-editor';
import {
    PanelBody,
    RangeControl,
    ToggleControl,
    TextControl,
    Button,
    Placeholder,
} from '@wordpress/components';

const Edit = ({ attributes, setAttributes }) => {
    const {
        mediaId,
        src,
        lowSrc,
        cols,
        rows,
        aspectRatio,
        crop,
        flipRows,
        rounded,
        fullscreen,
        reverse,
        idle,
        wiggle,
        boost,
    } = attributes;

    const blockProps = useBlockProps({ className: 'edit-light-field' });

    const onSelectMedia = (media) => {
        setAttributes({
            mediaId: media.id,
            src: (media.sizes?.full?.url || media.url).replace(/-scaled(\.[^.]+)$/, '$1'),
            lowSrc: media.sizes?.small?.url || media.sizes?.thumbnail?.url || '',
        });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Image', 'gii-blocks')}>
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={onSelectMedia}
                            allowedTypes={['image']}
                            value={mediaId}
                            render={({ open }) => (
                                <Button onClick={open} variant="secondary" isSecondary>
                                    {src
                                        ? __('Change Image', 'gii-blocks')
                                        : __('Select Image', 'gii-blocks')}
                                </Button>
                            )}
                        />
                    </MediaUploadCheck>
                    {src && (
                        <Button
                            onClick={() => setAttributes({ src: '', lowSrc: '', mediaId: undefined })}
                            variant="link"
                            isDestructive
                        >
                            {__('Remove Image', 'gii-blocks')}
                        </Button>
                    )}
                </PanelBody>

                <PanelBody title={__('Grid', 'gii-blocks')} initialOpen={false}>
                    <RangeControl
                        label={__('Columns', 'gii-blocks')}
                        value={cols}
                        onChange={(value) => setAttributes({ cols: value })}
                        min={1}
                        max={32}
                    />
                    <RangeControl
                        label={__('Rows', 'gii-blocks')}
                        value={rows}
                        onChange={(value) => setAttributes({ rows: value })}
                        min={1}
                        max={32}
                    />
                    <ToggleControl
                        label={__('Flip Rows', 'gii-blocks')}
                        help={__('Invert the image order per row.', 'gii-blocks')}
                        checked={flipRows}
                        onChange={(value) => setAttributes({ flipRows: value })}
                    />
                </PanelBody>

                <PanelBody title={__('Appearance', 'gii-blocks')} initialOpen={false}>
                    <TextControl
                        label={__('Aspect Ratio', 'gii-blocks')}
                        help={__('Width ÷ height, e.g. 1.778 for 16:9.', 'gii-blocks')}
                        type="number"
                        step="0.001"
                        value={aspectRatio}
                        onChange={(value) =>
                            setAttributes({ aspectRatio: parseFloat(value) || aspectRatio })
                        }
                    />
                    <ToggleControl
                        label={__('Crop', 'gii-blocks')}
                        help={__('Crop to aspect ratio (cover behaviour, like v-img).', 'gii-blocks')}
                        checked={crop}
                        onChange={(value) => setAttributes({ crop: value })}
                    />
                    <TextControl
                        label={__('Rounded', 'gii-blocks')}
                        help={__('Corner radius — number (px) or string e.g. "lg".', 'gii-blocks')}
                        value={rounded}
                        onChange={(value) => setAttributes({ rounded: value })}
                    />
                    <ToggleControl
                        label={__('Boost Image', 'gii-blocks')}
                        help={__('Boost saturation, brightness and contrast.', 'gii-blocks')}
                        checked={boost}
                        onChange={(value) => setAttributes({ boost: value })}
                    />
                </PanelBody>

                <PanelBody title={__('Behaviour', 'gii-blocks')} initialOpen={false}>
                    <ToggleControl
                        label={__('Fullscreen', 'gii-blocks')}
                        help={__('Click to enlarge in a dialog.', 'gii-blocks')}
                        checked={fullscreen}
                        onChange={(value) => setAttributes({ fullscreen: value })}
                    />
                    <ToggleControl
                        label={__('Reverse', 'gii-blocks')}
                        help={__('Reverse scroll direction on mouse move.', 'gii-blocks')}
                        checked={reverse}
                        onChange={(value) => setAttributes({ reverse: value })}
                    />
                    <ToggleControl
                        label={__('Idle Animation', 'gii-blocks')}
                        help={__('Animate when the mouse is not hovering.', 'gii-blocks')}
                        checked={idle}
                        onChange={(value) => setAttributes({ idle: value })}
                    />
                    <ToggleControl
                        label={__('Wiggle', 'gii-blocks')}
                        help={__('Brief wiggle indicator showing this is an image sequence.', 'gii-blocks')}
                        checked={wiggle}
                        onChange={(value) => setAttributes({ wiggle: value })}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                {src ? (
                    <div className="edit-light-field-preview">
                        <img src={src} alt="" />
                        <div className="edit-light-field-badge">
                            {`${cols} × ${rows}`}
                        </div>
                    </div>
                ) : (
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={onSelectMedia}
                            allowedTypes={['image']}
                            value={mediaId}
                            render={({ open }) => (
                                <Placeholder
                                    icon="format-gallery"
                                    label={__('GII Light Field', 'gii-blocks')}
                                    instructions={__(
                                        'Select a light field splat image from the media library.',
                                        'gii-blocks'
                                    )}
                                >
                                    <Button onClick={open} variant="primary" isPrimary>
                                        {__('Select Image', 'gii-blocks')}
                                    </Button>
                                </Placeholder>
                            )}
                        />
                    </MediaUploadCheck>
                )}
            </div>
        </>
    );
};

export default Edit;
