package avdw.texture {
	import flash.display.Bitmap;
	
	/**
	 * ...
	 * @author Andrew van der Westhuizen
	 */
	public interface ITexture {
		function getDiffuse(useCache:Boolean = true):Bitmap;
		function getNormal(useCache:Boolean = true):Bitmap;
		function getDetail(useCache:Boolean = true):Bitmap;
		function get name():String;
	}

}