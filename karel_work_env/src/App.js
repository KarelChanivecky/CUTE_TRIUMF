import './App.css';
import './components/ToggleHeader/ToggleHeader';
import TabPage from "./pages/tabPage/TabPage";
import {ThemeProvider} from '@material-ui/core/styles';
import triumfTheme from './style/triumfTheme'
import AppHeader from "./components/AppHeader/AppHeader";


function App() {
    const theme = triumfTheme();
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <AppHeader height={0.07}/>
                <TabPage height={0.93}/>
            </ThemeProvider>
        </div>
    );
}

export default App;
