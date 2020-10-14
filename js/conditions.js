var a = document.getElementById('a');

a.onclick = function () {
  // how to troubleshoot
  console.log('Click just happened');

  // alert('hello');
  // change ship stats text
  var rand = Math.floor(Math.random() * 10);
  newSpeed(rand);
  rand = Math.floor(Math.random() * 10);
  newCrew(rand);
  rand = Math.floor(Math.random() * 400);
  newFood(rand);
  rand = Math.floor(Math.random() * 1000);
  newGold(rand);
  rand = Math.floor(Math.random() * 100);
  newHealth(rand);

  rand = Math.floor(Math.random() * 100) - 100;
  document.getElementById('tool1').innerHTML = '' + rand;
  rand = Math.floor(Math.random() * 100) - 100;
  document.getElementById('tool2').innerHTML = '' + rand;

  reveal('tool1');
  reveal('tool2');
};

function reveal(id) {
  var on = document.getElementById(id).style.visibility = 'visible';
}

function newSpeed(s) {
  var newVal = '<b>Speed:</b> ' + s + ' clicks/day';
  document.getElementById('speed').innerHTML = newVal;
}

function newCrew(c) {
  var newVal = '<b>Crew Members:</b> ' + c + ' people';
  document.getElementById('crew').innerHTML = newVal;
}

function newFood(f) {
  var newVal = '<b>Food Stock:</b> ' + f + ' portions';
  document.getElementById('food').innerHTML = newVal;
}

function newGold(g) {
  var newVal = '<b>Gold:</b> ' + g + ' pieces';
  document.getElementById('gold').innerHTML = newVal;
}

function newHealth(h) {
  var newVal = '<b>Durability:</b> ' + h + '/100';
  document.getElementById('health').innerHTML = newVal;
}
