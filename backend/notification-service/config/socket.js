const { Server } = require('socket.io');

const initializeSocket = (server) => {
    const io = new Server(server, { cors: { origin: '*' } });

    io.on('connection', (socket) => {
        console.log('✅ User Connected:', socket.id);

        // Notify pharmacist when a doctor creates a prescription
        socket.on('new-prescription', (data) => {
            io.emit('notify-pharmacist', data);
        });

        // Notify doctor when a pharmacist processes a prescription
        socket.on('prescription-processed', (data) => {
            io.emit('notify-doctor', data);
        });

        socket.on('disconnect', () => console.log('❌ User Disconnected:', socket.id));
    });
};

module.exports = initializeSocket;
