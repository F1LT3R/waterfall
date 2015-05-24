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


      // console.log(elem.childNodes[i].firstElementChild);
    };


    console.log(stack);

    for (var row in stack) {

      var maxHeight = 0;

      // Reset heights
      stack[row].forEach(function(elem){
        elem.firstElementChild.setAttribute('style', 'height:auto;');
      });

      // Get Maximums
      stack[row].forEach(function(elem){
        var clientHeight = elem.clientHeight;
        if (clientHeight > maxHeight) {
          maxHeight = clientHeight;
        }
      });

      // Set all by maximum
      stack[row].forEach(function(elem){
        elem.firstElementChild.setAttribute('style', 'height:'+ maxHeight+'px;');
      });
    }

  });
}

window.addEventListener('resize', uniformHeights);

uniformHeights();



















