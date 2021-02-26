import './App.css';
import './components/ToggleHeader/ToggleHeader';
import TabPage from "./pages/tabPage/TabPage";
import {Grid} from "@material-ui/core";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Grid container alignItems='flex-start' direction='column'>

                    <TabPage/>
                </Grid>
            </header>
        </div>
    );
}

export default App;
