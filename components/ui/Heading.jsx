export default function Heading({ level = 2, children, className = "" }) {
  const Tag = `h${level}`;
  const sizes = {
    1: "text-3xl sm:text-5xl font-extrabold",
    2: "text-2xl sm:text-3xl font-bold",
    3: "text-xl sm:text-2xl font-semibold",
  };
  const size = sizes[level] || sizes[2];
  return <Tag className={`${size} tracking-tight ${className}`}>{children}</Tag>;
}

