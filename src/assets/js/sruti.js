
//var audiocontext = new webkitAudioContext();
var sruti = {
  samples:[
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
  AudioContext:null,
  source:[],
  init:function(){
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
     
     this.AudioContext = new window.AudioContext();
     this.loadSamples();
     //this.test();
     
  },
  initUI:function(){
    $('.sruti-box').show();
    $( ".note-picker" ).slider({
      value:0,
      min: 0,
      max: 12,
      step: 1,
      slide: function( event, ui ) {
        sruti.tampuraKey = ui.value;
        if(sruti.playing)
        {
        sruti.stop();
        sruti.play();
        }
      }
    });
    $( ".tempo-slider" ).slider({
      value:54,
      min: 40,
      max: 90,
      step: 1,
      slide: function( event, ui ) {
        sruti.tempo = ui.value;
        if(sruti.playing)
        {
        sruti.stop();
        sruti.play();
        }
      }
    });
    $('label').click(function(){
        if(this.source)
        {
            this.source.stop();
            this.source = null;
            return;
        }
        this.source = sruti.AudioContext.createBufferSource();
        this.source.buffer = sruti.source[this.id-1].buffer;
        this.source.connect(sruti.AudioContext.destination);
        this.source.loop=true;
        this.source.start();
    })
    $( ".start" ).click(function(){
      //sruti.stop();
      if(!$(this).hasClass('on')){
        if(!sruti.playing)
        {
          sruti.play();
        }
        $(this).addClass('on');
        $(this).html('stop');
      }else{
        sruti.stop();
        $('.start').removeClass('on');
        $(this).html('play');
      }
      
      
    });
    
  },
  debug:true,
  log:function(text){
    if(this.debug)
    {
        console.log('-----------------------------------');
        console.dir(text);
    }
  },
  _loadedSamples:0,
  loadSample:function(path,source){
        sruti.log('about to load '+path);
    var request = new XMLHttpRequest();
        request.open('GET', 'audio/'+path, true);
        request.responseType = "arraybuffer";
        request.onload = function() {
                
                sruti.log(path+' loaded');
                sruti.AudioContext.decodeAudioData(request.response, function(buffer) {
                
                
                source.buffer = buffer;
                source.connect(sruti.AudioContext.destination);
                source.loop=true;                      //start(0) should play asap.
                //source.start(0);
                sruti._loadedSamples++;
                if(sruti._loadedSamples == sruti.samples.length)
                {
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
  loadSamples:function(){
      var toLoad = sruti.samples.length;
      this.samples.forEach(function(val,index){
        
        sruti.log('loading '+val);
        sruti.source[index] = sruti.AudioContext.createBufferSource();
        sruti.loadSample(val,sruti.source[index]);
     
      });
  },
  _onSamplesLoad:function(){
    //alert('samples loaded');
    this.selectKey(0);
    this.initUI();
    //this.play();
  },
  tampuraKey:0,
  tampuraDrone:[],
  selectKey:function(note)
  {
      
      if(note>11)
        note =0;
       if(note<0)
        note =0;
        this.tampuraKey = note;
        
  },
  tempo:54,
  loopTimeout:null,
  playing:false,
  play:function(){
    //var length = 60/this.tempo;
    //var startTime = context.currentTime+1;
        this.playing = true;
        var tampuraDrone = [];
        tampuraDrone[0] = sruti.AudioContext.createBufferSource();
        tampuraDrone[0].buffer = this.source[this.tampuraKey+7].buffer;
        tampuraDrone[0].connect(sruti.AudioContext.destination);
        tampuraDrone[1] = sruti.AudioContext.createBufferSource();
        tampuraDrone[1].buffer = this.source[this.tampuraKey+12].buffer;
        tampuraDrone[1].connect(sruti.AudioContext.destination);
        tampuraDrone[2] = sruti.AudioContext.createBufferSource();
        tampuraDrone[2].buffer = this.source[this.tampuraKey+12].buffer;
        tampuraDrone[2].connect(sruti.AudioContext.destination);
        tampuraDrone[3] = sruti.AudioContext.createBufferSource();
        tampuraDrone[3].buffer = this.source[this.tampuraKey].buffer;
        tampuraDrone[3].connect(sruti.AudioContext.destination);
        this.tampuraDrone = tampuraDrone;
        var start =sruti.AudioContext.currentTime;
        
        
        tampuraDrone[0].start(start+60/sruti.tempo*0);
        tampuraDrone[1].start(start+60/sruti.tempo*2);
        tampuraDrone[2].start(start+60/sruti.tempo*3);
        tampuraDrone[3].start(start+60/sruti.tempo*4);
        sruti.loopTimeout = setTimeout(function(){sruti.play();},60/sruti.tempo*6*1000);
    
  },
  stop:function(){
    this.playing = false;
    clearTimeout(sruti.loopTimeout);
        this.tampuraDrone[0].stop();
        this.tampuraDrone[1].stop();
        this.tampuraDrone[2].stop();
        this.tampuraDrone[3].stop();
  }
};
$(function(){
  sruti.init();
});
