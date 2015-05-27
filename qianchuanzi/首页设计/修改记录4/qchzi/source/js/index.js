/**
 * Created by qinjunling on 2014/12/2.
 */
$(function(){
  //用户左侧
  $(document).on('click',function(event){
    if($(event.target).is('li.subMenu')){
      event.preventDefault();
      $aHref = $(event.target).find('a');
      var aHref = $aHref.attr('target');
      $('.userWrap').html();
      $('.userWrap').load(aHref);
    }
    if($(event.target).is('a.subMenu')){
          event.preventDefault();
          $aHref = $(event.target);
          var aHref = $aHref.attr('target');
          $('.userWrap').html();
          $('.userWrap').load(aHref);
    }
    if($(event.target).is('.tab li')){
        var role = $(event.target).data('role');
        $('div[id*="Identity"]').hide();
        $('#'+role).show();
    }
  })
  //模拟select
  $(".select_box input").click(function(){
    var thisinput=$(this);
    var thisul=$(this).parent().find("ul.select_ul");
    if(thisul.css("display")=="none"){
//        if(thisul.height()>200){thisul.css({height:"200"+"px","overflow-y":"scroll" })};
      thisul.fadeIn("100");
      thisul.hover(function(){},function(){thisul.fadeOut("100");})
      thisul.find("li.sel_value").on('click',function(event){
        thisinput.val($(this).text());thisul.fadeOut("100");}).hover(function(){$(this).addClass("hover");},function(){$(this).removeClass("hover");});
    }
    else{
      thisul.fadeOut("fast");
    }
  })
//    $("#submit").click(function(){
//      var endinfo="";
//      $(".select_box input:text").each(function(i){
//        endinfo=endinfo+(i+1)+":"+$(this).val()+";\n";
//      })
//      alert(endinfo);
//    })
});
