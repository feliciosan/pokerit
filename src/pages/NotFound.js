import React from 'react';
import { Container, PageHeader, PageTitle } from '../styles/components';

const NotFound = () => {
    return (
        <Container>
            <PageHeader>
                <div>
                    <PageTitle>Page not found!</PageTitle>
                </div>
            </PageHeader>
        </Container>
    );
};

export default NotFound;
