import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { randomUUID } from 'crypto';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const PORT = 3000;

// 接続中のユーザーを管理
const connectedUsers = new Map<string, string>();

// HTTPサーバーの起動
httpServer.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

// Socket.IO接続処理
io.on('connection', (socket) => {
    // 一意のuserIdを生成
    const userId = randomUUID();
    
    // ユーザー情報を保存
    connectedUsers.set(socket.id, userId);
    
    console.log(`✅ Client connected:`);
    console.log(`   Socket ID: ${socket.id}`);
    console.log(`   User ID: ${userId}`);
    
    // クライアントにuserIdとウェルカムメッセージを送信
    socket.emit('message', {
        type: 'welcome',
        userId: userId,
        content: 'Welcome to MobileStrategyGame Server!'
    });
    
    // 接続切断時の処理
    socket.on('disconnect', () => {
        const disconnectedUserId = connectedUsers.get(socket.id);
        console.log(`❌ Client disconnected:`);
        console.log(`   Socket ID: ${socket.id}`);
        console.log(`   User ID: ${disconnectedUserId}`);
        
        // ユーザー情報を削除
        connectedUsers.delete(socket.id);
    });
    
    // 任意のメッセージを受信した場合の処理
    socket.on('message', (data) => {
        const userId = connectedUsers.get(socket.id);
        console.log(`📨 Received message from User ID: ${userId} (Socket: ${socket.id}):`, data);
    });
});

// エラーハンドリング
io.on('error', (error) => {
    console.error('❌ Socket.IO error:', error);
});

console.log('⚡ Socket.IO server initialized');

