var FindThings = {
		
	/** @param {Creep} creep **/
	freeContainers: function(harvestBeast){
		var containers = Game.spawns.Spawn1.room.find(STRUCTURE_CONTAINER);
		var harvestBeast = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvestBeast');
		for(i=0; i<containers.length; i++){
			var boolFreeContainer = true;
			for(b=0; b<harvestBeast.length; b++){
				if(harvestBeast[b].memory.assignedContainer == containers[i].id){
					boolFreeContainer = false;
				}
			}
			if(boolFreeContainer == true){return containers[i].id }
		}
		if(boolFreeContainer == false){console.log("No free containers found")};
		return 
	}		
};
	
module.exports = FindThings;