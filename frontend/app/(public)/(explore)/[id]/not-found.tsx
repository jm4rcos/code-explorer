import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h1>404 - The Page Does Not Exist</h1>
      <p>We can't find the page you're looking for.</p>
      <Link href="/">Go Back</Link>
    </div>
  );
}
