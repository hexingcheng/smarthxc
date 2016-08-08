var util = {
	type:function(o){
		return Object.prototype.toString.call(o).split(' ')[1].slice(0,-1).toLowerCase()
	}
}
module.exports = {
	formatRes:function(status,messages,data){
		let temtDate= {};
		return {
			"status":status,
			"message":messages,
			"data":JSON.parse(data)
		}
	},
	type:util.type
}