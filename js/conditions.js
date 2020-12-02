// id: switch, approach, scene, leaving
// 0: clouds
// 1: island
// 2: village
// 3: ship
// 4: ship clouds
// 5: island clouds

// arr  [ x,   x,    x,     x,   x,   x]
// value  gold speed health crew food tool

// 0: depression 1: Anxiety 2: Addiction 3: Binge Eating 4: Anorexia 5: ADHD

function choiceStart(id, prompt, c, p){
  choice(id, prompt, c, [0,0,0,0,0,0], p);
}

function choice(id, prompt, c, arr, p) {
  var newVal = prompt + c;
  elem = document.getElementById(id);
  elem.innerHTML = newVal;

  if (id == 'switch') {
    switchScreen();
  } else if (id == 'approach') {
    writeInJournal('p', p);
    update(arr);
    scene();
  } else if (id == 'scene') {
    writeInJournal('p', p);
    update(arr);
    leaving();
  } else if (id == 'leaving') {
    writeInJournal('p', p);
    update(arr);
    setSail();
  } else if (id == 'other') {
    writeInJournal('p', p);
    update(arr);
    approaching();
  }
}

var journal = 1;
var oceanArr = [];

var condition;
var day;

function switchScreen() {
  j = document.getElementById('journal');
  t = document.getElementById('tele-text');

  if (journal == 1) {
    console.log("Switch to Telescope Screen");

    // clear journal text
    text = document.getElementById('journal-text');
    text.innerHTML = '';

    // create new ocean images
    oceanArr = [];
    for (var x = 0; x < 6; x++) {
      var r = Math.floor(Math.random() * 6);
      var c = Math.floor(Math.random() * 5);
      oceanArr[x] = [r, c];
    }
    generateOcean(oceanArr);

    // change visibility
    t.style.display = "block";
    t.style.visibility = "visible";
    j.style.display = "none";
    j.style.visibility = "hidden";

    // reset boolean
    journal = 0;
  } else {
    console.log("Switch to Journal Screen");

    // change visibility
    j.style.display = "block";
    j.style.visibility = "visible";
    t.style.display = "none";
    t.style.visibility = "hidden";

    // clear old images
    i = document.getElementById('images');
    i.innerHTML = '';

    // create journal image texture
    img = document.createElement('img');
    img.src = 'images/journal.png';
    img.alt = 'Background';
    i.appendChild(img);

    // reset boolean value
    journal = 1;
  }
}

function generateOcean(oarr) {
  console.log("Ocean Generated");
  i = document.getElementById('images');

  // clear old images
  i.innerHTML = '';

  for (var x = 0; x < oarr.length; x++) {
    img = document.createElement('img');
    img.src = oceanImages[oarr[x][0]][oarr[x][1]];
    img.alt = 'Background';
    img.classList.add('ocean');
    img.style.left = 30 + (70 * x) + '%';
    img.id = x;
    i.appendChild(img);
  }
}

var direction;
function scenario() {
  console.log("Click Registered");
  var scrollLeft = document.documentElement.scrollLeft;
  var maxScrollLeft = document.documentElement.scrollWidth - document.documentElement.clientWidth;
  var percentScroll = scrollLeft/maxScrollLeft * 100;

  if (percentScroll < 8.3) {
    direction = 0;
    story(oceanArr[0][0],oceanArr[0][1]);
  } else if (8.3 <= percentScroll && percentScroll < 33.3) {
    direction = 1;
    story(oceanArr[1][0],oceanArr[1][1]);
  } else if (33.3 <= percentScroll && percentScroll < 50) {
    direction = 2;
    story(oceanArr[2][0],oceanArr[2][1]);
  } else if (50<= percentScroll && percentScroll < 66.7) {
    direction = 3;
    story(oceanArr[3][0],oceanArr[3][1]);
  } else if (66.7 <= percentScroll && percentScroll < 91.7) {
    direction = 4;
    story(oceanArr[4][0],oceanArr[4][1]);
  } else {
    direction = 5;
    story(oceanArr[5][0],oceanArr[5][1]);
  }
}

function reRoute() {
  if (foodMagnet > Math.floor(Math.random() * 100)) {
    loc = 1;
    siz = Math.floor(Math.random() * 5);
    console.log("Re-routed");
    writeInJournal('p', 'As if pulled by a strong wind or my own inner desire, the ship has steered itself off course.  We are now headed straight towards an island that will provide us with fresh food and a satisfied appetite.');
  } else if (steeredWrong > Math.floor(Math.random() * 100)) {
    var del = Math.floor(Math.random() * 5);
    direction = (direction + del) % 5;
    loc = oceanArr[direction][0];
    siz = oceanArr[direction][1];
    console.log("Re-routed");
    writeInJournal('p', 'The winds seemed to pull the ship in a slightly different direction than I had in mind.  I chose not to fight it, and instead allowed the sea to take us wherever it chooses.');
  } else {
    if (loc == 3) { // going towards ship
      if (shipFear > Math.floor(Math.random() * 100)) {
        while (loc == 3) {
          var del = Math.floor(Math.random() * 5);
          direction = (direction + del) % 5;
          loc = oceanArr[direction][0];
          siz = oceanArr[direction][1];
        }
        console.log("Re-routed");
        writeInJournal('p', 'The crew shook with fear as we approached the ships, so at the last second I changed course.  I did not know at the time which island would be our new destination.  All I could think about was sailing far away from the merchants and pirates that might try to plunder from us.');
      }
    }
  }
}

var loc = -1;
var siz = -1;

var day = 1;
var distractionOn;

// arr  [ x,   x,    x,     x,   x,   x]
// value  gold speed health crew food tool
function story(location, size) {
  loc = location;
  siz = size;

  switchScreen();
  distance = Math.floor(Math.random() * 60) + 120;
  day += Math.floor(distance / speed);

  title = titles[loc][siz];
  writeInJournal('h', "<center>Captain's Daily Log<center>");
  writeInJournal('hr', "");
  writeInJournal('p', "Day " + day );
  writeInJournal('h2', title);

  reRoute();

  distractionOn = 0;
  // special variables
  foodEaten = crew * Math.floor(distance / speed);
  if (foodEaten > food) { foodEaten = food; }
  update([0, 0, 0, 0, -foodEaten, 0]);
  if (health < 20) {
    writeInJournal('p', 'The ship is in desperate need of repairs.  If we don\'t fix it soon, our speed will be reduced to zero and we won\'t be able to sail.');
    update([0, -1, 0, 0, 0, 0]);
  }
  if (speed == 0) {
    speed = speedReset;
    day += 100;
    var sub = -1000;
    if (gold < 1000) {
      sub = gold * (-1);
    }
    writeInJournal('p', 'The ship sank just as we reached the shore of a nearby inhabitaed island.  The crew and I spent 100 days working to buy supplies and build a new ship.  Next time, we will have to make sure to repair the ship before things become so desperate.');
    update([sub, 0, 0, 0, 0, 0]);
  }
  if (food <= 0) {
    writeInJournal('p', 'We have run out of food and our crewmates are beginning to die from starvation.  We really must reverse this trend!');
    update([0, 0, 0, -5, 0, 0]);
  }
  if (postStormFear != 1) { postStormFear -= 1; }
  if ((energizers - 1) == 1 && loc == 1) {
    writeInJournal('p', 'We were nearly running out of fresh food, but thankfully this island will help us to re-stock.  The crewmates continue to have an energy boost, and the ship will continue to have a slight increase in speed.');
  } else if ((energizers - 1) == 1) {
    writeInJournal('p', 'It has been awhile since the crew tasted fresh food, so they begin to grumble and slack off on their work.  The ship no longer has an increase in speed.');
    update([0, -1, 0, 0, 0, 0]);
  } else if (loc == 1) {
    energizers = energizersReset;
    writeInJournal('p', 'The fresh food on this island has given the crewmates a boost of energy.  The ship will have an increase in speed for a short while.')
    update([0, 1, 0, 0, 0, 0]);
  }
  if (energizers != 1) { energizers -= 1; }
  if (food < 400) { lowEnergy *= 2; }
  if (food >= 400 && lowEnergy != 0) { lowEnergy = 1; }
  distractionOn = 1;
  if (crew < 6) {
    writeInJournal('p', newCrew.p1);
    writeOptions('other', newCrew);
  } else {
    approaching();
  }
}

function approaching() {
  var mood_statement_chance = 90;
  if(mood_statement_chance > Math.floor(Math.random() * 100)) {
    inner = mood_statements[loc][Math.floor(Math.random() * 11)];
    writeInJournal('p', inner);
  }

  var approaching_chance = 9;
  if(approaching_chance > Math.floor(Math.random() * 100)) {
    console.log("Approaching Scene");
    s = approachScenes[Math.floor(Math.random() * approachScenes.length)];
    writeInJournal('p', s.p1);
    writeOptions('approach', s);
  } else {
    scene();
  }
}
function scene() {
  if (loc == 0 && stormClouds > Math.floor(Math.random() * 100)) {
    console.log("Main Scene: Storm");
    var s_arr = locations[loc];
    var s = s_arr[Math.floor(Math.random() * s_arr.length / 4)];
    postStormFear = postStormFearReset + 1;
    writeInJournal('p', s.p1);
    writeOptions('scene', s);
  } else if (loc == 3 || loc == 4) {
    console.log("Main Scene: Clouds");
    var s_arr = locations[loc];
    var s = s_arr[Math.floor(Math.random() * s_arr.length)];
    writeInJournal('p', s.p1);
    writeOptions('scene', s);
  } else {
    console.log("Main Scene: Normal");
    var s_arr = locations[loc];
    var s = s_arr[Math.floor(Math.random() * s_arr.length)];
    writeInJournal('p', s.p1);
    writeOptions('scene', s);
  }
}

function leaving() {
  var s_rand = Math.floor(Math.random() * 100);

  if (s_rand < 100 && toolCount < 2) {
    console.log("Exit Scene: Specialist Tool");
    if (toolCount == 0) {
      addTool(tool1h, tool1p);
      toolCount += 1;
    } else {
      addTool(tool2h, tool2p);
      toolCount += 1;
    }
    setSail();
  } else if (s_rand < 60) {
    console.log("Exit Scene: Normal");
    var s = leavingScenes[Math.floor(Math.random() * 10) + condition * 10];
    writeInJournal('p', s.p1);
    writeOptions('leaving', s);
  } else {
    setSail();
  }
}

function setSail() {
  container = document.createElement('h2');
  container.id = 'switch';
  container.innerHTML = "Continue Playing: &nbsp";

  aa1 = document.createElement('a');
  aa1.addEventListener("click", function() {
    var empty = [0, 0, 0, 0, 0, 0];
    choice('switch', 'Continue Playing: ', 'Set Sail', empty, '');
  });
  aa1.href = "#";
  aa1.classList.add("effect-underline");
  aa1.innerHTML = 'Set Sail';

  container.appendChild(aa1);

  j = document.getElementById('journal-text');
  j.appendChild(container);
}

function writeOptions(id, s) {
  container = document.createElement('h2');
  container.id = id;
  container.innerHTML = "I decided to...";

  aa1 = document.createElement('a');
  aa1.addEventListener("click", function() {
    choice(id, 'I decided to ', s.c1, s.a1, s.r1);
  });
  aa1.href = "#";
  aa1.classList.add("effect-underline");
  aa1.innerHTML = s.c1;

  aa2 = document.createElement('a');
  aa2.addEventListener("click", function() {
    choice(id, 'I decided to ', s.c2, s.a2, s.r2);
  });
  aa2.href = "#";
  aa2.classList.add("effect-underline");
  aa2.innerHTML = s.c2;

  container.appendChild(aa1);
  container.appendChild(aa2);

  j = document.getElementById('journal-text');
  j.appendChild(container);
}

function writeInJournal(type, inner){
  j = document.getElementById('journal-text');

  // create inner html
  text = document.createElement(type);
  text.innerHTML = inner;
  j.appendChild(text);
}

function addTool(h, p){
  alert(h);
  alert(p);
  console.log("Tool Added");
  box = document.getElementById('box');

  // create inner html
  boxInner = document.createElement('div');
  boxInner.classList.add("box-inner");

  dh = document.createElement('h');
  dh.innerHTML = h;
  br = document.createElement('br');
  dp = document.createElement('p');
  dp.innerHTML = p;

  boxInner.appendChild(dh);
  boxInner.appendChild(br);
  boxInner.appendChild(dp);

  box.appendChild(boxInner);
}

// arr  [ x,   x,    x,     x,   x,   x]
// value  gold speed health crew food tool
function update(ogvarr) {
  var varr = [];
  varr[0] = ogvarr[0];
  varr[1] = ogvarr[1];
  varr[2] = ogvarr[2];
  varr[3] = ogvarr[3];
  varr[4] = ogvarr[4];
  varr[5] = ogvarr[5];

  // how to troubleshoot
  if (varr.length != 6) {
    console.log('Update array is not length 5.  Length: ' + varr.length);
  }
  var crew_distracted = 0;
  if (distractionOn == 1) {
    crew_distracted = Math.floor(Math.random() * distracted / 100 * crew);
    if (crew_distracted > 0) {
      writeInJournal('p', crew_distracted + ' crew members got distracted while working.');
    }
  }
  if (varr[0] == 1) {
    var temp_gold = Math.floor((crew - crew_distracted) * siz * plunderSkill / postStormFear / lowEnergy);
    varr[0] = temp_gold;
  }
  if (varr[2] == 1) {
    var temp_health = Math.floor(Math.random() * leakiness) * -1;
    varr[2] = temp_health;
  }
  if (varr[4] == 1) {
    var temp_food = ( 50 + nets * size ) * (crew - crew_distracted);
    varr[4] = temp_food;
  }
  if (gold+varr[0] < 0) {varr[0] = -gold;} gold += varr[0];
  if (speed+varr[1] < 0) {varr[1] = -speed;} speed += varr[1];
  if (health+varr[2] < 0) {varr[2] = -health;}
  if (health+varr[2] > 100) {varr[2] = 100-health;} health += varr[2];
  if (crew+varr[3] < 0) {varr[3] = -crew;} crew += varr[3];
  if (food+varr[4] < 0) {varr[4] = -food;} food += varr[4];

  console.log('Gold:' +gold+ "  Speed:" +speed+ "  Health:" +health+ "  Crew:" +crew+ "  Food:" +food);

  // change ship stats
  if (varr[0] != 0) {
    newValue('gold', gold);
    if (varr[0] > 0) {
      writeInJournal('p', '<i> + ' + varr[0] + ' gold pieces</i>');
    } else {
      writeInJournal('p', '<i> - ' + (-1 * varr[0]) + ' gold pieces</i>');
    }
  }
  if (varr[1] != 0) {
    newValue('speed', speed);
    if (varr[1] > 0) {
      writeInJournal('p', '<i> + ' + varr[1] + ' ship speed</i>');
    } else {
      writeInJournal('p', '<i> - ' + (-1 * varr[1])  + ' ship speed</i>');
    }
  }
  if (varr[2] != 0) {
    newValue('health', health);
    if (varr[2] > 0) {
      writeInJournal('p', '<i> + ' + varr[2] + ' ship health</i>');
    } else {
      writeInJournal('p', '<i> - ' + (-1 * varr[2]) + ' ship health</i>');
    }
  }
  if (varr[3] != 0) {
    newValue('crew', crew);
    if (varr[3] > 0) {
      writeInJournal('p', '<i> + ' + varr[3] + ' crew members</i>');
    } else {
      writeInJournal('p', '<i> - ' + (-1 * varr[3]) + ' crew members</i>');
    }
  }
  if (varr[4] != 0) {
    newValue('food', food);
    if (varr[4] > 0) {
      writeInJournal('p', '<i> + ' + varr[4] + ' food stock</i>');
    } else {
      writeInJournal('p', '<i> - ' + (-1 * varr[4]) + ' food stock</i>');
    }
  }
  if (varr[5] != 0) {
    writeInJournal('p', '<i> + 1 tool added to inventory</i>');
    addTool();
  }
}

//function reveal(id) {
//var on = document.getElementById(id).style.visibility = 'visible';
//}

function blinkElement(elem, interval, duration) {
  elem.style.visibility = (elem.style.visibility === 'hidden' ? 'visible' : 'hidden');
  if (duration > 0) {
    setTimeout(blinkElement, interval, elem, interval, duration - interval);
  } else {
    elem.style.visibility = 'visible';
  }
}

function newValue(id, v) {
  var displays = {gold: '<b>Gold:</b> ' + v + ' pieces',
                  speed: '<b>Speed:</b> ' + v + ' clicks/day',
                  health: '<b>Durability:</b> ' + v + '/100',
                  crew: '<b>Crew Members:</b> ' + v + ' people',
                  food: '<b>Food Stock:</b> ' + v + ' portions'};
  var newVal = displays[id];
  elem = document.getElementById(id);
  elem.innerHTML = newVal;
  blinkElement(elem, 90, 800);
}

var approachScenes = [];

var cldScenes = [];
var islScenes = [];
var vlgScenes = [];
var shpScenes = [];
var shpcldScenes = [];
var islcldScenes = [];

var leavingScenes = [];

approachScenes[0] = {p1: "approach 1 p1", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 1, 0, 0], a2: [5, 0, 0, 0, 0, 0]};
approachScenes[1] = {p1: "approach 2 p1", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 2, 0, 0], a2: [15, 0, 0, 0, 0, 0]};
approachScenes[2] = {p1: "approach 3 p1", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 3, 0, 0], a2: [25, 0, 0, 0, 0, 0]};
approachScenes[3] = {p1: "approach 4 p1", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 4, 0, 0], a2: [35, 0, 0, 0, 0, 0]};
approachScenes[4] = {p1: "approach 5 p1", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 5, 0, 0], a2: [45, 0, 0, 0, 0, 0]};

// first 1/4 are storm, the rest of the 3/4 are non-storm
cldScenes[0] = {p1: "cloud 1 p1", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [1, 0, 0, 1, 0, 0], a2: [5, 0, 0, 0, 0, 0]};
cldScenes[1] = {p1: "cloud 2 p1", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [1, 0, 0, 2, 0, 0], a2: [15, 0, 0, 0, 0, 0]};
cldScenes[2] = {p1: "cloud 3 p1", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [1, 0, 0, 3, 0, 0], a2: [25, 0, 0, 0, 0, 0]};
cldScenes[3] = {p1: "cloud 4 p1", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [1, 0, 0, 4, 0, 0], a2: [35, 0, 0, 0, 0, 0]};
cldScenes[4] = {p1: "cloud 5 p1", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [1, 0, 0, 5, 0, 0], a2: [45, 0, 0, 0, 0, 0]};

islScenes[0] = {p1: "island 1 p1", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, -1, 0, 1, 0, 0], a2: [5, 0, 0, 0, 0, 0]};
islScenes[1] = {p1: "island 2 p1", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, -2, 0, 2, 0, 0], a2: [15, 0, 0, 0, 0, 0]};
islScenes[2] = {p1: "island 3 p1", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, -3, 0, 3, 0, 0], a2: [25, 0, 0, 0, 0, 0]};
islScenes[3] = {p1: "island 4 p1", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, -4, 0, 4, 0, 0], a2: [35, 0, 0, 0, 0, 0]};
islScenes[4] = {p1: "island 5 p1", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, -5, 0, 5, 0, 0], a2: [45, 0, 0, 0, 0, 0]};

vlgScenes[0] = {p1: "village 1 p1", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 1, -5, 0], a2: [5, 0, 0, 0, 0, 0]};
vlgScenes[1] = {p1: "village 2 p1", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 2, -10, 0], a2: [15, 0, 0, 0, 0, 0]};
vlgScenes[2] = {p1: "village 3 p1", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 3, -15, 0], a2: [25, 0, 0, 0, 0, 0]};
vlgScenes[3] = {p1: "village 4 p1", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 4, -20, 0], a2: [35, 0, 0, 0, 0, 0]};
vlgScenes[4] = {p1: "village 5 p1", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 5, -25, 0], a2: [45, 0, 0, 0, 0, 0]};

shpScenes[0] = {p1: "ship 1 p1", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 1, 0, 1, 0, 0], a2: [5, 0, 0, 0, 0, 0]};
shpScenes[1] = {p1: "ship 2 p1", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 2, 0, 2, 0, 0], a2: [15, 0, 0, 0, 0, 0]};
shpScenes[2] = {p1: "ship 3 p1", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 3, 0, 3, 0, 0], a2: [25, 0, 0, 0, 0, 0]};
shpScenes[3] = {p1: "ship 4 p1", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 4, 0, 4, 0, 0], a2: [35, 0, 0, 0, 0, 0]};
shpScenes[4] = {p1: "ship 5 p1", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 5, 0, 5, 0, 0], a2: [45, 0, 0, 0, 0, 0]};

shpcldScenes[0] = {p1: "ship cloud 1 p1", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, -1, 1, 0, 0], a2: [5, 0, 0, 0, 0, 0]};
shpcldScenes[1] = {p1: "ship cloud 2 p1", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, -2, 2, 0, 0], a2: [15, 0, 0, 0, 0, 0]};
shpcldScenes[2] = {p1: "ship cloud 3 p1", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, -3, 3, 0, 0], a2: [25, 0, 0, 0, 0, 0]};
shpcldScenes[3] = {p1: "ship cloud 4 p1", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, -4, 4, 0, 0], a2: [35, 0, 0, 0, 0, 0]};
shpcldScenes[4] = {p1: "ship cloud 5 p1", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, -5, 5, 0, 0], a2: [45, 0, 0, 0, 0, 0]};

islcldScenes[0] = {p1: "island cloud 1 p1", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [5, 0, 1, 1, 0, 0], a2: [5, 0, 0, 0, 0, 0]};
islcldScenes[1] = {p1: "island cloud 2 p1", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [10, 0, 2, 2, 0, 0], a2: [15, 0, 0, 0, 0, 0]};
islcldScenes[2] = {p1: "island cloud 3 p1", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [15, 0, 3, 3, 0, 0], a2: [25, 0, 0, 0, 0, 0]};
islcldScenes[3] = {p1: "island cloud 4 p1", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [20, 0, 4, 4, 0, 0], a2: [35, 0, 0, 0, 0, 0]};
islcldScenes[4] = {p1: "island cloud 5 p1", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [25, 0, 5, 5, 0, 0], a2: [45, 0, 0, 0, 0, 0]};

var locations = [cldScenes, islScenes, vlgScenes, shpScenes, shpcldScenes, islcldScenes];

// depression
leavingScenes[0] = {p1: "leaving depression p1", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 1, 0, 0], a2: [5, 0, 0, 0, 0, 0]};
leavingScenes[1] = {p1: "leaving depression p2", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 2, 0, 0], a2: [15, 0, 0, 0, 0, 0]};
leavingScenes[2] = {p1: "leaving depression p3", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 3, 0, 0], a2: [25, 0, 0, 0, 0, 0]};
leavingScenes[3] = {p1: "leaving depression p4", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 4, 0, 0], a2: [35, 0, 0, 0, 0, 0]};
leavingScenes[4] = {p1: "leaving depression p5", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 5, 0, 0], a2: [45, 0, 0, 0, 0, 0]};
leavingScenes[5] = {p1: "leaving depression p6", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 5, 0, 0], a2: [45, 0, 0, 0, 0, 0]};
leavingScenes[6] = {p1: "leaving depression p7", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 1, 0, 0], a2: [5, 0, 0, 0, 0, 0]};
leavingScenes[7] = {p1: "leaving depression p8", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 2, 0, 0], a2: [15, 0, 0, 0, 0, 0]};
leavingScenes[8] = {p1: "leaving depression p9", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 3, 0, 0], a2: [25, 0, 0, 0, 0, 0]};
leavingScenes[9] = {p1: "leaving depression p10", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 4, 0, 0], a2: [35, 0, 0, 0, 0, 0]};

 // anxiety
leavingScenes[10] = {p1: "leaving anxiety p1", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 1, 0, 0], a2: [5, 0, 0, 0, 0, 0]};
leavingScenes[11] = {p1: "leaving anxiety p2", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 2, 0, 0], a2: [15, 0, 0, 0, 0, 0]};
leavingScenes[12] = {p1: "leaving anxiety p3", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 3, 0, 0], a2: [25, 0, 0, 0, 0, 0]};
leavingScenes[13] = {p1: "leaving anxiety p4", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 4, 0, 0], a2: [35, 0, 0, 0, 0, 0]};
leavingScenes[14] = {p1: "leaving anxiety p5", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 5, 0, 0], a2: [45, 0, 0, 0, 0, 0]};
leavingScenes[15] = {p1: "leaving anxiety p6", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 5, 0, 0], a2: [45, 0, 0, 0, 0, 0]};
leavingScenes[16] = {p1: "leaving anxiety p7", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 1, 0, 0], a2: [5, 0, 0, 0, 0, 0]};
leavingScenes[17] = {p1: "leaving anxiety p8", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 2, 0, 0], a2: [15, 0, 0, 0, 0, 0]};
leavingScenes[18] = {p1: "leaving anxiety p9", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 3, 0, 0], a2: [25, 0, 0, 0, 0, 0]};
leavingScenes[19] = {p1: "leaving anxiety p10", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 4, 0, 0], a2: [35, 0, 0, 0, 0, 0]};

// addiction
leavingScenes[20] = {p1: "leaving addiction p1", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 1, 0, 0], a2: [5, 0, 0, 0, 0, 0]};
leavingScenes[21] = {p1: "leaving addiction p2", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 2, 0, 0], a2: [15, 0, 0, 0, 0, 0]};
leavingScenes[22] = {p1: "leaving addiction p3", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 3, 0, 0], a2: [25, 0, 0, 0, 0, 0]};
leavingScenes[23] = {p1: "leaving addiction p4", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 4, 0, 0], a2: [35, 0, 0, 0, 0, 0]};
leavingScenes[24] = {p1: "leaving addiction p5", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 5, 0, 0], a2: [45, 0, 0, 0, 0, 0]};
leavingScenes[25] = {p1: "leaving addiction p6", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 5, 0, 0], a2: [45, 0, 0, 0, 0, 0]};
leavingScenes[26] = {p1: "leaving addiction p7", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 1, 0, 0], a2: [5, 0, 0, 0, 0, 0]};
leavingScenes[27] = {p1: "leaving addiction p8", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 2, 0, 0], a2: [15, 0, 0, 0, 0, 0]};
leavingScenes[28] = {p1: "leaving addiction p9", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 3, 0, 0], a2: [25, 0, 0, 0, 0, 0]};
leavingScenes[29] = {p1: "leaving addiction p10", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 4, 0, 0], a2: [35, 0, 0, 0, 0, 0]};

// binge eating
leavingScenes[30] = {p1: "leaving binge eating p1", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 1, 0, 0], a2: [5, 0, 0, 0, 0, 0]};
leavingScenes[31] = {p1: "leaving binge eating p2", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 2, 0, 0], a2: [15, 0, 0, 0, 0, 0]};
leavingScenes[32] = {p1: "leaving binge eating p3", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 3, 0, 0], a2: [25, 0, 0, 0, 0, 0]};
leavingScenes[33] = {p1: "leaving binge eating p4", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 4, 0, 0], a2: [35, 0, 0, 0, 0, 0]};
leavingScenes[34] = {p1: "leaving binge eating p5", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 5, 0, 0], a2: [45, 0, 0, 0, 0, 0]};
leavingScenes[35] = {p1: "leaving binge eating p6", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 5, 0, 0], a2: [45, 0, 0, 0, 0, 0]};
leavingScenes[36] = {p1: "leaving binge eating p7", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 1, 0, 0], a2: [5, 0, 0, 0, 0, 0]};
leavingScenes[37] = {p1: "leaving binge eating p8", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 2, 0, 0], a2: [15, 0, 0, 0, 0, 0]};
leavingScenes[38] = {p1: "leaving binge eating p9", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 3, 0, 0], a2: [25, 0, 0, 0, 0, 0]};
leavingScenes[39] = {p1: "leaving binge eating p10", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 4, 0, 0], a2: [35, 0, 0, 0, 0, 0]};

// anorexia
leavingScenes[40] = {p1: "leaving anorexia p1", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 1, 0, 0], a2: [5, 0, 0, 0, 0, 0]};
leavingScenes[41] = {p1: "leaving anorexia p2", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 2, 0, 0], a2: [15, 0, 0, 0, 0, 0]};
leavingScenes[42] = {p1: "leaving anorexia p3", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 3, 0, 0], a2: [25, 0, 0, 0, 0, 0]};
leavingScenes[43] = {p1: "leaving anorexia p4", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 4, 0, 0], a2: [35, 0, 0, 0, 0, 0]};
leavingScenes[44] = {p1: "leaving anorexia p5", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 5, 0, 0], a2: [45, 0, 0, 0, 0, 0]};
leavingScenes[45] = {p1: "leaving anorexia p6", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 5, 0, 0], a2: [45, 0, 0, 0, 0, 0]};
leavingScenes[46] = {p1: "leaving anorexia p7", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 1, 0, 0], a2: [5, 0, 0, 0, 0, 0]};
leavingScenes[47] = {p1: "leaving anorexia p8", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 2, 0, 0], a2: [15, 0, 0, 0, 0, 0]};
leavingScenes[48] = {p1: "leaving anorexia p9", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 3, 0, 0], a2: [25, 0, 0, 0, 0, 0]};
leavingScenes[49] = {p1: "leaving anorexia p10", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 4, 0, 0], a2: [35, 0, 0, 0, 0, 0]};

// ADHD
leavingScenes[50] = {p1: "leaving ADHD p1", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 1, 0, 0], a2: [5, 0, 0, 0, 0, 0]};
leavingScenes[51] = {p1: "leaving ADHD p2", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 2, 0, 0], a2: [15, 0, 0, 0, 0, 0]};
leavingScenes[52] = {p1: "leaving ADHD p3", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 3, 0, 0], a2: [25, 0, 0, 0, 0, 0]};
leavingScenes[53] = {p1: "leaving ADHD p4", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 4, 0, 0], a2: [35, 0, 0, 0, 0, 0]};
leavingScenes[54] = {p1: "leaving ADHD p5", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 5, 0, 0], a2: [45, 0, 0, 0, 0, 0]};
leavingScenes[55] = {p1: "leaving ADHD p6", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 5, 0, 0], a2: [45, 0, 0, 0, 0, 0]};
leavingScenes[56] = {p1: "leaving ADHD p7", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 1, 0, 0], a2: [5, 0, 0, 0, 0, 0]};
leavingScenes[57] = {p1: "leaving ADHD p8", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 2, 0, 0], a2: [15, 0, 0, 0, 0, 0]};
leavingScenes[58] = {p1: "leaving ADHD p9", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 3, 0, 0], a2: [25, 0, 0, 0, 0, 0]};
leavingScenes[59] = {p1: "leaving ADHD p10", c1: "choice 1", c2: "choice 2", r1: "result 1", r2: "result 2", a1: [0, 0, 0, 4, 0, 0], a2: [35, 0, 0, 0, 0, 0]};

// Approaching Moody Statements
var a_depr = [];
a_depr[0] = "Depr Statement 0";
a_depr[1] = "Depr Statement 1";
a_depr[2] = "Depr Statement 2";
a_depr[3] = "Depr Statement 3";
a_depr[4] = "Depr Statement 4";
a_depr[5] = "Depr Statement 5";
a_depr[6] = "Depr Statement 6";
a_depr[7] = "Depr Statement 7";
a_depr[8] = "Depr Statement 8";
a_depr[9] = "Depr Statement 9";
a_depr[10] = "Depr Statement 10";

var a_anxt = [];
a_anxt[0] = "Anxt Statement 0";
a_anxt[1] = "Anxt Statement 1";
a_anxt[2] = "Anxt Statement 2";
a_anxt[3] = "Anxt Statement 3";
a_anxt[4] = "Anxt Statement 4";
a_anxt[5] = "Anxt Statement 5";
a_anxt[6] = "Anxt Statement 6";
a_anxt[7] = "Anxt Statement 7";
a_anxt[8] = "Anxt Statement 8";
a_anxt[9] = "Anxt Statement 9";
a_anxt[10] = "Anxt Statement 10";

var a_addc = [];
a_addc[0] = "Addc Statement 0";
a_addc[1] = "Addc Statement 1";
a_addc[2] = "Addc Statement 2";
a_addc[3] = "Addc Statement 3";
a_addc[4] = "Addc Statement 4";
a_addc[5] = "Addc Statement 5";
a_addc[6] = "Addc Statement 6";
a_addc[7] = "Addc Statement 7";
a_addc[8] = "Addc Statement 8";
a_addc[9] = "Addc Statement 9";
a_addc[10] = "Addc Statement 10";

var a_bing = [];
a_bing[0] = "Bing Statement 0";
a_bing[1] = "Bing Statement 1";
a_bing[2] = "Bing Statement 2";
a_bing[3] = "Bing Statement 3";
a_bing[4] = "Bing Statement 4";
a_bing[5] = "Bing Statement 5";
a_bing[6] = "Bing Statement 6";
a_bing[7] = "Bing Statement 7";
a_bing[8] = "Bing Statement 8";
a_bing[9] = "Bing Statement 9";
a_bing[10] = "Bing Statement 10";

var a_strv = [];
a_strv[0] = "Strv Statement 0";
a_strv[1] = "Strv Statement 1";
a_strv[2] = "Strv Statement 2";
a_strv[3] = "Strv Statement 3";
a_strv[4] = "Strv Statement 4";
a_strv[5] = "Strv Statement 5";
a_strv[6] = "Strv Statement 6";
a_strv[7] = "Strv Statement 7";
a_strv[8] = "Strv Statement 8";
a_strv[9] = "Strv Statement 9";
a_strv[10] = "Strv Statement 10";

var a_adhd = [];
a_adhd[0] = "Adhd Statement 0";
a_adhd[1] = "Adhd Statement 1";
a_adhd[2] = "Adhd Statement 2";
a_adhd[3] = "Adhd Statement 3";
a_adhd[4] = "Adhd Statement 4";
a_adhd[5] = "Adhd Statement 5";
a_adhd[6] = "Adhd Statement 6";
a_adhd[7] = "Adhd Statement 7";
a_adhd[8] = "Adhd Statement 8";
a_adhd[9] = "Adhd Statement 9";
a_adhd[10] = "Adhd Statement 10";

var mood_statements = {0: a_depr, 1: a_anxt, 2: a_addc, 3: a_bing, 4: a_strv, 5: a_adhd};

var titles = [];
titles[0] = ["The Open Sea", "Sailing the Blue Ocean", "A Distant Storm", "Battling Choppy Seas", "Caught in a Rough Storm"];
titles[1] = ["A Small Tropical Island", "Scavenging for Food", "Collecting Coconuts", "Resources from Tropical Beaches", "An Island Abundant with Food"];
titles[2] = ["A Barely Inhabited Island", "Plundering a Tiny Coastal Village", "Searching a Small Town for Gold", "Invading a Sizable Coastal Village", "Plundering a Trading Town"];
titles[3] = ["One Vulnerable Ship", "Sailing into a pair of Merchant Vessels", "Approaching a Small Merchant Fleet", "Risking a Meeting with a Group of Ships", "Challenging a Fleet"];
titles[4] = ["Clouded Vision", "Merchant Vessels Behind the Mist", "A Hidden Fleet", "Sailing into an Unknown Encounter", "A Risky Maneuver of Many Ships"];
titles[5] = ["Land sort of in Sight", "Cloudy Town", "Island Shrouded in Mist", "Hoping for Goods on this Island", "A Land Shrouded in Clouds"];

var oceanImages = [];
oceanImages[0] = ['ocean/cld1.png', 'ocean/cld2.png', 'ocean/cld3.png', 'ocean/cld4.png', 'ocean/cld5.png'];
oceanImages[1] = ['ocean/isl1.png', 'ocean/isl2.png', 'ocean/isl3.png', 'ocean/isl4.png', 'ocean/isl5.png'];
oceanImages[2] = ['ocean/vlg1.png', 'ocean/vlg2.png', 'ocean/vlg3.png', 'ocean/vlg4.png', 'ocean/vlg5.png'];
oceanImages[3] = ['ocean/shp1.png', 'ocean/shp2.png', 'ocean/shp3.png', 'ocean/shp4.png', 'ocean/shp5.png'];
oceanImages[4] = ['ocean/shpcld1.png', 'ocean/shpcld2.png', 'ocean/shpcld3.png', 'ocean/shpcld4.png', 'ocean/shpcld5.png'];
oceanImages[5] = ['ocean/islcld1.png', 'ocean/islcld2.png', 'ocean/islcld3.png', 'ocean/islcld4.png', 'ocean/islcld5.png'];

var newCrew = {p1: "We need to recruit more crewmates to man the ship.", c1: "recruit 6 crew members (-300 gold)", c2: "recruit 15 crew members (-700 gold)", r1: "The new crewmates quickly learn how to sail and are eager to put more gold in their pockets.", r2: "The new crewmates quickly learn how to sail and are eager to put more gold in their pockets.", a1: [-300, 0, 0, 6, 0, 0], a2: [-700, 0, 0, 15, 0, 0]};

window.onload = initiate();

var gold;
var health;
var food;

var speed;
var speedReset;
var crew;
var postStormFear;
var postStormFearReset;
var shipFear;
var stormClouds;
var energizers;
var energizersReset;
var lowEnergy;
var leakiness;
var steeredWrong;
var plunderSkill;
var foodMagnet;
var desiredByPirates;
var distracted;
var nets;

var condtion;
var toolCount;
var tool1h;
var tool1p;
var tool2h;
var tool2p;

function initiate() {
  condition = Math.floor(Math.random() * 6);
  gold = 100;
  health = 100;
  food = 2500;
  postStormFear = 1;
  energizers = 1;
  day = 1;
  toolCount = 0;

  if (condition == 0) {
    console.log('Condition: depression');
    speed = 4;
    speedReset = 4;
    crew = 30;
    food = food + Math.floor(Math.random() * 2000);
    postStormFearReset = 3;
    shipFear = 0;
    stormClouds = 50;
    energizersReset = 3;
    lowEnergy = 1;
    leakiness = 30;
    steeredWrong = 5;
    plunderSkill = 1;
    foodMagnet = 2;
    desiredByPirates = 30;
    distracted = 0;
    nets = 10;
    tool1h = "tool 1 title";
    tool1p = "hi use the tool 1";
    tool2h = "tool 2 title";
    tool2p = "hi use the tool 2";
  } else if (condition == 1) {
    console.log('Condition: anxiety');
    speed = 7;
    speedReset = 7;
    crew = 22;
    food = food + Math.floor(Math.random() * 1000);
    postStormFearReset = 1;
    shipFear = 40;
    stormClouds = 80;
    energizersReset = 1;
    lowEnergy = 1;
    leakiness = 20;
    steeredWrong = 12;
    plunderSkill = 1;
    foodMagnet = 2;
    desiredByPirates = 45;
    distracted = 10;
    nets = 10;
    tool1h = "tool 1 title";
    tool1p = "hi use the tool 1";
    tool2h = "tool 2 title";
    tool2p = "hi use the tool 2";
  } else if (condition == 2) {
    console.log('Condition: addiction');
    speed = 6;
    speedReset = 6;
    crew = 45;
    food = food + Math.floor(Math.random() * 4000);
    postStormFearReset = 1;
    shipFear = 0;
    stormClouds = 40;
    energizersReset = 4;
    lowEnergy = 1;
    leakiness = 40;
    steeredWrong = 30;
    plunderSkill = 2;
    foodMagnet = 10;
    desiredByPirates = 15;
    distracted = 0;
    nets = 10;
    tool1h = "tool 1 title";
    tool1p = "hi use the tool 1";
    tool2h = "tool 2 title";
    tool2p = "hi use the tool 2";
  } else if (condition == 3) {
    console.log('Condition: binge eating');
    speed = 3;
    speedReset = 3;
    crew = 50;
    food = food + Math.floor(Math.random() * 7000);
    postStormFearReset = 1;
    shipFear = 0;
    stormClouds = 35;
    energizersReset = 3;
    lowEnergy = 1;
    leakiness = 25;
    steeredWrong = 30;
    plunderSkill = 3;
    foodMagnet = 28;
    desiredByPirates = 55;
    distracted = 0;
    nets = 10;
    tool1h = "tool 1 title";
    tool1p = "hi use the tool 1";
    tool2h = "tool 2 title";
    tool2p = "hi use the tool 2";
  } else if (condition == 4) {
    console.log('Condition: anorexia');
    speed = 8;
    speedReset = 8;
    crew = 8;
    food = food + Math.floor(Math.random() * 1000);
    postStormFearReset = 1;
    shipFear = 0;
    stormClouds = 35;
    energizersReset = 1;
    lowEnergy = 1;
    leakiness = 60;
    steeredWrong = 5;
    plunderSkill = 1;
    foodMagnet = 0;
    desiredByPirates = 30;
    distracted = 0;
    nets = 10;
    tool1h = "tool 1 title";
    tool1p = "hi use the tool 1";
    tool2h = "tool 2 title";
    tool2p = "hi use the tool 2";
  } else if (condition == 5) {
    console.log('Condition: ADHD');
    speed = 6;
    speedReset = 6;
    crew = 25;
    food = food + Math.floor(Math.random() * 1500);
    postStormFearReset = 2;
    shipFear = 0;
    stormClouds = 10;
    energizersReset = 1;
    lowEnergy = 1;
    leakiness = 60;
    steeredWrong = 20;
    plunderSkill = 3;
    foodMagnet = 0;
    desiredByPirates = 35;
    distracted = 50;
    nets = 10;
    tool1h = "tool 1 title";
    tool1p = "hi use the tool 1";
    tool2h = "tool 2 title";
    tool2p = "hi use the tool 2";
  }

  newValue('gold', gold);
  newValue('speed', speed);
  newValue('health', health);
  newValue('crew', crew);
  newValue('food', food);
}
