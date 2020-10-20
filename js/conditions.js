function jsfunction(choice) {
  var newVal = 'I decided to ' + choice;
  elem = document.getElementById('choice');
  elem.innerHTML = newVal;

  var para = document.createElement('h2');
  var node = document.createTextNode('You fool.');
  para.appendChild(node);
  var para2 = document.createElement('p');
  var node2 = document.createTextNode('You point your ship towards the island');
  para2.appendChild(node2);

  var element = document.getElementById('tele-text');
  element.appendChild(para);
  element.appendChild(para2);
}

var a = document.getElementById('a');

a.onclick = function () {
  // how to troubleshoot
  console.log('Click just happened');

  // alert('hello');
  // change ship stats text
  var rand = Math.floor(Math.random() * 10);
  newValue('speed', rand);
  rand = Math.floor(Math.random() * 10);
  newValue('crew', rand);
  rand = Math.floor(Math.random() * 400);
  newValue('food', rand);
  rand = Math.floor(Math.random() * 1000);
  newValue('gold', rand);
  rand = Math.floor(Math.random() * 100);
  newValue('health', rand);

  rand = Math.floor(Math.random() * 100) - 100;
  document.getElementById('tool1').innerHTML = '' + rand;
  rand = Math.floor(Math.random() * 100) - 100;
  document.getElementById('tool2').innerHTML = '' + rand;

  reveal('tool1');
  reveal('tool2');
};

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById('myBtn');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName('close')[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = 'block';
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

function reveal(id) {
  var on = document.getElementById(id).style.visibility = 'visible';
}

function blinkElement(elem, interval, duration) {
  elem.style.visibility = (elem.style.visibility === 'hidden' ? 'visible' : 'hidden');
  if (duration > 0) {
    setTimeout(blinkElement, interval, elem, interval, duration - interval);
  } else {
    elem.style.visibility = 'visible';
  }
}

function newValue(id, v) {
  var displays = { speed: '<b>Speed:</b> ' + v + ' clicks/day',
                  crew: '<b>Crew Members:</b> ' + v + ' people',
                  food: '<b>Crew Members:</b> ' + v + ' people',
                  gold: '<b>Gold:</b> ' + v + ' pieces',
                  health: '<b>Durability:</b> ' + v + '/100', };
  var newVal = displays[id];
  elem = document.getElementById(id);
  elem.innerHTML = newVal;
  blinkElement(elem, 90, 800);
}
