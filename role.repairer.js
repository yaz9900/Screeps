var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.repairing = true;
	        creep.say('⚡ repair');
	    }

	    if(creep.memory.repairing) {
            var target = creep.room.find(FIND_STRUCTURES, {
                filter: function(object){
                    if(object.structureType != STRUCTURE_ROAD ) {
                        return false;
                    }
                    if(object.hits > object.hitsMax / 3) {
                     return false;
                   }
                    return true;
                } 
             });     
            if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#008000'}});
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[creep.memory.source]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.source], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
	}
};

module.exports = roleRepairer;
