var scaleFactor =0;
var originX = 0;
var originY = 0;

function posX(lon){
	var x = lonToX(lon) * scaleFactor - originX; 	 
	x = Math.round(x * 1000) / 1000.0 ; 
	return x;
}

function posY(lat){ 
	var y = latToY(lat) * scaleFactor - originY; 
	y = Math.round(y * 1000) / 1000.0 ;
	return y;
}

function lonToX(lon){
	return (lon + 180.0) / 360.0;
}

function latToY(lat){

	var sinLat = Math.sin(lat*(Math.PI/180.0)) ; //Math.sin(Math.log(lat)); //
	return Math.log((1.0 + sinLat) / (1.0 - sinLat)) / (4.0 * Math.PI) + 0.5;
}

function xToLonOrg(x) {
	return 360.0 * (x - 0.5);
}

function yToLatOrg(y) {
	return 360.0 * Math.atan(Math.exp((y - 0.5) * (2.0 * Math.PI))) / Math.PI - 90.0;
}

function xToLon(x){
	return xToLonOrg(( x + originX ) / scaleFactor)
}

function yToLat(y){
	return yToLatOrg((y + originY) / scaleFactor);
}

//need the origin lat and lon
function getScale( lon,lat){
	//calc scale factor	

	// convert from degrees to radians
	var latRad = lat*(Math.PI/180.0);
	
	//console.log(latRad);

	//EARTH_CIRCUMFERENCE = 40075016.686
	scaleFactor = 40075016.686 * Math.cos(latRad);

	originY = latToY(lat) * scaleFactor;
	originX = lonToX(lon) * scaleFactor;

	console.log(originX, originY, scaleFactor);

}