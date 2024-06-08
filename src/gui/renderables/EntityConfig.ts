import { Polygon, Line, Ellipse, Rect } from 'melonjs';

export interface EntityConfig {
  width: number;
  height: number;
  name?: string;
  id?: string;
  image?: string | (new (width?: number, height?: number) => HTMLImageElement);
  anchorPoint?: any;
  framewidth?: number;
  frameheight?: number;
  type?: string;
  collisionMask?: number;
  shapes?: Polygon[] | Line[] | Ellipse[] | Rect[];
}
