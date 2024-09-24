import { Snippet } from '@/interfaces/snippet';
import {
  MessageCircleIcon,
  ScanEyeIcon,
  ThumbsUpIcon,
  User2Icon,
} from 'lucide-react';
import { timeAgo } from './time-ago';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

interface SnippetItemProps {
  snippet: Snippet;
}

export const SnippetItem = ({ snippet }: SnippetItemProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleSnippetClick = () => {
    let redirectPath;
    if (pathname.startsWith('/snippets')) {
      // Se estamos na página de snippets, usamos a rota protegida
      redirectPath = `/snippets/${snippet.id}`;
    } else {
      // Caso contrário, usamos a rota não protegida
      redirectPath = `/${snippet.id}`;
    }
    router.push(redirectPath);
  };

  return (
    <div
      onClick={handleSnippetClick}
      className="flex cursor-pointer hover:bg-background lg:px-8 px-8 hover:border-secondary flex-col w-full py-3 transition-colors duration-200"
    >
      <div className="flex items-center justify-between">
        {snippet.technology?.name ? (
          <div className="flex items-center space-x-2">
            <Image
              src={snippet.technology.image}
              alt={snippet.technology.name}
              width={16}
              height={16}
            />
            <p className="text-base">{snippet.technology?.name}</p>
          </div>
        ) : (
          <p className="text-sm">Post</p>
        )}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-text">
            {pathname.startsWith('/snippets')
              ? `Created ${timeAgo(snippet.createdAt)}`
              : `Last updated ${timeAgo(snippet.updatedAt)}`}
          </span>
          {!pathname.startsWith('/snippets') && (
            <div className="flex items-center justify-center p-1.5 rounded-full border">
              <User2Icon color="var(--text)" className="h-4 w-4" />
            </div>
          )}
        </div>
      </div>
      <div>
        <h3 className="text-lg">{snippet.title}</h3>
      </div>

      <div className="flex mt-1.5 items-center space-x-2">
        <div className="text-text hover:text-title flex items-center space-x-1.5">
          <ThumbsUpIcon className="w-4 h-4" />
          <span>0</span>
        </div>
        <div className="text-text hover:text-title flex items-center space-x-1.5">
          <ScanEyeIcon className="w-4 h-4" />
          <span>0</span>
        </div>
        <div className="text-text hover:text-title flex items-center space-x-1">
          <MessageCircleIcon className="w-4 h-4" />
          <span>{snippet.comments?.length || 0}</span>
        </div>
      </div>
    </div>
  );
};
