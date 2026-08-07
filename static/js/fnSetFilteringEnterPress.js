jQuery.fn.dataTableExt.oApi.fnSetFilteringEnterPress = function(oSettings) {
	var _that = this;

	this.each(function(i) {
		$.fn.dataTableExt.iApiIndex = i;
		var anControl = $('input', _that.fnSettings().aanFeatures.f);

		anControl.unbind('keyup search input').bind(
				'keyup search input',
				function(e) {
					var searchVal = $.trim(anControl.val());
					if (searchVal.length == 0 || searchVal.length > 2 && e.keyCode == 13) {
						_that.fnFilter(searchVal);
					}
				});
		return this;
	});
	return this;
};