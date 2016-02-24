(function () {

  'use strict';

  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };

      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }



  // Takes sibling columns and aligns their heights.

  var efficientAlign = debounce(function (){ wfalign(); }, 100);


  // Re-align layout conent if the window size changes
  window.addEventListener('resize', efficientAlign, true);

  // Re-align layout conent if the DOM changes
  document.addEventListener('DOMSubtreeModified', efficientAlign, true);




  // Realign the window content
  function wfalign (){
    var blocks = getBlocks()
      , stacks
      ;

    if (blocks) {
      stacks = stackRows(blocks);
      forceHeights(stacks);
      // Doing it twice because of a bug
      stacks = stackRows(blocks);
      forceHeights(stacks);
    }
  }




  function getBlocks(){
    var blocks = document.getElementsByClassName('block');
    // console.log(blocks.length);

    var watches = [];

    for (var i=0; i < blocks.length; i+=1) {
      var block = blocks[i];
      if (block.hasAttribute('row')) {
        watches.push(block);
      }
    }

    // console.log(watches);
    return watches;
  }



  function stackRows(watches){
    var stacks = [];
    watches.forEach(function(elem){

      var top = -1;
      var line = -1;

      var stack = {};

      for (var i=0; i < elem.childNodes.length; i+=1) {
        var node = elem.childNodes[i];

      if (node.offsetTop) {
          var offsetTop = node.offsetTop;
          // console.log(top, offsetTop);
          if (offsetTop>top) {
            line +=1;
            top = offsetTop;
            stack[line] = [];
          }

          stack[line].push(node);
        }
      }

      stacks.push(stack);

    });


    // console.log(stacks);
    return stacks;
  }







  function forceHeights (stacks){

    function processStack(stack, row) {
      var maxHeight = 0;

      // Reset heights
      stack[row].forEach(function(elem){
        elem.firstElementChild.style.height = 'auto';
      });

      // Get Maximums
      stack[row].forEach(function(elem){
        var clientHeight = elem.clientHeight;
        if (clientHeight > maxHeight) {
          maxHeight = clientHeight;
        }
      });

      // Set all by maximum
      var len = stack[row].length;
      // console.log(len);

      stack[row].forEach(function(elem, i){

        elem.style.paddingLeft  = '';
        elem.style.paddingRight = '';

        if (i === 0) {
          elem.style.paddingLeft = 0;
        } else if (i === len-1) {
          elem.style.paddingRight = 0;
        }

        elem.firstElementChild.style.height = maxHeight+'px';
      });
    }

    stacks.forEach(function(stack){
      for (var row in stack) {
        processStack(stack, row);
      }
    });
  }


})();
