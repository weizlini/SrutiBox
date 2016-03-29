
<?php
/*
Plugin Name: Sruti Box
Plugin URI:  https://github.com/weizlini/SrutiBox
Description: A plugin widget which displays a Sruti Box which plays a drone
Version:     0.1
Author:      Will Eizlini
Author URI:  http://half-lifer.net
License:     GPL2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
*/

class wp_sruti_box extends WP_Widget {

    //public $option_name='';
    // constructor
    function __construct() {
        parent::__construct(
// Base ID of your widget
            'sruti_box_widget',

// Widget name will appear in UI
            __('Sruti Box', 'wpb_widget_domain'),

// Widget description
            array( 'description' => __( 'A simple sruti drone box', 'wpb_widget_domain' ), )
        );
    }

    // widget form creation
    function form($instance) {
        /* ... */
    }

    // widget update
    function update($new_instance, $old_instance) {
        /* ... */
    }

    // widget display
    function widget($args, $instance) {
        $title = apply_filters( 'widget_title', $instance['title'] );
        echo $args['before_widget'];
        if ( ! empty( $title ) )
            echo $args['before_title'] . $title . $args['after_title'];
        ?>

        <link rel="stylesheet" href="<?=plugins_url('sruti-box.min.css',__FILE__)?>">
        <script>
            if(!$)
            {
                document.write('<script type="text/javascript" src="<?=plugins_url('jquery.min.js',__FILE__)?>"><\/script>');
                var jq = document.createElement('script');
                jq.setAttribute('src','<?=plugins_url('jquery.min.js',__FILE__)?>');
                jq.onload=function(){
                    $(window).on('load',function() {
                        sruti.init('/wp-sruti/wp-content/plugins/sruti-box/');
                    });
                }
                document.head.appendChild(jq);
            }else{
                $(window).on('load',function() {
                    sruti.init('/wp-sruti/wp-content/plugins/sruti-box/');
                });
            }
        </script>
        <script type="text/javascript" src="<?=plugins_url('sruti.min.js',__FILE__)?>"></script>
        <script type="text/javascript">

        </script>
        <h4 class="widget-title widgettitle">Sruti Box</h4>
        <?include(plugin_dir_path(__FILE__).'ui.html')?>
        <?
        echo $args['after_widget'];
    }
    public function widget_old( $args, $instance ) {
        $title = apply_filters( 'widget_title', $instance['title'] );
// before and after widget arguments are defined by themes
        echo $args['before_widget'];
        if ( ! empty( $title ) )
            echo $args['before_title'] . $title . $args['after_title'];

// This is where you run the code and display the output
        echo __( 'Hello, World!', 'wpb_widget_domain' );
        echo $args['after_widget'];
    }
}

// register widget
add_action('widgets_init', create_function('', 'return register_widget("wp_sruti_box");'));