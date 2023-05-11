type TNavStatus = {
  isActive: boolean;
  isPending: boolean;
};
function getNavLinkClass({ isActive }: TNavStatus): string {
  const activeClasses =
    "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium";
  const inactiveClasses =
    "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium";
  return isActive ? activeClasses : inactiveClasses;
}

export { getNavLinkClass };
