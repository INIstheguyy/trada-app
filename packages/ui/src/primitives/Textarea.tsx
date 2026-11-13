import type { TextareaHTMLAttributes } from 'react';

export function Textarea({
  className = '',
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={`sd-textarea ${className}`} {...props} />;
}
