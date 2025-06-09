import * as React from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { cn } from '@/lib/utils';

// Custom theme matching shadcn UI's new-york style with slate base
const shadcnTheme = {
  plain: {
    color: 'rgb(148, 163, 184)', // slate-400
    backgroundColor: 'rgb(241, 245, 249)', // slate-100
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: {
        color: 'rgb(100, 116, 139)', // slate-500
      },
    },
    {
      types: ['punctuation'],
      style: {
        color: 'rgb(71, 85, 105)', // slate-600
      },
    },
    {
      types: ['property', 'tag', 'boolean', 'number', 'constant', 'symbol'],
      style: {
        color: 'rgb(59, 130, 246)', // blue-500
      },
    },
    {
      types: ['selector', 'attr-name', 'string', 'char', 'builtin'],
      style: {
        color: 'rgb(16, 185, 129)', // emerald-500
      },
    },
    {
      types: ['operator', 'entity', 'url', 'variable'],
      style: {
        color: 'rgb(245, 158, 11)', // amber-500
      },
    },
    {
      types: ['atrule', 'attr-value', 'keyword'],
      style: {
        color: 'rgb(139, 92, 246)', // violet-500
      },
    },
    {
      types: ['function', 'class-name'],
      style: {
        color: 'rgb(236, 72, 153)', // pink-500
      },
    },
    {
      types: ['regex', 'important'],
      style: {
        color: 'rgb(239, 68, 68)', // red-500
      },
    },
  ],
};

interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'inline' | 'block';
  language?: string;
}

function Code({
  className,
  variant = 'inline',
  language = 'javascript',
  children,
  ...props
}: CodeProps) {
  if (variant === 'inline') {
    return (
      <code
        className={cn(
          'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm break-words',
          className
        )}
        {...props}
      >
        {children}
      </code>
    );
  }

  return (
    <div className="relative rounded-lg border bg-muted w-full">
      <Highlight theme={shadcnTheme} code={children?.toString() || ''} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={cn('p-4 overflow-x-auto whitespace-pre-wrap break-words', className)}
            style={style}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}

export { Code };
