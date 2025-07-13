import { useRouteError } from '@tanstack/react-router';

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div>
      <h1>Something went wrong!</h1>
      <p>{error?.message || 'An unexpected error occurred'}</p>
    </div>
  );
}
