import { ChannelTypes } from './channel-types.model';
import { ISqueal } from './squeal.model';

export interface ISquealDestination {
  destination?: string | null;
  destination_id?: string | null;
  seen?: boolean | null;
  destination_type?: keyof typeof ChannelTypes | null;
  admin_add?: boolean | null;
  squeal?: Pick<ISqueal, '_id'> | null;
}
