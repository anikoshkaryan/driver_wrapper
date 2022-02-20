const swiper = new Swiper('#driver_swiper', {
    // Optional parameters
    direction: "horizontal",
    loop: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },

  });








  $(document).on('change','#fileinput_form',function () {

    var value = $(this).val();
  
      var arr = value.split('\\');
  
      $(this).parent().find(".file_span").html(arr[arr.length - 1]);
  
      var fileExtension = ['jpeg', 'jpg', 'png', 'gif', 'bmp'];
  
      var span = $(this).parent().find(".file_span");
  
  
  
      if ($.inArray($(this).val().split('.').pop().toLowerCase(), fileExtension) == -1) {
  
          span.html("Невозможно загрузить формат");
  
          span.css({
              'color': '#F60000'
          });
  
          $('.hide-title').css({
              "display": "block"
          })
  
  
  
      } else {
  
          span.css({
  
              'color': "#ffffff"
  
          });
  
  
        //  var parent =$(this).closest(".projects-form-input-wrapper");
  
        //  parent.append("<img class='close-js' src='wp-content/themes/build/images/file-.svg' alt=''>");
  
        //  parent.append("<p class='hide-title'>Файл</p>");
  
        //   parent.css({
  
        //      "position": 'relative',
  
        //      "justify-content": 'space-between'
  
        //  });
  
  
  
      }
  
  });



  $(document).on("change", ".driver_form_radio_input",function(){
    $(".driver_form_radio_input_wrapper").removeClass("active");
        $(this).parent().addClass("active");
  });



  var x, i, j, l, ll, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /*when an item is clicked, update the original select box,
        and the selected item:*/
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
      /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);