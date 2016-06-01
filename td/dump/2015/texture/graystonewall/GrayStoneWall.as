package avdw.texture.graystonewall {
	import avdw.texture.ITexture;
	import flash.display.Bitmap;
	
	/**
	 * ...
	 * @author Andrew van der Westhuizen
	 */
	public class GrayStoneWall implements ITexture {
		[Embed(source="photosculpt-graystonewall-diffuse.jpg")]
		private static const Diffuse:Class;
		[Embed(source="photosculpt-graystonewall-normal.jpg")]
		private static const Normal:Class;
		[Embed(source="photosculpt-graystonewall-detail.jpg")]
		private static const Detail:Class;
		
		public static const _name:String = "Gray Stone Wall";
		public static const instance:ITexture = new GrayStoneWall();

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