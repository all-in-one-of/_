function powResWH(width, height){
	return powRes(max(width, height))
}
function powRes(orgRes) {
	var powRes = 0;
	var power = 0;
	while (powRes < orgRes) {
		powRes = 2 << power;
		power++;
	}
	return powRes;
}