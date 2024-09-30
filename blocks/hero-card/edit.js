import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    RichText,
    MediaUpload,
    MediaUploadCheck,
    InspectorControls,
    URLInput,
} from '@wordpress/block-editor';
import {
    PanelBody,
    TextControl,
    ToggleControl,
    Button,
} from '@wordpress/components';
import { useEffect } from '@wordpress/element';

const Edit = (props) => {
    const { attributes, setAttributes, context = {} } = props;
    const {
        title,
        subtitle,
        linkName,
        linkTarget,
        linkTargetNewTab,
        backgroundImage,
        backgroundVideo,
    } = attributes;

    const blockProps = useBlockProps({
        className: 'edit-hero-card',
        style: {
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        },
    });

    useEffect(() => {
        // Set the cardHeight attribute based on the context value
        setAttributes({
            cardHeight: context['gii-blocks/cardHeight'] || '300px',
        });
    }, [context, setAttributes]); // Dependencies: context and setAttributes


    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Background Settings', 'gii-blocks')}>
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={(media) => {
                                const imageUrl = media.sizes?.large?.url || media.url;
                                setAttributes({ backgroundImage: imageUrl, backgroundVideo: '' });
                            }}
                            allowedTypes={['image']}
                            value={backgroundImage}
                            render={({ open }) => (
                                <Button onClick={open} variant="secondary" isSecondary>
                                    {backgroundImage
                                        ? __('Change Background Image', 'gii-blocks')
                                        : __('Select Background Image', 'gii-blocks')}
                                </Button>
                            )}
                        />
                    </MediaUploadCheck>
                    {backgroundImage && (
                        <Button
                            onClick={() => setAttributes({ backgroundImage: '' })}
                            variant="link"
                            isDestructive
                        >
                            {__('Remove Background Image', 'gii-blocks')}
                        </Button>
                    )}
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={(media) =>
                                setAttributes({ backgroundVideo: media.url, backgroundImage: '' })
                            }
                            allowedTypes={['video']}
                            value={backgroundVideo}
                            render={({ open }) => (
                                <Button onClick={open} variant="secondary" isSecondary>
                                    {backgroundVideo
                                        ? __('Change Background Video', 'gii-blocks')
                                        : __('Select Background Video', 'gii-blocks')}
                                </Button>
                            )}
                        />
                    </MediaUploadCheck>
                    {backgroundVideo && (
                        <Button
                            onClick={() => setAttributes({ backgroundVideo: '' })}
                            variant="link"
                            isDestructive
                        >
                            {__('Remove Background Video', 'gii-blocks')}
                        </Button>
                    )}
                </PanelBody>
                <PanelBody title={__('Link Settings', 'gii-blocks')}>
                    <TextControl
                        label={__('Link Name', 'gii-blocks')}
                        value={linkName}
                        onChange={(value) => setAttributes({ linkName: value })}
                    />
                    <URLInput
                        label={__('Link URL', 'gii-blocks')}
                        value={linkTarget}
                        onChange={(url) => setAttributes({ linkTarget: url })}
                    />
                    <ToggleControl
                        label={__('Open in new tab', 'gii-blocks')}
                        checked={linkTargetNewTab}
                        onChange={(value) => setAttributes({ linkTargetNewTab: value })}
                    />
                    {linkTarget && (
                        <Button
                            onClick={() => setAttributes({ linkTarget: '' })}
                            variant="secondary"
                            isDestructive
                        >
                            {__('Remove Link', 'gii-blocks')}
                        </Button>
                    )}
                </PanelBody>
            </InspectorControls>
            <div {...blockProps}>
                <div className="edit-hero-card-content">
                    <div
                        className="edit-hero-card-column-1"
                        style={{ backgroundImage: 'url(\'https://via.placeholder.com/300\')' }}>
                    </div>
                    <div className="edit-hero-card-column-2">
                        <RichText
                            tagName="h2"
                            className="edit-hero-card-title"
                            placeholder={__('Add Title...', 'gii-blocks')}
                            value={title}
                            onChange={(value) => setAttributes({ title: value })}
                        />
                        <RichText
                            tagName="p"
                            className="edit-hero-card-subtitle"
                            placeholder={__('Add Subtitle...', 'gii-blocks')}
                            value={subtitle}
                            onChange={(value) => setAttributes({ subtitle: value })}
                        />
                        <RichText
                            tagName="span"
                            className="edit-hero-card-link-name"
                            placeholder={__('Link Name', 'gii-blocks')}
                            value={linkName}
                            onChange={(value) => setAttributes({ linkName: value })}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Edit;
