import { Box } from '@mui/material';
import React from 'react';
import { classNames } from 'src/helpers/classnames';
import Header from '../components/Header';
import './styles';

interface PageLayoutProps extends AbstractComponentProps {
    title?: React.ReactNode | React.ReactElement;
    hasHeader?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = (props) => {
    const {title, hasHeader = false, children} = props;

    return (
        <Box className={classNames(props.className, 'page')}>
            {hasHeader && <Header/>}
            {title && <Box className='page-title-container'>{title}</Box>}
            <Box className='page-content'>{children}</Box>
        </Box>
    );
}

export default PageLayout;