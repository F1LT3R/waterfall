// var col4 = document.getElementsByTagName('col4');




var blocks = document.getElementsByTagName('block');

var watches = [];

// console.log(blocks.length);

for (var i=0; i < blocks.length; i+=1) {
  var block = blocks[i];
  if (block.hasAttribute('row')) {
    watches.push(block);
  }
}

// console.log(watches);

function uniformHeights(){
  watches.forEach(function(elem){

    var top = -1;
    var line = -1;

    stack = {

    };

    for (var i=0; i < elem.childNodes.length; i+=1) {

      var node = elem.childNodes[i];

      if (node.offsetTop) {
        var offsetTop = node.offsetTop;
        console.log(top, offsetTop);
        if (offsetTop>top) {
          line +=1;
          top = offsetTop;
          stack[line] = [];
        }

        stack[line].push(node);
      }
    };


    for (var row in stack) {

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
      console.log(len);

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

  });
}

window.addEventListener('resize', uniformHeights);

uniformHeights();



















