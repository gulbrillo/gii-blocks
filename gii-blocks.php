<?php
/**
 * Plugin Name:       GII Blocks
 * Description:       A modular WordPress block plugin.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           1.1.0
 * Author:            Your Name
 * Text Domain:       gii-blocks
 * License:           GPL-2.0-or-later
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

define( 'GIIB_DIR_URL', plugin_dir_url(__FILE__) );
define( 'GIIB_CSS_URL', GIIB_DIR_URL . 'assets/css/' );
define( 'GIIB_VERSION', '1.1.0' );


function gii_blocks_2_register_blocks() {
    // Load the compiled JavaScript file.
    $asset_file = include plugin_dir_path( __FILE__ ) . 'build/index.asset.php';

    wp_register_script(
        'gii-blocks-script',
        plugins_url( 'build/index.js', __FILE__ ),
        $asset_file['dependencies'],
        $asset_file['version']
    );

    // Enqueue the CSS file.
    wp_enqueue_style( 'gii-blocks-style', GIIB_CSS_URL . 'style.css', '', GIIB_VERSION );
    wp_enqueue_style( 'gii-blocks-editor-style', GIIB_CSS_URL . 'editor.css', '', GIIB_VERSION );


    // Automatically register all blocks in the 'blocks' directory.
    foreach ( glob( plugin_dir_path( __FILE__ ) . 'blocks/*/block.json' ) as $block_json ) {
        register_block_type_from_metadata( dirname( $block_json ), array(
            'editor_script' => 'gii-blocks-script',
            'editor_style' => 'gii-blocks-editor-style',
            'style'         => 'gii-blocks-style',
        ) );
    }
}
add_action( 'init', 'gii_blocks_2_register_blocks' );

/**
 * Allow <light-field> and its custom attributes through wp_kses_post.
 * Without this, WordPress strips non-standard attributes (fullscreen, wiggle, etc.)
 * when the post content is saved.
 */
add_filter( 'wp_kses_allowed_html', function ( $tags, $context ) {
    if ( $context === 'post' ) {
        $tags['light-field'] = array(
            'src'          => true,
            'low-src'      => true,
            'cols'         => true,
            'rows'         => true,
            'aspect-ratio' => true,
            'crop'         => true,
            'flip-rows'    => true,
            'rounded'      => true,
            'fullscreen'   => true,
            'reverse'      => true,
            'idle'         => true,
            'wiggle'       => true,
        );
    }
    return $tags;
}, 10, 2 );
