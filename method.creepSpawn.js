var FindThings = require('./method.FindThings');

var creepSpawn = {
    
  /** @param {Creep} creep **/
  //Base Creep spawner cpde
  BaseCreep: function(creepRole, sourceJSON, newName, energyCapacity) {
    // Body composition code
    // Sets up bodyparts based on energy capacity of the room
    var bodyComposition;
    if (!(energyCapacity>=300)){
      bodyComposition = [WORK,CARRY,MOVE];
    }else if(!(energyCapacity>=600)){
      bodyComposition = [[WORK,WORK,CARRY,CARRY,MOVE,MOVE]];
    }
    // Creep spawner code
    // Refactor for multi room availibility
    Game.spawns['Spawn1'].spawnCreep(bodyComposition, newName,  {memory: {role: creepRole, source: sourceJSON, haveEnergy: false}});
  },
  //Harvest Beast spawning code
  HarvestBeast: function(sourceJSON, newName, energyCapacity) {
    // Creep spawner code
    // Refactor for multi room availibility
    Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE], newName, {memory: {role: 'harvestBeast', assignedContainer: FindThings.freeContainers()}});
  }

  
};

module.exports = creepSpawn;