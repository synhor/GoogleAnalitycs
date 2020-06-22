///////////////////////////////////////////////////////////////////////////
// Copyright © 2014 Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////

define([
    'jimu/BaseWidget',
    'dojo/query',
    'dojo/topic',
    'dojo/dom-construct',
    'dojo/on',
    'dojo/_base/declare',
    'dojo/_base/lang',
    'https://www.google-analytics.com/analytics.js'
  ],
  function(BaseWidget, query, topic, domConstruct, on, declare, lang) {
  
      var clazz = declare([BaseWidget], {
        //these two properties is defined in the BaseWiget
        baseClass: 'analitycs',
        name: 'analitycs',

        startup: function() {
            var head = query('head')[0];
            var reg = /<[script][^>]*>[^<]*/g;
            var matches =  this.config.settings.scriptGA.match(reg);
            var analiticsId = null;
            matches.forEach(lang.hitch(this, function(res){
                var script = domConstruct.create('script');
                var regSrcAttr = /src="[^"]*/;
                var srcAttrMatch = res.split('>')[0].match(regSrcAttr); 
                if (srcAttrMatch) {
                    // ściągamy ga_id
                    var regId = /id=[^"]*/;
                    var srcStr = srcAttrMatch[0].split('="')[1];
                    script.src= srcStr;
                    analiticsId = srcStr.match(regId)[0].split('=')[1];
                    ga('create', analiticsId, 'auto', 'widgetTracker');
                    // 1. otwarcie widgetu
                    topic.subscribe('widgetTracker.onOpen', function(widget){
                        // filtr widżetów
                        if (!widget.inPanel && widget.name != 'AttributeTable') {
                            return;
                        }
                        console.log('[GoogleAnalitycs] widget open event. Sending data...')
                        //ga('widgetTracker.send', 'pageview','MN_Widget/' + widget.name);
                        
                        ga('widgetTracker.send', {
                            hitType: 'event',
                            eventCategory: 'Widgets',
                            eventAction: 'open',
                            eventLabel: widget.name
                        })                        
                    });                                        
                } else {
                    script.textContent = res.split('>')[1];
                }            
                domConstruct.place(script, head);
            }))
            this.inherited(arguments);
        }       
    });
  
    return clazz;
});
  