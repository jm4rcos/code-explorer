-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_snippetId_fkey";

-- DropForeignKey
ALTER TABLE "Snippet" DROP CONSTRAINT "Snippet_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "Snippet" DROP CONSTRAINT "Snippet_technologyId_fkey";

-- DropForeignKey
ALTER TABLE "SnippetLike" DROP CONSTRAINT "SnippetLike_snippetId_fkey";

-- DropForeignKey
ALTER TABLE "SnippetLike" DROP CONSTRAINT "SnippetLike_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserFavoriteSnippet" DROP CONSTRAINT "UserFavoriteSnippet_snippetId_fkey";

-- DropForeignKey
ALTER TABLE "UserFavoriteSnippet" DROP CONSTRAINT "UserFavoriteSnippet_userId_fkey";

-- AlterTable
ALTER TABLE "Snippet" ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "title" SET DEFAULT 'Untitled';

-- AddForeignKey
ALTER TABLE "Snippet" ADD CONSTRAINT "Snippet_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Snippet" ADD CONSTRAINT "Snippet_technologyId_fkey" FOREIGN KEY ("technologyId") REFERENCES "Technology"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavoriteSnippet" ADD CONSTRAINT "UserFavoriteSnippet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavoriteSnippet" ADD CONSTRAINT "UserFavoriteSnippet_snippetId_fkey" FOREIGN KEY ("snippetId") REFERENCES "Snippet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SnippetLike" ADD CONSTRAINT "SnippetLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SnippetLike" ADD CONSTRAINT "SnippetLike_snippetId_fkey" FOREIGN KEY ("snippetId") REFERENCES "Snippet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_snippetId_fkey" FOREIGN KEY ("snippetId") REFERENCES "Snippet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
