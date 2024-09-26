// src/Home.js
import React, { useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Box } from '@mui/material';
import Cookies from 'js-cookie';
import './Home.css';
import AddMovie from './AddMovie';
import MovieList from './MovieList';
import AddList from './AddList';
import FindUser from './SearchUser';

const Home = () => {
    const token = Cookies.get('token'); // Get the token from cookies
    const [selectedOption, setSelectedOption] = useState(''); // State to track selected option

    // Redirect to login if not authenticated
    if (!token) {
        window.location.href = '/'; 
        return null; // Prevent rendering the rest of the component
    }

    // Function to render content based on selected option
    const renderContent = () => {
        switch (selectedOption) {
            case 'addMovie':
                return <AddMovie token={token} />;
            case 'movieList':
                return <MovieList token={token} />;
            case 'addList':
                return <AddList token={token} />;
            case 'searchUser':
                    return <FindUser token={token} />;
            case 'listAll':
                return <Typography variant="h6">All Lists Content Here</Typography>;
            default:
                return <Typography variant="h6">Please select an option from the left.</Typography>;
        }
    };

    return (
        <Container>
            <Box display="flex" height="100vh">
                {/* Left Sidebar */}
                <Box width="250px" bgcolor="#3f51b5" padding={2} color="white">
                    <Typography variant="h5" gutterBottom>Options</Typography>
                    <List>
                        <ListItem button onClick={() => setSelectedOption('addMovie')} className="sidebar-item">
                            <ListItemText primary="Add Movie" />
                        </ListItem>
                        <ListItem button onClick={() => setSelectedOption('movieList')} className="sidebar-item">
                            <ListItemText primary="Movie List" />
                        </ListItem>
                        <ListItem button onClick={() => setSelectedOption('addList')} className="sidebar-item">
                            <ListItemText primary="Add List" />
                        </ListItem>
                        <ListItem button onClick={() => setSelectedOption('listAll')} className="sidebar-item">
                            <ListItemText primary="List All Lists" />
                        </ListItem>
                        <ListItem button onClick={() => setSelectedOption('searchUser')} className="sidebar-item">
                            <ListItemText primary="Search User" />
                        </ListItem>

                    </List>
                </Box>

                {/* Right Content Area */}
                <Box flexGrow={1} padding={2} bgcolor="#f5f5f5">
                    <Typography variant="h4">Welcome to the Home Page</Typography>
                    <Typography variant="body1">You are logged in!</Typography>
                    <Box marginTop={2}>
                        {renderContent()} {/* Render the selected content */}
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default Home;