package avdw.texture.creeper {
	import avdw.texture.ITexture;
	import flash.display.Bitmap;
	
	/**
	 * ...
	 * @author Andrew van der Westhuizen
	 */
	public class Creeper implements ITexture {
		[Embed(source="photosculpt-creeper-diffuse.jpg")]
		private static const Diffuse:Class;
		[Embed(source="photosculpt-creeper-normal.jpg")]
		private static const Normal:Class;
		[Embed(source="photosculpt-creeper-detail.jpg")]
		private static const Detail:Class;
		
		public static const _name:String = "Creeper";
		public static const instance:ITexture = new Creeper();
		
		private static const _diffuse:Bitmap = new Diffuse();
		private static const _normal:Bitmap = new Normal();
		private static const _detail:Bitmap = new Detail();
		
		public function get name():String {
			return _name;
		}
		
		public function getDiffuse(useCache:Boolean = true):Bitmap {
			if (useCache) {
				return _diffuse;
			} else {
				return new Diffuse();
			}
		}
		
		public function getNormal(useCache:Boolean = true):Bitmap {
			if (useCache) {
				return _normal;
			} else {
				return new Normal();
			}
		}
		
		public function getDetail(useCache:Boolean = true):Bitmap {
			if (useCache) {
				return _detail;
			} else {
				return new Detail();
			}
		}
	}

}