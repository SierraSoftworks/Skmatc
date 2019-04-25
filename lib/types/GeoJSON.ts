
export type GeoJSON = 
GeoJSONPoint
| GeoJSONLineString
| GeoJSONPolygon
| GeoJSONMultiPoint
| GeoJSONMultiLineString
| GeoJSONMultiPolygon;

export interface GeoJSONPoint {
type: "Point";
coordinates: [number, number];
}

export interface GeoJSONLineString {
type: "LineString";
coordinates: [number, number][];
}

export interface GeoJSONPolygon {
type: "Polygon";
coordinates: [number, number][][];
}

export interface GeoJSONMultiPoint {
type: "MultiPoint";
coordinates: [number, number][];
}

export interface GeoJSONMultiLineString {
type: "MultiLineString";
coordinates: [number, number][][];
}

export interface GeoJSONMultiPolygon {
type: "MultiPolygon";
coordinates: [number, number][][][];
}