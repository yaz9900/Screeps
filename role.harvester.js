var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var haveEnergy;
        if(!creep.memory.haveEnergy && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.haveEnergy = true;
	        creep.say('🚧 deposit');
	    }
	    if(creep.memory.haveEnergy && creep.carry.energy == 0) {
	        creep.memory.haveEnergy = false;
	        creep.say('🔄 harvest');
	    }
        
	    if(!creep.memory.haveEnergy) {
            var sources = creep.room.find(FIND_SOURCES);
            
            if(creep.harvest(sources[creep.memory.source]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.source], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
                haveEnergy = true;  
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => { return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;}
                });
                if(targets.length > 0) {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: 'FF0000'}});
                    }
                }
                
            
        }
	}
};

module.exports = roleHarvester;