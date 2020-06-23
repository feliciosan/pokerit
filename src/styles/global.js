import styled, { createGlobalStyle, keyframes } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Hind', sans-serif;
    }

    h1, h2, h3, h4, h5, h6, p, strong, span, a, label {
        color: #4a5291;
    }

    html {
        height: 100%;
    }

    body {
        background: ${(props) =>
            ['signin', 'signup'].includes(props.currentRoute)
                ? 'linear-gradient(110deg, #6d37af 50%, #7741b9 50%)'
                : '#f2f2f2'};
    }

    a {
        text-decoration: none;
    }

    hr {
        border-top: 0;
        border-left: 0;
        border-right: 0;
        border-width: 1px;
        margin-bottom: 20px;
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
`;

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
