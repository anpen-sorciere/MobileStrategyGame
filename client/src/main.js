import Phaser from 'phaser';
import { io } from 'socket.io-client';
import { GameScene } from './GameScene.js';

// Socket.IOクライアントの接続
let socket;
try {
    socket = io('http://localhost:3000');
} catch (error) {
    console.error('Socket.IO connection error:', error);
}

const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 800,
    parent: 'game-container',
    backgroundColor: '#2c3e50',
    scene: [GameScene]
};

const game = new Phaser.Game(config);

// Socket.IO接続状態を管理
if (socket) {
    socket.on('connect', () => {
        console.log('✅ Connected to server');
        
        // GameSceneにsocketを渡す
        const scene = game.scene.getScene('GameScene');
        if (scene) {
            scene.setSocket(socket);
        }
    });

    socket.on('disconnect', () => {
        console.log('❌ Disconnected from server');
        
        // 画面のテキストを更新
        const scene = game.scene.getScene('GameScene');
        if (scene && scene.statusText) {
            scene.statusText.setText('Disconnected');
        }
    });
}
