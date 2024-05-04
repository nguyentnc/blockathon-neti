import { cn } from '@/lib/utils';
import { FunctionComponent } from 'react';

interface IconProps {
  name: string;
  className?: string;
}

const Icon: FunctionComponent<IconProps> = ({ name, className }) => {
  return <span className={cn(className, )} />;
};

export default Icon;
