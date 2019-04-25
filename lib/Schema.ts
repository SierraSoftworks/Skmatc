import {GeoJSON} from "./types/GeoJSON";
import {BSONTypes} from "./types/BSON";

export interface Query<T> {
    $eq?: T;
    $gt?: string|number|Date;
    $gte?: string|number|Date;
    $in?: T[];
    $lt?: string|number|Date;
    $lte?: string|number|Date;
    $ne?: T;
    $nin?: T[];

    $and?: Query<T>[];
    $not?: Query<T>;
    $nor?: Query<T>[];
    $or?: Query<T>[];

    $exists?: boolean;
    $type?: BSONTypes;

    $mod?: number;
    $regex?: RegExp;

    $geoIntersects?: GeoJSON;
    $geoWithin?: GeoJSON;
}

export type Schema<T> = Query<T> | { [k: string]: Query<T[keyof T]>; }