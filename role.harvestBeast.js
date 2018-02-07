var roleHarvestBeast = {

    /** @param {Creep} creep **/
    run: function(creep) {
        creep.moveTo(Game.creep.room.findById(creep.memory.assignedContainer));
        creep.harvest(creep.room.findClosestByRange(FIND_SOURCES));
	}
};

module.exports = roleHarvestBeast;