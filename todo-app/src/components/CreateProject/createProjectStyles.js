import { createMuiTheme } from '@material-ui/core/styles';

export const formTheme = createMuiTheme({
    typography: {
        h1: {
            fontSize: 48
        },
    },
    props: {
        MuiTextField: {
            variant: 'outlined',
            type: 'text'
        }
    }
});

export const styles = {
    formInput: {
        lineHeight: '75px'
    }
};