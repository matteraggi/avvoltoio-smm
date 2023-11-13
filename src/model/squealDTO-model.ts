import { ISqueal } from "./squeal.model";
import { ISquealCat } from "./squeal-cat.mdel";
import { ISquealViews } from "./squeal-views.model";

export interface ISquealDTO {
  squeal?: ISqueal;
  category?: ISquealCat;
  reactions?: IReactionDTO[];
  reaction_number?: number;
  views?: ISquealViews;
  userName?: string;
  active_reaction?: string | null | undefined;
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
