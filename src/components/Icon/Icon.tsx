import { memo } from 'react';
import { IconProps } from './types';
import { iconsConfig } from './icons-config';

const Icon: React.FC<IconProps> = ({ name, ...rest }) => {
    const Icon = iconsConfig[name];

    if (!Icon) {
        return null;
    }

    return <Icon name={name} {...rest} />;
};

export default memo(Icon);