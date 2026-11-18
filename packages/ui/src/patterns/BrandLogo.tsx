type BrandLogoProps = {
  className?: string;
  showTagline?: boolean;
  tone?: 'dark' | 'light';
};

export function BrandLogo({
  className,
  showTagline = true,
  tone = 'dark',
}: BrandLogoProps) {
  const classes = ['sd-brand-logo', `sd-brand-logo--${tone}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <span
      className={classes}
      role="img"
      aria-label={showTagline ? 'Trada — Manage. Sell. Grow.' : 'Trada'}
    >
      <svg className="sd-brand-logo__mark" viewBox="0 0 72 72" aria-hidden="true">
        <path
          className="sd-brand-logo__mark-top"
          d="M13 9.5h51.2c2.5 0 4 2.7 2.7 4.8l-7.2 12.1a7 7 0 0 1-6 3.4H37.6L22 40.6V29.8H6.9c-2.6 0-4.1-2.9-2.7-5L10.1 11a3.2 3.2 0 0 1 2.9-1.5Z"
        />
        <path
          className="sd-brand-logo__mark-accent"
          d="m22 46.4 21.1-14.7v22.8a8.3 8.3 0 0 1-4.1 7.2l-12.7 7.2c-2 1.2-4.6-.3-4.6-2.7V47l.3-.6Z"
        />
      </svg>
      <span className="sd-brand-logo__copy">
        <strong>Trada</strong>
        {showTagline && <small>Manage. Sell. Grow.</small>}
      </span>
    </span>
  );
}
