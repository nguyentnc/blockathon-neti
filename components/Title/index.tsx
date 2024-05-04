import Link from 'next/link';
import { Fragment, FunctionComponent, PropsWithChildren } from 'react';
import { Button } from '../Button';
import Icon from '../Icon';
import { cn } from '@/lib/utils';

interface TitleProps {
  moreAction?: {
    href?: string;
    icon?: string;
    title?: string;
    onClick?: () => void;
    className?: {
      link?: string;
      icon?: string;
      title?: string;
      button?: string;
    };
  };
  className?: string;
}

const Title: FunctionComponent<PropsWithChildren<TitleProps>> = ({
  children,
  className,
  moreAction,
}) => {
  const renderTitleMoreAction = () => {
    if (!moreAction?.title) return <Fragment />;

    return (
      <span className={cn('mr-1 text-lg font-medium', moreAction?.className?.title)}>
        {moreAction.title}
      </span>
    );
  };
  const renderMoreAction = () => {
    if (!moreAction) {
      return <Fragment />;
    }

    const { icon, className, href, onClick = () => null } = moreAction;

    if (href) {
      return (
        <Link href={href} className={className?.link}>
          <Button onClick={onClick} className={cn('font-semibold', className?.button)}>
            {renderTitleMoreAction()}
            <Icon
              name={icon ?? 'arrow_right'}
              className={cn('text-2xl font-medium', className?.icon)}
            />
          </Button>
        </Link>
      );
    }

    return (
      <Button onClick={onClick} variant="ghost">
        {renderTitleMoreAction()}
        <Icon
          name={icon ?? 'arrow_right'}
          className={cn('text-2xl font-medium', className?.icon)}
        />
      </Button>
    );
  };

  return (
    <div className={cn('flex items-center justify-between', className)}>
      {children}
      {renderMoreAction()}
    </div>
  );
};

export default Title;
