import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
    max-width: 1280px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 20px;
    padding-right: 20px;
`;

export const PageHeader = styled.div`
    width: 100%;
    height: 110px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e2e2e2;
`;

export const PageTitle = styled.h1`
    font-size: 35px;
`;

const LdsDualRing = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

export const Loading = styled.div`
    width: 48px;
    height: 48px;
    margin-left: auto;
    margin-right: auto;
    display: block;
    margin-top: ${(props) => (props.isPageLoading ? '40vh' : 0)};
    :after {
        content: ' ';
        display: block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 4px solid #6d37af;
        border-color: #6d37af transparent #6d37af transparent;
        animation: ${LdsDualRing} 1.2s linear infinite;
    }
`;
