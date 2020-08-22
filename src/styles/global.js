import { createGlobalStyle } from 'styled-components';

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
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background: ${(props) =>
            ['signin', 'signup', 'recover-password'].includes(
                props.currentRoute
            )
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
