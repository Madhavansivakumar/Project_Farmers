const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('./config/db.js');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path'); // Import path module
const authRoutes = require('./routes/authRoutes.js');
const profileRoutes = require('./routes/profileRoutes.js');
const productRoutes = require('./routes/productRoutes.js');
const demandRoutes = require('./routes/demandRoutes.js');
const messageRoutes = require('./routes/messageRoutes.js');
const unifiedRoutes = require('./routes/unifiedRoutes.js');
const analyticsRoutes = require('./routes/analyticsRoutes.js'); // Import analytics routes


dotenv.config(); // Load environment variables

// Connect Database
connectDB();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["Authorization"],
        credentials: true
    }
});

app.set('socketio', io); // Make io instance globally available

// Init Middleware
app.use(express.json({ extended: false }));

// Enable CORS
app.use(cors());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/products', productRoutes);
app.use('/api/demands', demandRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/unified', unifiedRoutes);
app.use('/api/analytics', analyticsRoutes); // Use analytics routes


io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    });

    socket.on('stopTyping', (data) => {
        socket.broadcast.emit('stopTyping', data);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
