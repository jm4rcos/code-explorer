import { formatDistanceToNow } from 'date-fns';

export const timeAgo = (date: string) => {
  return formatDistanceToNow(date, { addSuffix: true });
};
