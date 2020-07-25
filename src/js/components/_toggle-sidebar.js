$(function () {
	var $sidebar = $(".side-menu");
 	$(".toggle-sidebar").on("click",function(){
        setTimeout(chartResize, 300)
        if($sidebar.hasClass("collapse")){
            localStorage.setItem("collapse", "false");
            $sidebar.removeClass("collapse");

        }
        else{
            localStorage.setItem("collapse", "true");
            $sidebar.addClass("collapse");
        }
  });
});
