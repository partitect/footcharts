$(function () {
	var $sidebar = $(".sidebar-nav");
	var $mainwrap = $(".main-content");

 	$(".toggle-sidebar").on("click",function(){
        setTimeout(chartResize, 300)
        if($sidebar.hasClass("collapse")){
            localStorage.setItem("collapse", "false");
            $sidebar.removeClass("collapse");
            $mainwrap.removeClass("collapse");
        }
        else{
            localStorage.setItem("collapse", "true");
            $sidebar.addClass("collapse");
            $mainwrap.addClass("collapse");
        }
  });
});
