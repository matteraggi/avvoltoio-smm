import { ISqueal } from "./squeal.model";
import { ISquealCat } from "./squeal-cat.model";
import { ISquealViews } from "./squeal-views.model";
import { IGeolocationCoordinates } from "./geoloc.model";

export interface ISquealDTO {
  squeal?: ISqueal;
  category?: ISquealCat;
  reactions?: IReactionDTO[];
  reaction_number?: number;
  comments_number?: number;
  views?: ISquealViews;
  userName?: string;
  active_reaction?: string | null | undefined;
  geoLoc?: IGeolocationCoordinates;
}
export interface IDirectDTO {
  user?: string;
  body?: string;
}
export interface IReactionDTO {
  reaction: string;
  number: number;
  user: boolean;
}
