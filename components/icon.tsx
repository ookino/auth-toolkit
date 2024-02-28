import { icons } from 'lucide-react';

const Icon = ({ name }) => {
  const LucideIcon = icons[name];

  return <LucideIcon />;
};

export default Icon;
