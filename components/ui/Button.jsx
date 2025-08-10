export default function Button({ variant = "primary", className = "", ...props }) {
  const base = "inline-flex items-center justify-center rounded-md text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-70";
  const variants = {
    primary: "bg-brand-600 text-white hover:bg-brand-700 focus-visible:outline-brand-600",
    secondary:
      "border border-black/10 dark:border-white/15 bg-white/80 dark:bg-neutral-900/60 text-foreground hover:bg-white focus-visible:outline-brand-600",
    ghost: "text-foreground hover:bg-black/5 dark:hover:bg-white/10",
  };
  const classes = `${base} ${variants[variant] ?? variants.primary} ${className}`;
  return <button className={classes} {...props} />;
}

