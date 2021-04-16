import './style/App.css';
import './components/ToggleHeader/ToggleHeader';
import TabPage from "./tabPage/TabPage";
import {Grid} from "@material-ui/core";
import {ThemeProvider} from '@material-ui/core/styles';
import triumfTheme from './style/triumfTheme'
import AppHeader from "./components/AppHeader/AppHeader";


function App() {
    const theme = triumfTheme();
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <Grid container alignItems='flex-start' direction='column'>
                    <AppHeader/>
                    <TabPage/>
                </Grid>
            </ThemeProvider>
        </div>
    );
}

export default App;
