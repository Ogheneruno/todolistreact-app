import React, {useContext} from 'react';
import { Grid } from '@material-ui/core';
import Left from '../Left';
import { makeStyles } from '@material-ui/core/styles';
import Right from '../Right';
import TodoList from '../TodoList';
import { AuthContext } from '../../context/AuthContext';





const useStyles = makeStyles((theme) => ({
    container: {
        position: 'absolute',
        // height: '95vh',
        width: '90vw',
        margin: 'auto',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backdropFilter: 'blur(5px)',
        boxShadow: '0 0 55px black',
    },

    left: {
      backgroundColor: '#222',
    },
  
    right: {
      backgroundColor: '#333',
      height: '100vh',
      overflowY: 'hidden'
    },
    
  }));


const Mainwrapper = ({children}) => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);


    return (
        <div className={classes.container}>
            <Grid container>

                {
                  user ?
                  <>
                    <Grid className={classes.left} item sm={3} xs={3}>
                      <Left />
                    </Grid>
                  </> :
                  <>
                    
                  </>
                }

                {
                  user ?
                  <>
                    <Grid className={classes.right} item sm={9} xs={9}>
                      {children}
                      {/* <Right /> */}
                    </Grid>
                  </> :
                  <>
                    <Grid className={classes.right} item sm={12} xs={12}>
                      {children}
                      {/* <Right /> */}
                    </Grid>
                  </>
                }
                
            </Grid>
        </div>
    )
}

export default Mainwrapper;
