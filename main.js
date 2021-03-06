var roleBuilder = require('role.builder');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleHarvestBeast = require('role.harvestBeast');


var sources = Game.spawns.Spawn1.room.find(FIND_SOURCES);
var sourceLength = sources.length;
var sourceJSON = 0;
module.exports.loop = function () {
//console.log(sourceLength);
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var harvestBeast = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvestBeast');
    //console.log('Harvesters: ' + harvesters.length);

    if(harvesters.length < 6) {
        var newName = 'Harvester' + Game.time;
       // console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName, 
            {memory: {role: 'harvester', source: sourceJSON, haveEnergy: false}});
    }
    if(Game.spawns.Spawn1.room.energyAvailable == Game.spawns.Spawn1.room.energyCapacityAvailable){
    
    if(builders.length < harvesters.length + 4) {
        var newName = 'builder' + Game.time;
       // console.log('Spawning new builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName, 
            {memory: {role: 'builder', source: sourceJSON}});
    }
    if(upgraders.length < harvesters.length) {
        var newName = 'upgrader' + Game.time;
       // console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE,MOVE], newName, 
            {memory: {role: 'upgrader', source: sourceJSON}});
    }
    
     if(harvestBeast.length < 2) {
        var newName = 'HarvesBeast' + Game.time;
       // console.log('Spawning new harvestBeast: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], newName, 
            {memory: {role: 'harvestBeast', source: sourceJSON}});
    }
    
    }
    
    if(Game.spawns['Spawn1'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
          
            if(Game.spawns['Spawn1'].spawning.remainingTime == 1){
            
            if((++ sourceJSON) > sourceLength-1){sourceJSON = 0;}
             console.log('Creep: '  + spawningCreep.memory.role + " spawned with source: "+ sourceJSON);
            }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'harvestBeast') {
            roleHarvestBeast.run(creep);
        }
    }
}