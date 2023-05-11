type THeaderProps = {
  title: string;
  children?: React.ReactElement;
};
function Header({ title, children }: THeaderProps) {
  return (
    <header className="mx-auto max-w-7xl px-4 py-1 pb-6 sm:px-6 lg:px-8">
      {title && (
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          {title}
        </h1>
      )}
      {children}
    </header>
  );
}

export default Header;
