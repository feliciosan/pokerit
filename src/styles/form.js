import styled from 'styled-components';
import { Loading } from './components';

export const FormSignInUp = styled.form`
    background: #f2f2f2;
    max-width: 450px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 15vh;
    padding: 40px;
    border-radius: 4px;
    padding: 40px;
    box-shadow: 0px 5px 30px 5px #6b2cb7;
    ${Loading} {
        margin-bottom: 30px;
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
`;

export const FormGroup = styled.div`
    margin-bottom: 20px;
`;

export const FeaturedText = styled.span`
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
