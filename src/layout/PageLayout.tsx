import React from 'react';
import Header from './Header';

interface PageLayoutProps {
    title?: React.ReactNode | React.ReactElement;
    hasHeader?: boolean;
    children?: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = (props) => {
    const {title, hasHeader = false, children} = props;

    return (
        <div className='page'>
            {hasHeader && <Header/>}
            {title && <div className='page-title-container'>{title}</div>}
            <div className='page-content'>{children}</div>
        </div>
    );
}

export default PageLayout;