import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, green } from '@material-ui/core/colors';
import {useState, useEffect} from 'react'
import axios from 'axios'

function valveState(state){
    if(state == "1"){
        return '#008000'
    }
    else{
        return '#FF0000'
    }
  }
  
  function scaleTemp(temp){
    let T = parseFloat(temp);
    if(T < 1.0){
      return (T*1e3).toPrecision(4)+' mK';
    }
  
    return T.toPrecision(4)+' K';
  }

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: '20ch',
      maxHeight: '99vh',
      overflow: 'auto',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
    _0: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
    _1: {
      color: theme.palette.getContrastText(green[500]),
      backgroundColor: green[500],
    },
  }));
  
  export default function AlignItemsList() {
    const classes = useStyles();
  
    const [data, setData] = useState({"Time":"2021-02-18 00:36:40","Pumping turbo speed":" 0.00","P1":"2.35394","K3":" 389.4","K4":"   5.5","FLOW":" -0.0","K5":"  -0.0","K6":" 881.7","PT 100 Bidon C":"  23.2","P\/T":"89.618","K8":"  10.6","K10":"   0.5","P2":"1155.79700","P3":"1300","BM - MC":"  0.0000","LAST RUN":"  0.0000","RuO2 MC":"  0.00000","RuO2 CP":"  0.00000","Cernox STILL":"  0.00000","Cernoc MC":"  0.00000","4K STAGE":"  0.00000","60K STAGE":"  0.00000","dffsf":"  0.00000","Still bottom":"  0.00000","MC bottom":"  0.00000","R MMR1 1":"     0.000","R MMR1 2":"     0.000","R MMR1 3":"     0.000","R MMR2 1":"     0.000","R MMR2 2":"     0.000","R MMR2 3":"     0.000","R MMR3 1":"     0.000","R MMR3 2":"     0.000","R MMR3 3":"     0.000","VE1":"1","VE2":"1","VE3":"0","VE4":"0","VE5":"0","VE6":"0","VE7":"0","VE8":"0","VE9":"0","VE10":"0","VE11":"0","VE12":"0","VE13":"0","VE14":"0","VE15":"0","VE16":"0","VE17":"0","VE18":"0","VE19":"0","VE20":"0","VE21":"0","VE22":"0","VE23":"0","VE24":"0","VE25":"0","VE26":"0","VE27":"0","VE28":"0","VE29":"0","VE30":"0","VE31":"0","VE32":"0","VE33":"0","VE34":"0","VE35":"0","VE36":"0","VE37":"0","VE38":"0","VE39":"0","PP pomp":"0","comp":"0","PP aux":"0","Turbo AUX":"0","PT":"0","turbo Pomp":"0","mot7":"0","mot8":"0","mot9":"0"})
  
    // const [posts, setPosts]=useState([]) 'https://jsonplaceholder.typicode.com/posts'
    const getData = async () => {
    try {
      const fridge = await axios.get("https://cdms-webapp.slac.stanford.edu/www/cute/fridge/status.php")
      setData(fridge.data);  // set State
    
    } catch (err) {
      console.error(err.message);
      }
    };
    
    useEffect(()=>{
      getData()
  
      const interval=setInterval(()=>{
        getData()
       },10000)
           
        return()=>clearInterval(interval)
      },[])  // includes empty dependency array
  
    return (
      <List className={classes.root}>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex">
          <ListItemAvatar>
            <Avatar alt="V" src="tar/1.jpg" className={classes['_'+parseFloat(data.VE1)]} />
          </ListItemAvatar>
          <ListItemText
            primary="Valve 1"
          />
        </ListItem>
  
        <Divider variant="inset" component="li" />
        
        <ListItem alignItems="flex">
          <ListItemAvatar>
            <Avatar alt="V" src="tar/2.jpg" className={classes['_'+parseFloat(data.VE2)]} />
          </ListItemAvatar>
          <ListItemText
            primary="Valve 2"
          />
        </ListItem>
  
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex">
          <ListItemAvatar>
            <Avatar alt="V" src="tar/1.jpg" className={classes['_'+parseFloat(data.VE3)]} />
          </ListItemAvatar>
          <ListItemText
            primary="Valve 3"
          />
        </ListItem>
  
        <Divider variant="inset" component="li" />
        
        <ListItem alignItems="flex">
          <ListItemAvatar>
            <Avatar alt="V" src="tar/2.jpg" className={classes['_'+parseFloat(data.VE5)]} />
          </ListItemAvatar>
          <ListItemText
            primary="Valve 5"
          />
        </ListItem>
  
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex">
          <ListItemAvatar>
            <Avatar alt="V" src="tar/1.jpg" className={classes['_'+parseFloat(data.VE6)]} />
          </ListItemAvatar>
          <ListItemText
            primary="Valve 6"
          />
        </ListItem>
  
        <Divider variant="inset" component="li" />
        
        <ListItem alignItems="flex">
          <ListItemAvatar>
            <Avatar alt="V" src="tar/2.jpg" className={classes['_'+parseFloat(data.VE7)]} />
          </ListItemAvatar>
          <ListItemText
            primary="Valve 7"
          />
        </ListItem>
  
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex">
          <ListItemAvatar>
            <Avatar alt="V" src="tar/1.jpg" className={classes['_'+parseFloat(data.VE8)]} />
          </ListItemAvatar>
          <ListItemText
            primary="Valve 8"
          />
        </ListItem>
  
        <Divider variant="inset" component="li" />
        
        <ListItem alignItems="flex">
          <ListItemAvatar>
            <Avatar alt="V" src="tar/2.jpg" className={classes['_'+parseFloat(data.VE9)]} />
          </ListItemAvatar>
          <ListItemText
            primary="Valve 9"
          />
        </ListItem>
  
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex">
          <ListItemAvatar>
            <Avatar alt="V" src="tar/1.jpg" className={classes['_'+parseFloat(data.VE12)]} />
          </ListItemAvatar>
          <ListItemText
            primary="Valve 12"
          />
        </ListItem>
  
        <Divider variant="inset" component="li" />
        
        <ListItem alignItems="flex">
          <ListItemAvatar>
            <Avatar alt="V" src="tar/2.jpg" className={classes['_'+parseFloat(data.VE13)]} />
          </ListItemAvatar>
          <ListItemText
            primary="Valve 13"
          />
        </ListItem>
  
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex">
          <ListItemAvatar>
            <Avatar alt="V" src="tar/1.jpg" className={classes['_'+parseFloat(data.VE14)]} />
          </ListItemAvatar>
          <ListItemText
            primary="Valve 14"
          />
        </ListItem>
  
        <Divider variant="inset" component="li" />
        
        <ListItem alignItems="flex">
          <ListItemAvatar>
            <Avatar alt="V" src="tar/2.jpg" className={classes['_'+parseFloat(data.VE16)]} />
          </ListItemAvatar>
          <ListItemText
            primary="Valve 16"
          />
        </ListItem>
  
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex">
          <ListItemAvatar>
            <Avatar alt="V" src="tar/1.jpg" className={classes['_'+parseFloat(data.VE17)]} />
          </ListItemAvatar>
          <ListItemText
            primary="Valve 17"
          />
        </ListItem>
  
        <Divider variant="inset" component="li" />
        
        <ListItem alignItems="flex">
          <ListItemAvatar>
            <Avatar alt="V" src="tar/2.jpg" className={classes['_'+parseFloat(data.VE22)]} />
          </ListItemAvatar>
          <ListItemText
            primary="Valve 22"
          />
        </ListItem>
  
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex">
          <ListItemAvatar>
            <Avatar alt="V" src="tar/1.jpg" className={classes['_'+parseFloat(data.VE23)]} />
          </ListItemAvatar>
          <ListItemText
            primary="Valve 23"
          />
        </ListItem>
  
        <Divider variant="inset" component="li" />
        
        <ListItem alignItems="flex">
          <ListItemAvatar>
            <Avatar alt="V" src="tar/2.jpg" className={classes['_'+parseFloat(data.VE25)]} />
          </ListItemAvatar>
          <ListItemText
            primary="Valve 25"
          />
        </ListItem>
  
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex">
          <ListItemAvatar>
            <Avatar alt="V" src="tar/1.jpg" className={classes['_'+parseFloat(data.VE26)]} />
          </ListItemAvatar>
          <ListItemText
            primary="Valve 26"
          />
        </ListItem>
  
        <Divider variant="inset" component="li" />
        
        <ListItem alignItems="flex">
          <ListItemAvatar>
            <Avatar alt="V" src="tar/2.jpg" className={classes['_'+parseFloat(data.VE27)]} />
          </ListItemAvatar>
          <ListItemText
            primary="Valve 27"
          />
        </ListItem>
  
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex">
          <ListItemAvatar>
            <Avatar alt="V" src="tar/1.jpg" className={classes['_'+parseFloat(data.VE28)]} />
          </ListItemAvatar>
          <ListItemText
            primary="Valve 28"
          />
        </ListItem>
  
        <Divider variant="inset" component="li" />
        
        <ListItem alignItems="flex">
          <ListItemAvatar>
            <Avatar alt="V" src="tar/2.jpg" className={classes['_'+parseFloat(data.VE30)]} />
          </ListItemAvatar>
          <ListItemText
            primary="Valve 30"
          />
        </ListItem>
  
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex">
          <ListItemAvatar>
            <Avatar alt="V" src="tar/1.jpg" className={classes['_'+parseFloat(data.VE31)]} />
          </ListItemAvatar>
          <ListItemText
            primary="Valve 31"
          />
        </ListItem>
  
        <Divider variant="inset" component="li" />
        
        <ListItem alignItems="flex">
          <ListItemAvatar>
            <Avatar alt="V" src="tar/2.jpg" className={classes['_'+parseFloat(data.VE32)]} />
          </ListItemAvatar>
          <ListItemText
            primary="Valve 32"
          />
        </ListItem>
  
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex">
          <ListItemAvatar>
            <Avatar alt="V" src="tar/1.jpg" className={classes['_'+parseFloat(data.VE33)]} />
          </ListItemAvatar>
          <ListItemText
            primary="Valve 33"
          />
        </ListItem>
  
        <Divider variant="inset" component="li" />
        
        <ListItem alignItems="flex">
          <ListItemAvatar>
            <Avatar alt="V" src="tar/2.jpg" className={classes['_'+parseFloat(data.VE37)]} />
          </ListItemAvatar>
          <ListItemText
            primary="Valve 37"
          />
        </ListItem>
        
      </List>
    );
  }