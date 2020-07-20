function chartResize() {
	var allCharts = $('.chartli');
	for (var i = 0; i < allCharts.length; i++) {
		var $item = $(allCharts[i]);
		echarts.getInstanceById($item.attr('_echarts_instance_')).resize();
	}
}
$(document).ready(function() {
	setTimeout(chartResize, 300);
});
$(window).on('load', function() {
	setTimeout(chartResize, 300);
	setTimeout(() => {
		$('#loaderInner').fadeOut('fast');
	}, 500);
});

window.onresize = function() {
	setTimeout(chartResize, 300);
};
