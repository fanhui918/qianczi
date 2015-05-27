HQQ = typeof HQQ == "undefined" ? {} : HQQ;
Array.prototype.each=function(callback)
{
    for (var i=0;i<this.length;i++)
    {
        callback.call(this,i,this[i]);
    }
};
HQQ.City = (function() {
		var city = {
				cityPageInit: cityPageInit
		};
		
		function cityPageInit(form_name){
			var $pageForm = form_name;
			
			$pageForm.find('input[name=city]').focus(function() {
				var $input = $(this);
				var left = $input.position().left;
				var top = $input.position().top;
				$('.city-select').css('top', top+$input.outerHeight()+2).css('left', left);
                //$('.city-select').position.left();
                $('.city-select').show();
			});
			
			$('.city-select').find('.tab').click(function() {
				var $tab = $(this);
				var tabName = $tab.attr("name");
				$('.city-select').find('.tab').removeClass('selected');
				$tab.addClass('selected');
				$('.city-select').find('.tab-content').hide();
				$('.city-select').find('.tab-content[name='+tabName+']').show();
			});
			
			$('.city-select').find('.tab-content').find('a').click(function() {
				console.log('11');
				var $a = $(this);
				
				$pageForm.find("input[name=city]").val($a.text());
				$pageForm.find("input[name=province]").val($a.attr("province"));
				$('.city-select').hide();
				return false;
			});
			
			$('body').bind('click', function(e) {
				var $target = $(e.target);
				if (!$target.hasClass('city-select-input')) {
					if ($target.hasClass('.city-select') || ($target.parents('.city-select').length > 0 && !$target.hasClass('city'))) {
						// do nothing
					} else {
						$('.city-select').hide();
					}
				}
			});
		};
		
		return city;

})();

