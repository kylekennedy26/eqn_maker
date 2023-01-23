
function isNode(o){
  return (
    typeof Node === "object" ? o instanceof Node : 
    o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
  );
}

function addListeners () {
  const draggables = document.querySelectorAll('.draggable')
  const containers = document.querySelectorAll('.table')
  const Math = document.querySelectorAll('.Math')
  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
      
      draggable.classList.add('dragging')

    })

    draggable.addEventListener('dragend', () => {
      if(draggable.classList[1] == 'operand'){
        //console.log("Operand Detected");
        var mat = document.querySelector('.Math');
        mat.innerHTML = null;

        var plus = document.createElement('p'); 
        plus.innerHTML = '+';
        plus.className = "draggable operand";
        plus.draggable = true;
        mat.appendChild(plus);

        var minus = document.createElement('p'); 
        minus.innerHTML = '-';
        minus.className = "draggable operand";
        minus.draggable = true;
        mat.appendChild(minus);

        var mult = document.createElement('p'); 
        mult.innerHTML = '*';
        mult.className = "draggable operand";
        mult.draggable = true;
        mat.appendChild(mult);

        var div = document.createElement('p'); 
        div.innerHTML = '/';
        div.className = "draggable operand";
        div.draggable = true;
        mat.appendChild(div);

        var lPar = document.createElement('p'); 
        lPar.innerHTML = '(';
        lPar.className = "draggable operand";
        lPar.draggable = true;
        mat.appendChild(lPar)
        
        var rPar = document.createElement('p'); 
        rPar.innerHTML = ')';
        rPar.className = "draggable operand";
        rPar.draggable = true;
        mat.appendChild(rPar);

        addListeners();
      }
      draggable.classList.remove('dragging')
      draggable.classList.add('user')
    })
  })
  Math.forEach(t => {
    t.addEventListener('dragover', e => {
      e.preventDefault();
      var draggable = document.querySelector('.dragging');
      if(draggable.classList[1] == "operand" && draggable.classList[2] == 'user'){
        draggable.remove();
      }
    })
  })
  containers.forEach(table => {
    table.addEventListener('dragover', e => {
      e.preventDefault()
      const afterElement = getDragAfterElement(table, e.clientX)
      const draggable = document.querySelector('.dragging')
      if (afterElement == null) {
        table.appendChild(draggable)
      } else {
        if(draggable == null){
          console.log("Draggable is null");
        }

        table.insertBefore(draggable, afterElement)
      }
    })
  })
}

function getDragAfterElement(table, x) {
  const draggableElements = [...table.querySelectorAll('.draggable:not(.dragging)')]
  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = x - box.left - box.width / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}