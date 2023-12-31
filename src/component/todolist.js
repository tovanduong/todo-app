import React, { useContext, useState, useRef, useEffect } from "react";
import { AppStateContext } from './provider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, TextField, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: '#FFF',
    border: '2px solid #000',
    boxShadow: 24,
    padding: "20px",
    p: 4,
};
export const AppStateConsumer = () => {
    const initToto = {
        id: 1,
        name: "",
        description: "",
        isChecked: false
    }
    const [state, dispatch] = useContext(AppStateContext);
    const [open, setOpen] = useState(false)
    const [todoEdit, setTodoEdit] = useState(state.getEditItem)
    const [valueTab, setValueTab] = useState('1');
    const [todo, setTodo] = useState(initToto)
    const InputRef = useRef()

    useEffect(() => {
        setTodoEdit(state.getEditItem)
    }, [state.getEditItem])

    const handleAddTodo = () => {
        const itemAdd = {
            id: state.listTodo[state.listTodo.length - 1]?.id ? state.listTodo[state.listTodo.length - 1]?.id + 1 : 1,
            name: todo.name,
            description: todo.description,
            isChecked: todo.isChecked
        }

        dispatch({ type: "add", payload: itemAdd })
        setTodo(initToto)
        InputRef.current.children[0].firstChild.focus()
    }
    const handleDeleteTodo = (item) => {
        dispatch({ type: "delete", payload: item })
    }

    const handleOpenEdit = (item) => {
        dispatch({ type: "getItemEdit", payload: item })
        setOpen(true)
    }
    const onChangeEditTodo = (property, value) => {
        let ItemEdit = { ...todoEdit }
        ItemEdit[property] = value
        setTodoEdit(ItemEdit)
    }
    const handleEdit = () => {
        dispatch({ type: "Edit", payload: todoEdit })
        setOpen(false)
    }

    const handleChange = (event, newValue) => {
        setValueTab(newValue);
    };
    return (
        <div style={{ marginLeft: "40px" }}>
            <h1>To Do App</h1>
            {/* Add component */}
            <Box display={"flex"} alignItems={'flex-start'} gap={2}>
                <Box sx={{ width: "30%" }}>
                    <Box marginBottom={3}>
                        <TextField fullWidth ref={InputRef} type="text" placeholder="name" value={todo.name} onChange={(e) => setTodo({ ...todo, name: e.target.value })} />
                    </Box>
                    <Box marginBottom={3}>
                        <TextField fullWidth type="text" placeholder="description" value={todo.description} onChange={(e) => setTodo({ ...todo, description: e.target.value })} />
                    </Box>
                </Box>
                <Box >
                    <Button variant="contained" sx={{ height: "56px" }} onClick={handleAddTodo}>+ add New Item</Button>
                </Box>
            </Box>

            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={valueTab}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="To do list" value="1" />
                            <Tab label="Done" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        {/* table to do list component */}
                        <TableContainer component={Paper} sx={{ width: "70%" }}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">ID</TableCell>
                                        <TableCell align="center">Name</TableCell>
                                        <TableCell align="center">Description</TableCell>
                                        <TableCell align="center">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {state.listTodo.map((row, index) => (
                                        <TableRow
                                            key={index}
                                        >
                                            {/* row component */}
                                            <TableCell width={20} align="center">{row.id}</TableCell>

                                            <TableCell align="center" component="th" scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="center">{row.description}</TableCell>
                                            <TableCell align="center">
                                                <EditIcon sx={{ marginRight: "10px", cursor: "pointer" }} onClick={() => handleOpenEdit(row)} />
                                                <DeleteIcon sx={{ cursor: "pointer" }} onClick={() => handleDeleteTodo(row)} />
                                            </TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </TabPanel>
                    <TabPanel value="2">Developing...</TabPanel>
                </TabContext>
            </Box>
            {/* modal component */}
            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <Box style={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit
                    </Typography>
                    <Box >
                        <Box >
                            <Box marginBottom={3}>
                                <TextField fullWidth type="text" placeholder="name" value={todoEdit.name} onChange={(e) => onChangeEditTodo('name', e.target.value)} />
                            </Box>
                            <Box marginBottom={3}>
                                <TextField fullWidth type="text" placeholder="description" value={todoEdit.description} onChange={(e) => onChangeEditTodo('description', e.target.value)} />
                            </Box>
                        </Box>
                        <Box >
                            <Button variant="contained" sx={{ height: "56px" }} onClick={handleEdit}>Edit Item</Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};