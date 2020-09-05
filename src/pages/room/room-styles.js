import styled from 'styled-components';
import { Button } from '../../styles/default/default';

export const PageHeaderActions = styled.div`
    display: flex;
    width: 330px;
    ${Button} {
        flex: 1;
        margin-left: 15px;
    }

    @media (max-width: 600px) {
        width: 100%;
        margin-top: 5px;
    }
`;

export const IconButton = styled.div`
    height: 50px;
    width: 50px;
    font-size: 30px;
    color: ${(props) => (props.copied ? '#68b968' : '#bdbdbd')};
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    :hover {
        background: #ececec;
    }
`;

export const PokerBox = styled.div`
    display: flex;
    margin-top: 25px;

    @media (max-width: 600px) {
        flex-direction: column;
    }
`;

export const PokerPanel = styled.div`
    flex: 0.8;
    padding-left: 10px;
    padding-right: 10px;
    background: #f7f7f7;
    border-radius: 4px;
    padding-top: 20px;

    @media (max-width: 600px) {
        padding: 15px 7.5px;
        flex: 1;
    }
`;

export const PokerList = styled(PokerPanel)`
    margin-left: 25px;
    background: #f7f7f7;
    border-radius: 4px;
    padding: 20px;
    flex: 1.2;

    @media (max-width: 600px) {
        margin-left: 0;
        margin-top: 20px;
        flex: 1;
        padding: 15px;
        margin-bottom: 20px;
    }
`;

export const ActiveButton = styled(Button)`
    background: ${(props) => (props.active ? '#68b968' : '#bdbdbd')};
    width: 85px;
    position: relative;
    margin-left: 10px;
`;

export const ActiveButtonIcon = styled.span`
    height: 22px;
    width: 22px;
    background: #f2f2f2;
    position: absolute;
    left: -10px;
    border-radius: 3px;
    border: 2px solid ${(props) => (props.active ? '#68b968' : '#bdbdbd')};
    top: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #68b968;
`;
