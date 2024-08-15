// src/AddList.js
import React, { useState } from 'react';
import { Typography, TextField, Button, Box, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';

const AddList = () => {
    const [listName, setListName] = useState(''); // State for the list name
    const [loading, setLoading] = useState(false); // Loading state
    const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state
    const [snackbarMessage, setSnackbarMessage] = useState(''); // Snackbar message

    const token = Cookies.get('token'); // Get the token from cookies

    const handleInputChange = (e) => {
        setListName(e.target.value); // Update list name on input change
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        if (!listName) {
            setSnackbarMessage('List name is required.');
            setOpenSnackbar(true);
            return;
        }

        setLoading(true); // Start loading

        try {
            const response = await axios.post('https://api.indrajala.in/api/admin/add-list', { name: listName }, {
                headers: {
                    'x-access-protected': token, // Include token in headers
                },
            });

            console.log('List added successfully:', response.data);
            setSnackbarMessage('List added successfully!');
            setOpenSnackbar(true);
            setListName(''); // Reset list name field
        } catch (error) {
            console.error('Error adding list:', error);
            setSnackbarMessage('Error adding list. Please try again.');
            setOpenSnackbar(true);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false); // Close snackbar
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ padding: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom>Add a New List</Typography>
            <TextField
                label="List Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={listName}
                onChange={handleInputChange}
                required
            />
            <Button 
                type="submit" 
                variant="contained" 
                fullWidth 
                sx={{ marginTop: 2 }} 
                disabled={loading}
            >
                {loading ? 'Adding...' : 'Add List'}
            </Button>

            {/* Snackbar for success/error messages */}
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarMessage.includes('Error') ? 'error' : 'success'} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default AddList;