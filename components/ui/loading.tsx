interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
}

export function Loading({ message = 'Loading...', fullScreen = false }: LoadingProps) {
  const content = (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      {message && <p className="text-muted-foreground">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm">
        <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
          {content}
        </div>
      </div>
    );
  }

  return content;
}
