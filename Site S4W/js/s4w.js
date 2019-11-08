/*
O funcionamento de vários componentes do site depende de javascript, 
quando existir necessidade de refatoração das classes/IDs verificar se ela não é utilizada
por algum script 
*/

// Efeito de "esteira" na seção do blog, funciona deslocando uma 
// div interna muito maior que a div externa(viewport div).
var Cards = function(){
  var showedCards = 0,
  hiddenCards = 0,
  sizeToPull = 0,
  pull = 0,
  actual = 0,
  qtToPull = 1, //quantidade de cards que ele vai trazer 
  allCards = 0,
  el;
  (function(){
    allCards = document.querySelectorAll('#inside-slide .card').length;
    sizeToPull = $("#inside-slide .card:first-child").outerWidth(true);
    el = document.querySelector("#inside-slide");
  }());
  return {
    recalc: function(){
      
      if(el != null){
        let aux = $(window).width(), i = 0;
        while(aux > sizeToPull){
          aux = aux - sizeToPull;
          i++;
        }
        showedCards = i;
        qtToPull = i;
        console.log(qtToPull);
        hiddenCards = allCards - i;
        el.setAttribute("style", "transform: translateX(0px)");
        actual = 0;
        pull = 0;
        $('.btn-left').hide();
        $('.btn-right').show();
      }
    }, 
    next: function(){
      $('.btn-left').show();
      if(actual <= hiddenCards && el != null){
        actual += qtToPull;
        pull += sizeToPull * qtToPull;
        el.setAttribute("style", "transform: translateX(-"+pull+"px)");
        if(actual+qtToPull > hiddenCards){
          
          $('.btn-right').hide();
        }
      }
      else{
        $('.btn-right').hide();
      }
    },
    previous: function(){
      if(actual > 0 && el != null){
        actual -= qtToPull;
        pull -= sizeToPull * qtToPull;
        el.setAttribute("style", "transform: translateX(-"+pull+"px)");
        if(actual+qtToPull <= hiddenCards){ 
          $('.btn-right').show();
        }
        if(actual == 0){
          $('.btn-left').hide();
        }
      }
      else{
        $('.btn-right').show();
        $('.btn-left').hide();
      }
    }
  }
}

var c = Cards();

c.recalc();

$('.btn-left').on('click', function(ev){
  ev.preventDefault();
  c.previous();
});
$('.btn-right').on('click', function(ev){
  ev.preventDefault();
  c.next();
});

//Adicionado efeito para abrir o menu quando colocado o mouse em cima
//Adicionado efeito para abrir o menu quando colocado o mouse em cima
function ajusteMenu(){
  if($(window).width() >= 992){
    $('.nav-pills > li > a').hover(function() {
      if(!$(this).hasClass('active')){
        $('.tab-pane').removeClass('active show');
        $(this).tab('show');
      }
    }, 
    function(){
      $(this).find('a').tab('show');
    });
  }
}

   $(document).ready(function(){
    ajusteMenu();
    $('a[data-toggle="pill"]').on('shown.bs.tab', function (e) {
      $('.nav-pills > li > a').not(e.target).addClass('desativa-item');
      $("#s4w-nav").css("border-bottom", "1px solid rgb(231, 231, 231)");
    })

    $('#s4w-nav').hover(null, function(){
      $('.tab-pane').removeClass('active show');
      $('.nav-pills .nav-item .nav-link').removeClass('active desativa-item');
      $("#s4w-nav").css("border-bottom", "0");
      if( $(window).scrollTop() < 100){
        $("#s4w-nav").removeAttr("style").attr("background-color");
      }
    });

    $('.nav-tabs > li ').hover(function() {
      if ($(this).hasClass('hoverblock'))
        return;
      else
        $(this).find('a').tab('show');
    });

    $(".menu-oquefazemos button").on('click', function(e){
      if(!$(this).hasClass('collapsed'))
        e.stopPropagation();   
    });

    $('.nav-tabs > li').find('a').click(function() {
      $(this).parent
        .siblings().addClass('hoverblock');
    });

    // Uma forma mais responsável de trabalhar com o evento de redimensionamento.
    window.addEventListener("resize", resizeThrottler, false);

    var resizeTimeout;
    function resizeThrottler() {
      // ignore resize events as long as an actualResizeHandler execution is in the queue
      if ( !resizeTimeout ) {
        resizeTimeout = setTimeout(function() {
          resizeTimeout = null;
          actualResizeHandler();   
         // The actualResizeHandler will execute at a rate of 15fps
         }, 66);
      }
    }

    function fullHeight(){
      let element = $(".fullheight"),
      h = window.innerHeight;
      element.css("height",h+"px");
      //if(element != undefined){
     //   element.forEach(function(e){
       //   e.style.height = '10px';
     //     console.log('a');
    //    });
         
     // }
      
    }
    fullHeight();
    function actualResizeHandler() {
      fullHeight();
      ajusteMenu();
      c.recalc();
    }
  });