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

    @media (max-width: 600px) {
        align-items: baseline;
        flex-direction: column;
        padding: 20px 0;
        height: auto;
    }
`;

export const PageTitle = styled.h1`
    font-size: 35px;

    @media (max-width: 600px) {
        font-size: 25px;
    }
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
    margin-top: ${(props) =>
        props.isPageLoading ? '40vh' : props.marginTop ? props.marginTop : 0};
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

export const FormSignInUp = styled.form`
    background: white;
    max-width: 450px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 15vh;
    padding: 40px;
    padding: 40px;
    border: 1px solid #6d37af;
    border-bottom-width: 4px;
    border-bottom-color: #d4bd1b;
    border-radius: 4px;
    ${Loading} {
        margin-bottom: 30px;
    }

    @media (max-width: 600px) {
        padding: 20px;
        margin-top: 25px;
    }
`;

export const FormTitle = styled.strong`
    display: block;
    margin-bottom: 30px;
    text-align: center;
    font-size: 28px;
    height: 48px;
    padding-top: 10px;
`;

export const Input = styled.input`
    height: 50px;
    padding: 0 15px;
    border: 1px solid #4a5291;
    border-radius: 4px;
    background: transparent;
    box-shadow: none;
    width: 100%;
    color: #4a5291;
    font-size: 15px;
    :focus {
        outline: none;
        box-shadow: none;
    }
    &::-webkit-input-placeholder {
        color: #4a5291;
    }
`;

export const Select = styled.select`
    height: 50px;
    padding: 0 15px;
    border: 1px solid #4a5291;
    border-radius: 4px;
    background: transparent;
    box-shadow: none;
    width: 100%;
    color: #4a5291;
    font-size: 15px;
    :focus {
        outline: none;
        box-shadow: none;
    }
`;

const getPropColors = (color) => {
    const colors = {
        purple: '#6d37af',
        lightPurple: '#7741b9',
        yellow: '#d4bd1b',
    };

    return colors[color] || '#19a3d4';
};

export const Button = styled.button`
    height: ${(props) => (props.small ? '32px' : '50px')};
    border-radius: 4px;
    background: ${(props) => getPropColors(props.color)};
    width: 100%;
    color: #f2f2f2;
    font-weight: 600;
    border: none;
    font-size: 15px;
    padding: 5px 15px;
    cursor: pointer;
    :hover,
    :focus {
        outline: none;
        box-shadow: none;
        opacity: 0.8;
    }
    :disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

export const FormGroup = styled.div`
    margin-bottom: 20px;
    position: relative;
`;

export const SmallText = styled.span`
    font-size: 13px;
`;

export const FormAlert = styled.div`
    background: ${(props) => (props.type === 'danger' ? '#da5a5a' : '#68b968')};
    padding: 15px 20px;
    margin-bottom: 20px;
    border-radius: 4px;
    line-height: 20px;
    color: #f2f2f2;
`;
