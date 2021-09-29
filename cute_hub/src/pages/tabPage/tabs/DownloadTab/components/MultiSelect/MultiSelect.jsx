import {React, useState} from "react";
import {makeStyles, useTheme} from '@material-ui/core/styles';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Select from "@material-ui/core/Select";

//database tables that we want to query from
const tables = ["fridge", "facility", "peltier", "compressor"];

//styles
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 500,
    maxWidth: 750,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

export default function MultipleSelect(props){

    const classes = useStyles();
    const [keys, setKeys] = useState([]);

    const handleChange = (event) => {
        //here the event.target.value is the list of checked keys from the props.list
        //these keys are added to the keys state and to the dictionary that is passed in above by props.oncheck
        //when the keys are rendered we need to map them back into the props.list dictionary so they display as we want
        //console.log(event.target.value);
        setKeys(event.target.value);

        //add the keys to the dictionary passed in by props
        props.oncheck(props.label,event.target.value);
    }

    return (
        <div>
            <FormControl className={classes.formControl}> 
                <InputLabel id="multi-select-label">{props.label}</InputLabel>
                <Select
                  labelId="multi-select-label"
                  id="multi-select"
                  multiple
                  value={keys}
                  onChange={handleChange}
                  input={<Input />}
                  renderValue={(selected) => selected.map(x=>props.list[x]).join(", ")}
                >

                {Object.entries(props.list).map((el) => (
                    <MenuItem key={el[0]} value={el[0]}>
                      <Checkbox checked={keys.indexOf(el[0]) > -1} />
                      <ListItemText primary={el[1]} />
                    </MenuItem>
                  ))}

                </Select>
            </FormControl> 
        </div>
    );

}
