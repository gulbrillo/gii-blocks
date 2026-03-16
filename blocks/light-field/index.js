import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import edit from './edit';

registerBlockType('gii-blocks/light-field', {
    edit,
    save({ attributes }) {
        const {
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

        const blockProps = useBlockProps.save({ className: 'light-field' });

        return (
            <div {...blockProps}>
                <light-field
                    src={src}
                    low-src={lowSrc || undefined}
                    cols={cols}
                    rows={rows}
                    aspect-ratio={aspectRatio}
                    crop={crop ? "" : undefined}
                    flip-rows={flipRows ? "" : undefined}
                    rounded={rounded || undefined}
                    fullscreen={fullscreen ? "" : undefined}
                    reverse={reverse ? "" : undefined}
                    idle={idle ? "" : undefined}
                    wiggle={wiggle ? "" : undefined}
                    boost={boost ? "" : undefined}
                />
            </div>
        );
    },
});
