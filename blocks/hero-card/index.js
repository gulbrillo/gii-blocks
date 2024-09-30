import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import edit from './edit';

registerBlockType('gii-blocks/hero-card', {
    edit,
    save({ attributes }) {
        const {
            title = '',
            subtitle = '',
            linkName = '',
            linkTarget,
            linkTargetNewTab,
            backgroundImage,
            backgroundVideo,
            cardHeight,
        } = attributes;

        const blockProps = useBlockProps.save({
            className: 'hero-card',
        });

        const cardProps = useBlockProps.save({
            className: 'hero-vuetify-card elevation-0',
            tile: 'tile',
            dark: 'dark',
            to: linkTarget || '#',
        });

        const backgroundProps = useBlockProps.save({
            className: 'hero-background',
            style: backgroundImage
                ? { backgroundImage: `url(${backgroundImage})` }
                : undefined,
        });

        return (
            <v-col {...blockProps}>
                {backgroundVideo && (
                    <video
                        className="hero-card-background-video"
                        autoPlay
                        loop
                        muted
                        playsInline
                    >
                        <source src={backgroundVideo} type="video/mp4" />
                    </video>
                )}
                <v-card {...cardProps}>
                    <v-div {...backgroundProps}></v-div>
                    <v-div className="hero-blur"></v-div>
                    <v-div className="hero-gradient"></v-div>
                <v-card-text
                    className="hero-card-content text-center d-flex flex-column align-center justify-end px-0"
                    style={{ height: cardHeight }}
                >
                    {title && (
                        <RichText.Content
                            tagName="v-card-title"
                            className="hero-card-title white--text truncate-2 mb-7"
                            value={title}
                        />
                    )}
                    {subtitle && (
                        <RichText.Content
                            tagName="v-card-subtitle"
                            className="hero-card-subtitle white--text mb-0 truncate-3 mx-a"
                            value={subtitle}
                        />
                    )}
                    {linkName && (
                        <v-btn
                            href={linkTarget || '#'}
                            className="hero-card-link elevation-0 mb-2"
                            target={linkTargetNewTab ? '_blank' : undefined}
                            rel={linkTargetNewTab ? 'noopener noreferrer' : undefined}
                            color="#e53838"
                        >
                            <RichText.Content
                                tagName="span"
                                className="hero-card-link-name"
                                value={linkName}
                            />
                        </v-btn>
                    )}
                </v-card-text>
                </v-card>
            </v-col>
        );
    },
});
