import React from 'react';
import clsx from 'clsx';
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
    makeStyles
} from '@material-ui/core';
import {useState} from 'react';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {},
    importButton: {
        marginRight: theme.spacing(1)
    },
    exportButton: {
        marginRight: theme.spacing(1)
    },
    submitButton:{
        marginLeft: theme.spacing(2)
    },
    marginTop:{
        marginTop: theme.spacing(2)
    }
}));



const LeadsInfo = ({ className, ...rest }) => {
    const classes = useStyles();

    const [leadIdInput, setLeadIdInput] = useState('');
    const [email, setEmail] = useState('')


    const submitHandler = async () => {
        try { 
        const res = await axios.get(`https://securefortraders.com/sdk/api/getEmailfromLead.php?leadID=${leadIdInput}`)
        setEmail(res.data.message);
        console.log(res);
        } catch (error) {
            alert(error.message);
        }

    }

    const closeEmailParag = () =>{
        setEmail(PrevState => '');
    }


    return (
        <div
            className={clsx(classes.root, className)}
            {...rest}
        >
            <Box mt={3}>
                <Card>
                    <CardContent >
                        <Typography variant="h2"> Convert LeadID to Email </Typography> 
                         {/* <Typography> Enter leadID: </Typography>  */}
                            <div className={classes.marginTop}>
                            <TextField 
                            
                                value={leadIdInput}
                                placeholder= 'Enter leadID:'
                                onChange={event => setLeadIdInput(event.target.value)}
                            />
                            <Button 
                                className={classes.submitButton}
                                color="primary" 
                                variant="contained" 
                                onClick={submitHandler}> Submit </Button>
                                </div>
                    </CardContent>
                </Card>
            </Box>

            {email && 
                    <Card className={classes.marginTop}>
                    <CardContent>
                            <Typography> Email is: {email} </Typography>
                            <Button 
                                className={classes.marginTop}
                                color="primary" 
                                onClick={closeEmailParag}> Close </Button> 
                    </CardContent>
                    </Card>
            }
        </div>
    );
};


export default LeadsInfo;
