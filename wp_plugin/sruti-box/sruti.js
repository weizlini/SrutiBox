//var audiocontext = new webkitAudioContext();
var sruti = {
    samples: [
        '01_c1.wav',
        '02_c1-sharp.wav',
        '03_d1.wav',
        '04_d1-sharp.wav',
        '05_e1.wav',
        '06_f1.wav',
        '07_f1-sharp.wav',
        '08_g1.wav',
        '09_g1-sh.wav',
        '10_a1.wav',
        '11_a1-sharp.wav',
        '12_b1.wav',
        '13_c2.wav'
    ],
    baseUrl:'',
    AudioContext: null,
    source: [],
    init: function (baseUrl) {

        if(baseUrl)
            this.baseUrl=baseUrl;
        else
            this.baseUrl='';

        window.AudioContext = window.AudioContext || window.webkitAudioContext;

        this.AudioContext = new window.AudioContext();
        this.gainNode = this.AudioContext.createGain();
        this.gainNode.connect(this.AudioContext.destination);
        this.loadSamples();
        //this.test();


    },
    notesPlaying: [],
    clearNotes: function () {
        var _this = this;
        $.each(this.notesPlaying, function (inx, l) {
            _this.log('the label');
            _this.log(l);
            if (_this.playing) {
                l.source.stop();
                l.source = null;
            }
        });
        this.notesPlaying = [];
    },
    removeNote: function (label) {
        var splIndx;
        var _this = this;
        $.each(this.notesPlaying, function (inx, l) {
            _this.log(l)
            _this.log(inx)
            if (l == label) {
                _this.log('found');
                if (_this.playing) {
                    l.source.stop();
                    l.source = null;
                }
                splIndx = inx;
            }
        });
        if (splIndx || splIndx === 0)
            _this.notesPlaying.splice(splIndx, 1);
        _this.log('splice-index:' + splIndx);
        _this.log(this.notesPlaying);
    },
    addNote: function (label) {
        $.each(this.notesPlaying, function (inx, l) {
            if (l == label) {
                return;
            }
        });
        if (this.playing) {
            label.source = sruti.AudioContext.createBufferSource();
            label.source.buffer = sruti.source[$(label).data('id') - 1].buffer;
            label.source.connect(this.gainNode);
            label.source.loop = true;
            label.source.start();
        }
        this.notesPlaying.push(label);
        this.log(this.notesPlaying);

    },
    initUI: function () {
        var _this = this;
        $('.sruti-box').show();
        $('.loading').hide();
        $(window).on('resize',function(){
            $('.sruti_keyboard').width($('.sruti-box').width()>240?240:$('.sruti-box').width());
        })
        $(window).trigger('resize');

        $('.sruti-box label').click(function (e) {

            e.stopPropagation();
            if ($(this).hasClass('on')) {
                sruti.removeNote(this);
                $(this).removeClass('on');
            }
            else {
                sruti.addNote(this);
                $(this).addClass('on');
            }


        })
        $(".start").click(function () {
            //sruti.stop();
            if (!$(this).hasClass('on')) {
                if (!sruti.playing) {
                    sruti.play();
                }
                $(this).addClass('on');
                $(this).html('stop');
            } else {
                sruti.stop();
                $('.start').removeClass('on');
                $(this).html('play');
            }


        });
        $('#drone-picker').on('change', function () {
            var value = $(this).val();
            var wasplaying = _this.playing;
            //alert(wasplaying)
            _this.stop();
            _this.clearNotes();

            $('.sruti-box label').removeClass('on');
            var noteIds = eval(
                $('#drone-picker option[value=' + value + ']').data('notes')
            );
            //alert(JSON.stringify(noteIds));
            $(noteIds).each(function (inx, noteId) {
                label = $('#' + noteId);
                _this.log(label);
                label.trigger('click');
            })
            setTimeout(function(){

                if(wasplaying)
                    _this.play();
            },0)


        })
        $('#drone-picker').trigger('change');
    },
    debug: true,
    log: function (text) {
        if (this.debug) {
            console.log('-----------------------------------');
            console.dir(text);
            console.trace();
        }
    },
    _loadedSamples: 0,
    loadSample: function (path, source) {
        sruti.log('about to load ' + path);
        var request = new XMLHttpRequest();
        request.open('GET', this.baseUrl+'audio/' + path, true);
        request.responseType = "arraybuffer";
        request.onload = function () {

            sruti.log(path + ' loaded');
            sruti.AudioContext.decodeAudioData(request.response, function (buffer) {


                source.buffer = buffer;
                source.connect(sruti.AudioContext.destination);
                source.loop = true;                      //start(0) should play asap.
                //source.start(0);
                sruti._loadedSamples++;
                if (sruti._loadedSamples == sruti.samples.length) {
                    sruti._onSamplesLoad();
                }
            });
        };
        request.onerror = function (e) {
            console.error(request.statusText);
        };


        request.send();
        sruti.log('request sent');
    },
    loadSamples: function () {
        var toLoad = sruti.samples.length;
        this.samples.forEach(function (val, index) {

            sruti.log('loading ' + val);
            sruti.source[index] = sruti.AudioContext.createBufferSource();
            sruti.loadSample(val, sruti.source[index]);

        });
    },
    _onSamplesLoad: function () {
        //alert('samples loaded');

        this.initUI();
        //this.play();
    },

    tempo: 54,
    loopTimeout: null,
    playing: false,
    activeSources: [],
    play: function () {
        this.log('play called');
        if (this.playing)
            return;

        var _this = this;
        this.log(this.notesPlaying);

        this.gainNode.gain.value = 0;
        $.each(this.notesPlaying, function (indx, label) {
            _this.log('label:');
            _this.log(label);
            _this.log('index');
            _this.log(indx);
            if (label.source) {
                label.source.stop();
                label.source = null;
            }
            label.source = sruti.AudioContext.createBufferSource();
            label.source.buffer = sruti.source[$(label).data('id') - 1].buffer;
            label.source.connect(sruti.gainNode);
            label.source.loop = true;
            label.source.start();
        });
        //this.gainNode.gain.linearRampToValueAtTime(1.0, this.AudioContext.currentTime + 2);
        var current=0;

        var gainchange = function(){
            if(current>=1)
            {
                _this.gainNode.gain.value=1;
                _this.playing = true;
            }
            else{
                current+=0.05;
                _this.gainNode.gain.value=current;
                setTimeout(gainchange,50);
            }
        }
        setTimeout(gainchange,0)


    },
    stop: function () {

                $.each(this.notesPlaying, function (inx, label) {
                    if (label.source) {
                        label.source.stop();
                        label.source = null;
                    }
                })
                this.playing = false;


    }
};

