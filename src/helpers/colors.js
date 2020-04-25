import { makeStyles } from '@material-ui/core/styles';
import { blueGrey, pink } from '@material-ui/core/colors';

const useColors = makeStyles(() => ({
    pinkBg: {
        backgroundColor: pink[700],
    },
    pink: {
        color: pink[700],
    },
    blueGreyBg: {
        backgroundColor: blueGrey[800],
    },
    blueGrey: {
        color: blueGrey[800],
    },
}));

export default useColors;
