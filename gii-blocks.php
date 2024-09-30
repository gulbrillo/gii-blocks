<?php
/**
 * Plugin Name:       GII Blocks
 * Description:       A modular WordPress block plugin.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           1.0.0
 * Author:            Your Name
 * Text Domain:       gii-blocks
 * License:           GPL-2.0-or-later
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

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
    wp_register_style(
        'gii-blocks-style',
        plugins_url( 'assets/css/style.css', __FILE__ ),
        array(),
        filemtime( plugin_dir_path( __FILE__ ) . 'assets/css/style.css' )
    );

    wp_register_style(
        'gii-blocks-editor-style',
        plugins_url( 'assets/css/editor.css', __FILE__ ),
        array(),
        filemtime( plugin_dir_path( __FILE__ ) . 'assets/css/editor.css' )
    );

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
