import styled from 'styled-components';

export const HeaderBar = styled.div`
    width: 100%;
    border-bottom: 4px solid;
    border-color: #d4bd1b;
    background: #6d37af;
`;

export const HeaderContent = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #ffffff;
`;

export const HeaderLogo = styled.span`
    background: #f2f2f2;
    color: #823dd5;
    padding: 5px 10px;
    font-weight: 600;
    border-radius: 4px;
    height: 32px;
    display: block;
`;

export const HeaderMenu = styled.ul`
    > li {
        display: inline-block;
        margin-left: 10px;
        > a {
            cursor: pointer;
            font-weight: 600;
            color: #f2f2f2;
            :hover {
                opacity: 0.8;
            }
        }
    }
`;
