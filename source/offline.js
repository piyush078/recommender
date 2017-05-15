exports = module.exports = function(){
	return '<div id="footer">' +
                '<div class="offline-but">' +
                    '<img src="https://cdn1.iconfinder.com/data/icons/vibrancie-arrow/30/arrow_033-back-backward-previous-direction-left-256.png" class="left" alt="Left" />' +
                    '<img src="https://cdn1.iconfinder.com/data/icons/vibrancie-arrow/30/arrow_034-next-forward-onward-direction-right-256.png" class="right" alt="Right" />' +
                    '<img src="https://cdn2.iconfinder.com/data/icons/perfect-flat-icons-2/512/Pause_button_play_stop_blue.png" class="pause" alt="Pause" />' +
                    '<img src="http://www.clipartbest.com/cliparts/Mdi/7gq/Mdi7gq5c9.png" class="play" alt="Play" />' +
                '</div>' +
                '<div class="offline-upload">' +
                    '<input type="file" id="selector" multiple="multiple" style="display:none" />' +
                    '<img src="https://cdn2.iconfinder.com/data/icons/perfect-flat-icons-2/256/Create_with_plus_mail_layer_add_vector_stock.png" class="add" alt="Select" />' +
                '</div>' +
                '<div id="timer-bar">' +
                    '<div id="progress-bar"></div>' +
                '</div>' +
            '</div>' +
            '<div id="offline-queue">' +
                '<span class="close-list" style="cursor:pointer; color:#fff; right:5; top:-5; font-size:25px; position:absolute;">&#215</span>' +
                '<div class="queue-top">' +
                    '<div class="offline-name"><&nbsp;No song uploaded&nbsp;></div>' +
                    '<div class="offline-but">' +
                        '<img src="https://cdn1.iconfinder.com/data/icons/vibrancie-arrow/30/arrow_033-back-backward-previous-direction-left-256.png" class="left" alt="Left" />' +
                        '<img src="https://cdn1.iconfinder.com/data/icons/vibrancie-arrow/30/arrow_034-next-forward-onward-direction-right-256.png" class="right" alt="Right" />' +
                        '<img src="https://cdn2.iconfinder.com/data/icons/perfect-flat-icons-2/512/Pause_button_play_stop_blue.png" class="pause" alt="Pause" />' +
                        '<img src="http://www.clipartbest.com/cliparts/Mdi/7gq/Mdi7gq5c9.png" class="play" alt="Play" />' +
                        '<img src="https://cdn2.iconfinder.com/data/icons/perfect-flat-icons-2/256/Create_with_plus_mail_layer_add_vector_stock.png" class="add" alt="Select" />' +
                        '<img src="https://cdn2.iconfinder.com/data/icons/perfect-flat-icons-2/512/Repeat_refresh_arrow_media_control_reload.png" class="repeat" alt="Repeat" />' +
                        '<img src="https://cdn1.iconfinder.com/data/icons/arrows-and-user-interface-1/480/_shuffle-128.png" class="shuffle" alt="Shuffle" />' +
                        '<img src="https://cdn2.iconfinder.com/data/icons/perfect-flat-icons-2/256/Stop_button_play_pause_music.png" class="stop" alt="Stop" />' +
                    '</div>' +
                '</div>' +
                '<div class="show-counter">Shuffle : <span class="shuffle-dis"></span></div>' +
                '<div class="show-counter">Repeat : <span class="repeat-dis"></span></div>' +
                '<div class="queue-header">Songs</div>' +
            '</div>' +
            '<div id="message"></div>';
};