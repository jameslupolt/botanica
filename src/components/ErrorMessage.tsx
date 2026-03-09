interface ErrorMessageProps {
  message: string;
  variant?: 'banner' | 'inline';
}

export function ErrorMessage({ message, variant = 'inline' }: ErrorMessageProps) {
  if (variant === 'banner') {
    return (
      <div role="alert" className="border-b border-petal-200 bg-petal-50">
        <div className="mx-auto max-w-6xl px-4 py-2 text-sm text-petal-800">
          {message}
        </div>
      </div>
    );
  }

  return (
    <p role="alert" className="rounded-xl border border-petal-200 bg-petal-50 px-3 py-2 text-sm text-petal-800">
      {message}
    </p>
  );
}
