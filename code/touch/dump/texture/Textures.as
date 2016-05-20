package avdw.texture {
	import avdw.texture.autumnleaves.AutumnLeaves;
	import avdw.texture.creeper.Creeper;
	import avdw.texture.graystonewall.GrayStoneWall;
	import avdw.texture.horizontalstone.HorizontalStone;
	import avdw.texture.mixedstones.MixedStones;
	import avdw.texture.mud.Mud;
	import avdw.texture.orangestonewall.OrangeStoneWall;
	import avdw.texture.pebbles.Pebbles;
	import avdw.texture.squarebricks.SquareBricks;
	import avdw.texture.squarerock.SquareRock;
	
	/**
	 * ...
	 * @author Andrew van der Westhuizen
	 */
	public class Textures {
		private static const textures:Vector.<ITexture> = new Vector.<ITexture>();
		private static var index:int;
				
		{
			index = 0;
			textures.push(new AutumnLeaves());
			textures.push(new Creeper());
			textures.push(new GrayStoneWall());
			textures.push(new HorizontalStone());
			textures.push(new MixedStones());
			textures.push(new Mud());
			textures.push(new OrangeStoneWall());
			textures.push(new Pebbles());
			textures.push(new SquareBricks());
			textures.push(new SquareRock());
		}
		
		public static function get next():ITexture {
			index++;
			if (index >= textures.length) {
				index = 0;
			}
			return textures[index];
		}
		
		public static function get prev():ITexture {
			index--;
			if (index < 0) {
				index = textures.length - 1;
			}
			return textures[index];
		}
		
		public static function get curr():ITexture {
			return textures[index];
		}
	
	}

}