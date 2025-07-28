import React, { useState } from 'react';
import { 
  Typography, 
  TextField, 
  Button, 
  Box, 
  Select, 
  MenuItem, 
  InputLabel, 
  FormControl, 
  Grid, 
  CircularProgress,
  Backdrop,
  LinearProgress,
  Snackbar,
  Alert
} from '@mui/material';
import axios from 'axios';

const AddMovie = ({ token }) => {
    const [movieData, setMovieData] = useState({
        movieName: '',
        description: '',
        starring: '',
        ageLimit: '',
        category: '',
        duration: '',
        rating: '',
        url: '',
        movieFullImage: null,
        movieLogoImage: null,
        movieMobileImage: null,
        smallMovieImage: null,
        trailerVideo: null,
        movieVideo: null,
    });

    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMovieData({ ...movieData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files.length > 0) {
            setMovieData({ ...movieData, [name]: files[0] });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        // Append form data fields
        for (const key in movieData) {
            formData.append(key, movieData[key]);
        }

        setLoading(true);
        setUploadProgress(0);

        try {
            const response = await axios.post('https://api.indrajala.in/api/admin/add-videos', formData, {
                headers: {
                    'x-access-protected': token,
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setUploadProgress(progress);
                },
            });

            console.log('Movie added successfully:', response.data);
            
            // Show success toast
            setSnackbar({
                open: true,
                message: 'Movie uploaded successfully!',
                severity: 'success'
            });

            // Reset form
            setMovieData({
                movieName: '',
                description: '',
                starring: '',
                ageLimit: '',
                category: '',
                duration: '',
                rating: '',
                url: '',
                movieFullImage: null,
                movieLogoImage: null,
                movieMobileImage: null,
                smallMovieImage: null,
                trailerVideo: null,
                movieVideo: null,
            });
        } catch (error) {
            console.error('Error adding movie:', error);
            setSnackbar({
                open: true,
                message: 'Error uploading movie. Please try again.',
                severity: 'error'
            });
        } finally {
            setLoading(false);
            setUploadProgress(0);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({...snackbar, open: false});
    };

    return (
        <Box sx={{ padding: 4, backgroundColor: '#f5f5f5', borderRadius: 2, position: 'relative' }}>
            {/* Global Loading Overlay */}
            <Backdrop
                sx={{ 
                    color: '#fff', 
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                }}
                open={loading}
            >
                <Typography variant="h5">Uploading New Movie...</Typography>
                <Box sx={{ width: '50%' }}>
                    <LinearProgress 
                        variant="determinate" 
                        value={uploadProgress} 
                        sx={{ height: 10, borderRadius: 5 }}
                    />
                </Box>
                <Typography>{uploadProgress}%</Typography>
            </Backdrop>

            <Typography variant="h4" gutterBottom align="center">Add Movie</Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            name="movieName"
                            label="Movie Name"
                            value={movieData.movieName}
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            name="description"
                            label="Description"
                            value={movieData.description}
                            onChange={handleInputChange}
                            required
                            multiline
                            rows={4}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            name="starring"
                            label="Starring"
                            value={movieData.starring}
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            name="ageLimit"
                            label="Age Limit"
                            value={movieData.ageLimit}
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            name="category"
                            label="Category"
                            value={movieData.category}
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            name="duration"
                            label="Duration (minutes)"
                            value={movieData.duration}
                            onChange={handleInputChange}
                            required
                            type="number"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth required>
                            <InputLabel id="rating-label">Rating</InputLabel>
                            <Select
                                name="rating"
                                labelId="rating-label"
                                value={movieData.rating}
                                onChange={handleInputChange}
                                label="Rating"
                            >
                                <MenuItem value="U">U</MenuItem>
                                <MenuItem value="A">A</MenuItem>
                                <MenuItem value="U/A">U/A</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            name="url"
                            label="URL"
                            value={movieData.url}
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel htmlFor="movieFullImage">Movie Full Image</InputLabel>
                        <input
                            type="file"
                            id="movieFullImage"
                            name="movieFullImage"
                            onChange={handleFileChange}
                            required
                            style={{ width: '100%' }}
                            accept="image/*"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel htmlFor="movieLogoImage">Movie Logo Image</InputLabel>
                        <input
                            type="file"
                            id="movieLogoImage"
                            name="movieLogoImage"
                            onChange={handleFileChange}
                            required
                            style={{ width: '100%' }}
                            accept="image/*"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel htmlFor="movieMobileImage">Movie Mobile Image</InputLabel>
                        <input
                            type="file"
                            id="movieMobileImage"
                            name="movieMobileImage"
                            onChange={handleFileChange}
                            required
                            style={{ width: '100%' }}
                            accept="image/*"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel htmlFor="smallMovieImage">Small Movie Image</InputLabel>
                        <input
                            type="file"
                            id="smallMovieImage"
                            name="smallMovieImage"
                            onChange={handleFileChange}
                            required
                            style={{ width: '100%' }}
                            accept="image/*"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel htmlFor="trailerVideo">Trailer Video</InputLabel>
                        <input
                            type="file"
                            id="trailerVideo"
                            name="trailerVideo"
                            onChange={handleFileChange}
                            required
                            style={{ width: '100%' }}
                            accept="video/*"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel htmlFor="movieVideo">Movie Video</InputLabel>
                        <input
                            type="file"
                            id="movieVideo"
                            name="movieVideo"
                            onChange={handleFileChange}
                            required
                            style={{ width: '100%' }}
                            accept="video/*"
                        />
                    </Grid>
                </Grid>
                <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    fullWidth 
                    sx={{ mt: 3, py: 2 }}
                    disabled={loading}
                >
                    Add Movie
                </Button>
            </form>

            {/* Toast Notification */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert 
                    onClose={handleCloseSnackbar} 
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default AddMovie;