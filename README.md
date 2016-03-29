# SrutiBox
An HTML 5 Sruti Box using Web Audio API that can be deployed statically but also as a wordpress plugin.
The sruti box plays and loops real struti box samples record by me. by default the drop down will set the drone for a G drone, but an F and A drone are also available by default. you can create your own as well. simply click on any key to toggle the sound on or off, and hit the Play Button

## build
you'll need to have grunt,npm,bower,and the ruby sass gem installed.
run the following commands from the command line

```
npm update

bower update

grunt build
```

this will load all the dependencies and then build the demo and wp-plugin folder

##audio files

the project currently contains .wav file samples of a sruti box, soon i'll update with mp3s for a lighter load experience

##demo

using your localhost, copy the demo folder to your localhost document root, or create a synmlink and load the index.html file

[click here to see a live demo](http://half-lifer.com/sruti/)  
  
##wordpress plugin

the wp_plugin folder contains the folder sruti-box which you need only copy into your worpress plugin folder. While this folder is automatically created with a `grunt build` or `grunt dev` command, i chose to commit it with the wp_plugin folder as part of the repo, so that it would be easy for non developers to download and use it.

### using the plugin

simply activate the plugin, and then add the 'sruti-box' widget to your sidebar or wherever you want in your wordpress site.





