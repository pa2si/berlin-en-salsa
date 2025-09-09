// Since we have a root layout with [locale], this layout is required
// but just passes children through
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
