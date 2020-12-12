import React, { useState } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Box,
    Card,
    Table,
    TextField,
    TableBody,
    Button,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    makeStyles,
    CardContent
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {},
    avatar: {
        marginRight: theme.spacing(2)
    },
    submitButton:{
        marginLeft: theme.spacing(2)
    },
    marginTop:{
        marginTop:theme.spacing(2)
    }
}));

const LeadComments = ({ className, ...rest }) => {
    const classes = useStyles();
    const [leadIdInput, setLeadIdInput] = useState('');
    const [comments, setComments] = useState('')

    const submitHandler = async () => {
      
        try {
            const res = await axios.get(`https://securefortraders.com/sdk/api/getComments.php?leadID=${leadIdInput}`)
            const commentsText = [res.data.message.comments];
            console.log(...commentsText)
            setComments(...commentsText);
        } catch (error) {
            alert(error.message);
        }
    }

    const closeParag = () =>{
        setComments(PrevState => null);
    }




    return (
        <React.Fragment>
            <Box mt={3}>
                <Card>
                    <CardContent>
                        <Typography variant="h2"> Recive Lead's Comments </Typography>
                        <div className={classes.marginTop}>
                            <TextField
                                value={leadIdInput}
                                placeholder='Enter leadID:'
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
            { comments &&
                    <Card 
                        className={clsx(classes.marginTop, className)}
                        {...rest}
                    >
                        <PerfectScrollbar>
                            <Box minWidth={1050}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                Text
                                                </TableCell>
                                            <TableCell>
                                                date
                                                </TableCell>
                                        </TableRow>
                                    </TableHead>

                                    {/* Rendering the Leads to the table */}

                                    <TableBody>
                                        {comments.map((obj) => (
                                            <TableRow
                                                hover
                                                key={Math.random()}
                                            >
                                                <TableCell>
                                                   {obj.text}
                                                </TableCell>
                                                <TableCell>
                                                    {obj.date}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <Button className={classes.submitButton} 
                                    onClick={closeParag}
                                    color="primary" > Close </Button> 
                            </Box>
                        </PerfectScrollbar>
                    </Card>
            }
        </React.Fragment>

    );
};



export default LeadComments;
