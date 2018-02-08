var roleHarvestBeast = {

    /** @param {Creep} creep **/
    run: function(creep) {
        creep.moveTo(Game.creep.room.findById(creep.memory.assignedContainer));
        creep.harvest(creep.room.findClosestByRange(FIND_SOURCES));
        if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0], {visualizePathStyle: {stroke: 'FF0000'}});
        }
	}
};

module.exports = roleHarvestBeast;