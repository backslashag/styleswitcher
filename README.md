# styleswitcher
## Purpose
styleswitcher is a small jQuery based library for switching stylesheets.

## Examples
```
<script type="text/javascript" src="styleswitcher.min.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	var styleswitch_config = {
		displaychooser: true,
		chooserelement: '#styleswitcher',
		cssfiles : ['/css/smaller.css','/css/normal.css','/css/bigger.css'],
		titleprefix : 'fontsize',
		enableiframe : false
	};
	var stsw = bs_styleswitch.init(styleswitch_config);
	stsw.onload();
});
</script>
```


## Configuration
| param |	default |	description |
|----- | ------- | --------- |
| displaychooser |	false |	Should we make the chooser element visible? In general, it's a good practive to hide the styleswitcher by default with css and enable it with JavaScript because it doesn't work without JavaScript beeing enabled |
| chooserelement |	#styleswitcher | Element-selector for the html-part which contains the list of styleswitcher options |
| cssfiles |	 |	Array of css-files. These files will be included into html if they don't exist there |
| titleprefix |	fontsize |	This prefix will be used in the link-title attribute of the stylesheets |
| enableiframe |	false |	the functionality can also be applied to iFrames, but be careful with cross-domain-requests|

## Version
The current version is **1.0.0**
## Changelog
### 1.0.0
- initial commit
- 
## Dependencies
The plugin works with jQuery 1.7+

Tested in:
* IE 8 - 11
* Firefox
* Chrome
* Safari

## Licence
Copyright (C) 2015 backslash - artists of new media (info@backslash.ch)

This work is licensed under the Creative Commons
Attribution 3.0 Unported License. To view a copy
of this license, visit
http://creativecommons.org/licenses/by/3.0/.
 
When using this software you use it at your own risk. We hold
no responsibility for any damage caused by using this plugin
or the documentation provided.
