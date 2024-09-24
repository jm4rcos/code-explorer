import { RatIcon, ScanEyeIcon, ThumbsUpIcon } from 'lucide-react';
import { HeartIcon } from './icons/heart-icon';

export const SnippetCard = () => {
  return (
    <div className="flex cursor-pointer hover:bg-[var(--secondary50)] hover:border-secondary flex-col bg-muted gap-2 max-w-72 border-2 p-3 rounded-2xl transition-colors duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <RatIcon className="w-4 h-4 text-danger" />
          <p className="text-base">Nest</p>
        </div>
        <HeartIcon color="var(--text)" />
      </div>
      <div>
        <h3 className="text-lg">Mastering NestJS Decorators</h3>
        <p>Unlock the power of metadata with custom decorators in NestJS</p>
      </div>

      <div className="flex items-center space-x-2">
        <ThumbsUpIcon color="var(--text)" />
        <span>0</span>
        <ScanEyeIcon color="var(--text)" />
        <span>0</span>
      </div>
    </div>
  );
};
