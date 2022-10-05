import React from 'react';
import Header from '../components/Header';

interface PageLayoutProps extends AbstractComponentProps {
    title?: React.ReactNode | React.ReactElement;
    hasHeader?: boolean;
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