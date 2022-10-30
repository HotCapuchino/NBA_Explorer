import { Box, Typography } from '@mui/material';
import React from 'react';
import { classNames } from 'src/helpers/classnames';

interface LabelValueProps extends AbstractComponentProps {
    label: React.ReactNode;
}

const LabelValue: React.FC<LabelValueProps> = (props) => {
    const {label, children, className} = props;

    return (
        <Box className={classNames('label-value-block', className)}>
            <Box className='key-value-block--label'>
                {typeof label === 'string' ? <Typography>{label}</Typography> : label}
            </Box>
            <Box className='key-value-block--value'>
                {children}
            </Box>
        </Box>
    )
}

export default LabelValue;