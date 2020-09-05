import styled from 'styled-components';

export const DisableUserButton = styled.div`
    width: 115px;
    margin-right: 15px;
    display: none;
`;

export const List = styled.ul`
    margin: 20px 0;
    padding: 20px 0;
`;

export const ListItem = styled.li`
    border-bottom: 1px solid #e2e2e2;
    display: flex;
    padding: 10px 0 8px;
    align-items: flex-end;
`;

export const InfoItem = styled.div`
    display: flex;
    :hover {
        ${DisableUserButton} {
            display: block;
        }
    }
`;

export const ItemName = styled.p`
    flex: 1;
    font-size: 20px;
    margin-bottom: -10px;
    color: ${(props) => props.me && '#68b968'};
`;

export const ItemResult = styled.div`
    width: 32px;
    height: 32px;
    background: ${(props) =>
        props.disabled ? '#bdbdbd' : props.showResult ? '#68b968' : '#d4bd1b'};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    color: #fefefe;
    svg {
        font-size: 20px;
    }
`;
