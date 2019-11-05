import { createMuiTheme } from '@material-ui/core/styles';

export const taskBoardTheme = createMuiTheme({
    typography: {
        h1: {
            fontSize: 60
        },
        h2: {
            fontSize: 25,
            fontStyle: 'italic'
        }
    },
});
