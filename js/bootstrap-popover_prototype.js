/* ===========================================================
 * bootstrap-popover.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#popovers
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =========================================================== */
/*

Modified for use with PrototypeJS

http://github.com/jwestbrook/bootstrap-prototype


*/

"use strict";

if(BootStrap === undefined)
{
	var BootStrap = {};
}



  /* NOTE: POPOVER EXTENDS BOOTSTRAP-TOOLTIP.js
	========================================== */
BootStrap.Popover = Class.create(BootStrap.Tooltip,{
	initialize : function ($super,element, options) {
		element.store('bootstrap:popover',this)
		$super(element,{subclass:true});
		Object.extend(this.options,{
			placement: 'right'
			, trigger: 'click'
			, content: ''
			, template: new Element('div',{'class':'popover'}).insert(new Element('div',{'class':'arrow'})).insert(new Element('h3',{'class':'popover-title'})).insert(new Element('div',{'class':'popover-content'}))
		});
		if(options && options.template && Object.isString(options.template))
		{
			var t = new Element('div').update(options.template);
			options.template = t.down();
		}
		Object.extend(this.options,options)
		this.init('popover',element,this.options)
	}
	, setContent: function () {
		var $tip = this.tip()
		, title = this.getTitle()
		, content = this.getContent()
		
		$tip.select('.popover-title').length > 0 ? $tip.select('.popover-title')[0].update(title) : ''
		$tip.select('.popover-content').length > 0 ? $tip.select('.popover-content')[0].update(content) : ''
		
		$tip.removeClassName('fade top bottom left right in')
	}
	
	, hasContent: function () {
		return this.getTitle() || this.getContent()
	}
	
	, getContent: function () {
		var content
		, $e = this.$element
		, o = this.options
		
		content = (typeof o.content == 'function' ? o.content.call($e[0]) :  o.content)
		|| $e.readAttribute('data-content')
		
		return content
	}
	
	, tip: function () {
		if (!this.$tip) {
			this.$tip = this.options.template
		}
		return this.$tip
	}
	
	, destroy: function ($super) {
		$super()
		this.hide()
		this.$element.stopObserving(this.options.trigger)
	}
});