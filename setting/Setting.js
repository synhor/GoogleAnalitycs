///////////////////////////////////////////////////////////////////////////
// Copyright © 2014 - 2018 Esri. All Rights Reserved.
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
    'dojo/_base/declare',
	'jimu/BaseWidgetSetting'
],
function(declare, BaseWidgetSetting) {
  return declare([BaseWidgetSetting ], {
    baseClass: 'jimu-widget-analitics-settings',
	startup: function(){
		this.inherited(arguments);
		console.log(arguments); 
		console.log(this.config);
		this.setConfig(this.config);
    },

    setConfig: function(config){
		this.config = config;

		this.scriptGA.value = config.settings.scriptGA;
		console.log("settings read from file: ");
		console.log(config);
    },

    getConfig: function(){
		//settings = this.config.settings;
        this.config.settings.scriptGA = this.scriptGA.value;
		console.log("settings write to file: ");
		console.log(this.config);
		return this.config;
    }
  });
});