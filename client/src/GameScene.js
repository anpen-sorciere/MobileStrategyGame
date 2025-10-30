import Phaser from 'phaser';

// ===== 建物タイプ定義 =====
const BUILDING_TYPES = {
    CASTLE: {
        id: 'castle',
        name: '城',
        nameEn: 'Castle',
        color: 0xd4af37, // 金色
        borderColor: 0x8b6914,
        priority: 'high',
        description: '領地レベルの制限を決定。城レベルがチームの総合戦力に直結する。'
    },
    ACADEMY: {
        id: 'academy',
        name: '学院',
        nameEn: 'Academy',
        color: 0x6a5acd, // スレートブルー
        borderColor: 0x483d8b,
        priority: 'high',
        description: '各種技術（軍事、経済）の研究を行う。時短課金の主要トリガー。'
    },
    BARRACKS: {
        id: 'barracks',
        name: '訓練所',
        nameEn: 'Barracks',
        color: 0xcd5c5c, // インディアンレッド
        borderColor: 0x8b3e3e,
        priority: 'medium',
        description: '兵士を訓練する。複数建設可能。軍事力の基本となる。'
    },
    PRISON: {
        id: 'prison',
        name: '監獄',
        nameEn: 'Prison',
        color: 0x708090, // スレートグレー
        borderColor: 0x4a5568,
        priority: 'low',
        description: '敵のロード（王）を捕獲・処刑する。'
    },
    ALTAR: {
        id: 'altar',
        name: '祭壇',
        nameEn: 'Altar',
        color: 0x9370db, // ミディアムスレートブルー
        borderColor: 0x6a4c93,
        priority: 'low',
        description: '捕獲した敵ロードの処刑を行い、味方バフを獲得。'
    },
    HOSPITAL: {
        id: 'hospital',
        name: '病院',
        nameEn: 'Hospital',
        color: 0xffe4e1, // ミストローズ
        borderColor: 0xff6b6b,
        priority: 'medium',
        description: '戦闘で負傷した兵士を治療・収容する。収容数超過分は死亡する。'
    },
    GUILD: {
        id: 'guild',
        name: 'ギルド共闘',
        nameEn: 'Guild',
        color: 0x4169e1, // ロイヤルブルー
        borderColor: 0x1e3a8a,
        priority: 'medium',
        description: 'ギルド（チーム）単位で参加するイベント管理。'
    },
    // ---- 2.x 資源系 ----
    FARM: {
        id: 'farm',
        name: '農場',
        nameEn: 'Farm',
        color: 0x8bc34a, // ライトグリーン
        borderColor: 0x558b2f,
        priority: 'high',
        description: '食料を生産・貯蔵する。'
    },
    QUARRY: {
        id: 'quarry',
        name: '採石場',
        nameEn: 'Quarry',
        color: 0xbdbdbd, // グレー
        borderColor: 0x757575,
        priority: 'high',
        description: '石材を生産・貯蔵する。'
    },
    MINE: {
        id: 'mine',
        name: '鉱山',
        nameEn: 'Mine',
        color: 0x9e9d24, // オリーブ系
        borderColor: 0x827717,
        priority: 'medium',
        description: '鉱石を生産・貯蔵する。'
    },
    LUMBER: {
        id: 'lumber',
        name: '製材所',
        nameEn: 'Lumber Mill',
        color: 0x8d6e63, // ブラウン
        borderColor: 0x5d4037,
        priority: 'medium',
        description: '木材を生産・貯蔵する。'
    },
    VAULT: {
        id: 'vault',
        name: '金庫',
        nameEn: 'Vault',
        color: 0x90a4ae, // ブルーグレー
        borderColor: 0x546e7a,
        priority: 'medium',
        description: '資源を保護し、敵の略奪から守る（保護上限あり）。'
    },
    MANOR: {
        id: 'manor',
        name: '荘園',
        nameEn: 'Manor',
        color: 0xffc107, // アンバー
        borderColor: 0xff8f00,
        priority: 'medium',
        description: '時間ごとのゴールド生産と、兵士訓練速度ブースト。'
    },
    // ---- 3.x ヒーロー/戦闘/交易系 ----
    HERO_HALL: {
        id: 'hero_hall',
        name: 'ヒーローの館',
        nameEn: 'Hero Hall',
        color: 0xff69b4, // ホットピンク
        borderColor: 0xc2185b,
        priority: 'high',
        description: 'ヒーロー（アイドル）の育成、能力確認、レベルアップ管理。ガチャ/購入導線。'
    },
    COLOSSEUM: {
        id: 'colosseum',
        name: 'コロシアム',
        nameEn: 'Colosseum',
        color: 0xdc143c, // クリムゾン
        borderColor: 0x8b0000,
        priority: 'medium',
        description: 'ヒーロー同士のPvP（非同期バトル）。ジェムなどの報酬を獲得。'
    },
    MERCHANT: {
        id: 'merchant',
        name: '商船',
        nameEn: 'Merchant Ship',
        color: 0x00ced1, // ダークターコイズ
        borderColor: 0x008b8b,
        priority: 'medium',
        description: '資源やアイテムを取引・交換する。イベントアイテムの交換所として利用可能。'
    },
    TRADE_HALL: {
        id: 'trade_hall',
        name: '貿易所',
        nameEn: 'Trade Hall',
        color: 0x32cd32, // ライムグリーン
        borderColor: 0x228b22,
        priority: 'high',
        description: 'ギルドメンバー間で資源の援助を行う。'
    },
    FORGE: {
        id: 'forge',
        name: '鍛造所',
        nameEn: 'Forge',
        color: 0xff4500, // オレンジレッド
        borderColor: 0xcc3300,
        priority: 'medium',
        description: '装備アイテムを作成する。装備素材の管理。'
    },
    MONSTER_CAGE: {
        id: 'monster_cage',
        name: '魔獣の檻',
        nameEn: 'Monster Cage',
        color: 0x4b0082, // インディゴ
        borderColor: 0x2d1b3d,
        priority: 'low',
        description: '捕獲した魔獣を拘束し、処刑や解放を行う。'
    }
};

export class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        // リソース系建物の画像をプリロード（128x128 PNG想定、透過PNG）
        const resourceIds = ['farm', 'quarry', 'mine', 'lumber', 'vault', 'manor'];
        resourceIds.forEach((id) => {
            const key = `building:${id}`;
            const url = `assets/buildings/resources/${id}.png`;
            this.load.image(key, url);
        });
    }

    create() {
        const { width, height } = this.cameras.main;
        
        // 背景色（城の雰囲気）
        this.cameras.main.setBackgroundColor('#8B4513');
        
        // ===== 等角投影グリッド初期化 =====
        this.iso = {
            tileBaseSize: 128, // マップチップのベースサイズ（仕様: 128x128ピクセル）
            tileWidth: 128, // 等角投影でのタイル幅（画面描画時）
            tileHeight: 64, // 等角投影の画面上の高さ（2:1 比率で奥行きを表現）
            gridWidth: 15, // グリッドの幅（タイル数）
            gridHeight: 15, // グリッドの高さ（タイル数）
            originX: width / 2,
            originY: height / 2 + 100, // 画面中央下寄せ
            tiles: new Map(), // key: "x,y" -> {x,y,container,top,sides}
            groups: new Map(), // key: "gx,gy" -> {gx,gy,content}
            hoveredKey: null,
            selectedKey: null
        };
        this._initIsoMath();
        this._createIsoGrid();
        this._enableIsoInput();
        // ===== /等角投影 =====

        // 現在選択中の建物タイプ（初期は選択なし）
        this.currentBuildingTypeId = null;
        this.selectedCategory = null;
        
        // 建物タイプ選択UI（階層化：カテゴリ→建物）
        this._createBuildingToolbar();
        
        // 上部にステータスバー
        this.createStatusBar();
        
        // UIボタンとパネル
        this._createUIButtons();
        this._createChatWindow();
        
        // Socket.IO
        this.socket = null;
    }

    // ===== 等角投影: 数学ユーティリティ =====
    _initIsoMath() {
        // 等角投影の座標変換（グリッド座標 → 画面座標）
        this.tileToPixel = (x, y) => {
            const px = (x - y) * this.iso.tileWidth / 2 + this.iso.originX;
            const py = (x + y) * this.iso.tileHeight / 2 + this.iso.originY;
            return { x: px, y: py };
        };
        
        // 等角投影の逆変換（画面座標 → グリッド座標）
        this.pixelToTile = (px, py) => {
            const relX = px - this.iso.originX;
            const relY = py - this.iso.originY;
            const x = Math.round((relX / this.iso.tileWidth + relY / this.iso.tileHeight));
            const y = Math.round((relY / this.iso.tileHeight - relX / this.iso.tileWidth));
            return { x, y };
        };
        
        // 等角投影のタイルコーナー（ひし形の4頂点）
        this.tileCorners = (x, y) => {
            const center = this.tileToPixel(x, y);
            const hw = this.iso.tileWidth / 2;
            const hh = this.iso.tileHeight / 2;
            return {
                center,
                corners: [
                    { x: center.x, y: center.y - hh },        // 上（尖った先）
                    { x: center.x + hw, y: center.y },       // 右
                    { x: center.x, y: center.y + hh },       // 下（尖った先）
                    { x: center.x - hw, y: center.y }        // 左
                ]
            };
        };

        // 2x2タイルを1組にまとめたグループの中心座標
        this.groupFromTile = (x, y) => {
            const gx = Math.floor(x / 2);
            const gy = Math.floor(y / 2);
            // 2x2の中央は (x+0.5, y+0.5) を用いた等角座標で表現できる
            const center = this.tileToPixel(gx * 2 + 0.5, gy * 2 + 0.5);
            return { gx, gy, center };
        };
    }

    // ===== 等角投影: グリッド生成/描画 =====
    _createIsoGrid() {
        const { gridWidth, gridHeight } = this.iso;
        const tiles = this.iso.tiles;
        const drawContainer = this.add.container(0, 0);
        this.iso.container = drawContainer;
        
        // Zオーダー順に描画（奥から手前へ：x+yの値が小さい順）
        const tileList = [];
        for (let x = 0; x < gridWidth; x++) {
            for (let y = 0; y < gridHeight; y++) {
                tileList.push({ x, y, z: x + y });
            }
        }
        tileList.sort((a, b) => a.z - b.z);
        
        const startX = Math.floor(-gridWidth / 2);
        const startY = Math.floor(-gridHeight / 2);
        
        tileList.forEach(({ x, y }) => {
            const gridX = startX + x;
            const gridY = startY + y;
            const { center, corners } = this.tileCorners(gridX, gridY);
            const container = this.add.container(center.x, center.y);
            
            // タイルの高さ（奥行きを感じさせるため大きめに）
            const height = 16;
            const offsetY = -height;
            
            // 距離に応じた高さ調整（奥のタイルは少し低く）
            const distance = Math.sqrt(gridX * gridX + gridY * gridY);
            const heightAdjust = Math.min(4, distance * 0.3);
            const adjustedHeight = height - heightAdjust;
            
            // 側面（4つの側面を描画：ひし形なので4面）
            const sides = this.add.graphics();
            
            // 等角投影の明るさ調整（手前ほど明るく、奥ほど暗く）
            const brightness = Math.max(0.4, 1 - distance * 0.05);
            const baseSideColor = 0x2d4a2d;
            const baseBrightColor = 0x4a6d4a;
            
            const sideColor = Phaser.Display.Color.ValueToColor(baseSideColor);
            sideColor.lighten((1 - brightness) * 40);
            const darkSide = Phaser.Display.Color.GetColor(sideColor.r, sideColor.g, sideColor.b);
            
            const brightSideColor = Phaser.Display.Color.ValueToColor(baseBrightColor);
            brightSideColor.lighten((1 - brightness) * 40);
            const brightSide = Phaser.Display.Color.GetColor(brightSideColor.r, brightSideColor.g, brightSideColor.b);
            
            sides.lineStyle(2, 0x1a3a1a, 0.6 * brightness);
            
            // 等角投影の4つの側面（上、右、下、左）
            // 等角投影では右と下の側面が明るく、左と上の側面が暗く見える
            for (let i = 0; i < 4; i++) {
                const next = (i + 1) % 4;
                const isBright = i === 1 || i === 2; // 右と下の側面は明るく（手前側）
                const sideBrightness = brightness * (isBright ? 1.2 : 0.8);
                sides.fillStyle(isBright ? brightSide : darkSide, 0.8 * sideBrightness);
                sides.beginPath();
                sides.moveTo(corners[i].x - center.x, corners[i].y - center.y);
                sides.lineTo(corners[next].x - center.x, corners[next].y - center.y);
                sides.lineTo(corners[next].x - center.x, corners[next].y - center.y - adjustedHeight);
                sides.lineTo(corners[i].x - center.x, corners[i].y - center.y - adjustedHeight);
                sides.closePath();
                sides.fillPath();
                sides.strokePath();
            }
            container.add(sides);
            
            // 上面（ひし形タイル）
            const top = this.add.graphics();
            const topBrightness = Math.max(0.5, 1 - distance * 0.04); // distanceは上で定義済み
            const baseColor = 0x3b5f3b;
            const topColor = Phaser.Display.Color.ValueToColor(baseColor);
            topColor.lighten(40 * (1 - topBrightness));
            top.lineStyle(2, 0x2c3e50, 0.8 * topBrightness);
            top.fillStyle(Phaser.Display.Color.GetColor(topColor.r, topColor.g, topColor.b), 0.9 * topBrightness);
            top.beginPath();
            for (let i = 0; i < 4; i++) {
                const corner = corners[i];
                if (i === 0) {
                    top.moveTo(corner.x - center.x, corner.y - center.y - adjustedHeight);
                } else {
                    top.lineTo(corner.x - center.x, corner.y - center.y - adjustedHeight);
                }
            }
            top.closePath();
            top.fillPath();
            top.strokePath();
            container.add(top);
            
            drawContainer.add(container);
            const key = `${gridX},${gridY}`;
            tiles.set(key, { x: gridX, y: gridY, container, content: null, top, sides });
        });
        
        // 中心をわずかに強調
        const center = this.iso.tiles.get('0,0');
        if (center) {
            center.top.clear();
            center.top.lineStyle(3, 0xffffff, 1);
            center.top.fillStyle(0x4e7d4e, 1);
            const { corners } = this.tileCorners(0, 0);
            const centerPos = this.tileToPixel(0, 0);
            center.top.beginPath();
            for (let i = 0; i < 4; i++) {
                const corner = corners[i];
                if (i === 0) {
                    center.top.moveTo(corner.x - centerPos.x, corner.y - centerPos.y - 16);
                } else {
                    center.top.lineTo(corner.x - centerPos.x, corner.y - centerPos.y - 16);
                }
            }
            center.top.closePath();
            center.top.fillPath();
            center.top.strokePath();
        }
    }

    // ===== 等角投影: 入力/ハイライト =====
    _enableIsoInput() {
        const highlight = this.add.graphics();
        highlight.depth = 10;
        this.iso.highlight = highlight;
        this.iso.previewContainer = null;
        this.input.on('pointermove', (pointer) => {
            const { x, y } = this.pixelToTile(pointer.worldX, pointer.worldY);
            const { gx, gy } = this.groupFromTile(x, y);
            const gkey = `${gx},${gy}`;
            if (this.iso.hoveredKey === gkey) return;
            this.iso.hoveredKey = gkey;
            this._drawHoverGroup(gx, gy);
            // 選択中の建物タイプのプレビューを表示
            this._showBuildingPreviewGroup(gx, gy);
        });
        this.input.on('pointerdown', (pointer) => {
            const { x, y } = this.pixelToTile(pointer.worldX, pointer.worldY);
            const { gx, gy } = this.groupFromTile(x, y);
            this.iso.selectedKey = `${gx},${gy}`;
            this._drawSelectionGroup(gx, gy);
            this._toggleBuildingAtGroup(gx, gy);
            // プレビューを削除
            if (this.iso.previewContainer) {
                this.iso.previewContainer.destroy();
                this.iso.previewContainer = null;
            }
        });
    }
    
    _showBuildingPreviewGroup(gx, gy) {
        const gkey = `${gx},${gy}`;
        
        // 既存のプレビューを削除
        if (this.iso.previewContainer) {
            this.iso.previewContainer.destroy();
            this.iso.previewContainer = null;
        }
        
        // 建物が選択されていない、または既に建物がある場合はプレビューを表示しない
        const existing = this.iso.groups.get(gkey);
        if (!this.currentBuildingTypeId || existing?.content) return;
        
        // 選択中の建物タイプのプレビューを半透明で表示
        const type = Object.values(BUILDING_TYPES).find(t => t.id === this.currentBuildingTypeId);
        if (!type) return;
        
        const { center } = this.groupFromTile(gx * 2, gy * 2);
        const preview = this.add.container(center.x, center.y - 16);
        const texKey = `building:${type.id}`;
        if (this.textures.exists(texKey)) {
            const img = this.add.image(0, 0, texKey).setOrigin(0.5, 0.5);
            img.setAlpha(0.6);
            preview.add(img);
        } else {
            // フォールバック: 簡易プレースホルダー
            const previewHeight = 20;
            const previewW = this.iso.tileWidth * 0.75;
            const previewH = this.iso.tileHeight * 0.85;
            const previewSides = this.add.graphics();
            const previewSideColor = Phaser.Display.Color.ValueToColor(type.color);
            previewSideColor.darken(30);
            previewSides.fillStyle(Phaser.Display.Color.GetColor(previewSideColor.r, previewSideColor.g, previewSideColor.b), 0.25);
            previewSides.beginPath();
            previewSides.moveTo(-previewW / 2, -previewH / 2);
            previewSides.lineTo(previewW / 2, -previewH / 2);
            previewSides.lineTo(previewW / 2, -previewH / 2 - previewHeight);
            previewSides.lineTo(-previewW / 2, -previewH / 2 - previewHeight);
            previewSides.closePath();
            previewSides.fillPath();
            preview.add(previewSides);
        }
        preview.setDepth(9);
        this.iso.previewContainer = preview;
    }

    _drawHoverGroup(gx, gy) {
        const { center } = this.groupFromTile(gx * 2, gy * 2);
        const g = this.iso.highlight;
        g.clear();
        g.lineStyle(3, 0xfff59d, 1);
        // グループ中心を示すターゲットマーク
        g.strokeCircle(center.x, center.y - 16, 12);
        g.lineBetween(center.x - 14, center.y - 16, center.x + 14, center.y - 16);
        g.lineBetween(center.x, center.y - 30, center.x, center.y - 2);
    }

    _drawSelectionGroup(gx, gy) {
        // 選択グループ中心にパルス
        const { center } = this.groupFromTile(gx * 2, gy * 2);
        const pulse = this.add.graphics();
        pulse.depth = 11;
        pulse.lineStyle(4, 0xffc107, 1);
        pulse.strokeCircle(center.x, center.y - 16, 16);
        this.tweens.add({
            targets: pulse,
            alpha: 0,
            duration: 350,
            onComplete: () => pulse.destroy()
        });
    }

    // ===== 建物プレースホルダー配置/削除 =====
    _toggleBuildingAtGroup(gx, gy) {
        const gkey = `${gx},${gy}`;
        const group = this.iso.groups.get(gkey) || { gx, gy, content: null };
        
        // 建物が選択されていない場合は警告
        if (!this.currentBuildingTypeId) {
            console.warn('⚠️ 建物を選択してください！');
            // 警告メッセージを一時表示
            const { center } = this.groupFromTile(gx * 2, gy * 2);
            const warning = this.add.text(center.x, center.y - 30, '建物を選択してください！', {
                fontSize: '16px',
                color: '#ff0000',
                fontFamily: 'Arial, sans-serif',
                backgroundColor: '#ffffff',
                padding: { x: 10, y: 5 }
            }).setOrigin(0.5).setDepth(300);
            this.tweens.add({
                targets: warning,
                alpha: 0,
                y: warning.y - 20,
                duration: 1500,
                onComplete: () => warning.destroy()
            });
            return;
        }
        
        const selectedTypeId = this.currentBuildingTypeId;
        // 既に同じ建物がある場合は削除
        if (group.content && group.content.typeId === selectedTypeId) {
            this._removeGroupBuilding(group);
            return;
        }
        // 異なる建物がある場合は置き換え
        if (group.content && group.content.typeId !== selectedTypeId) {
            this._removeGroupBuilding(group);
        }
        // 新しい建物を配置
        this._placeGroupBuilding(group, selectedTypeId);
    }

    _placeGroupBuilding(group, typeId) {
        const type = Object.values(BUILDING_TYPES).find(t => t.id === typeId);
        if (!type) return;
        const { center } = this.groupFromTile(group.gx * 2, group.gy * 2);
        const container = this.add.container(center.x, center.y - 16);
        const texKey = `building:${type.id}`;
        if (this.textures.exists(texKey)) {
            const img = this.add.image(0, 0, texKey).setOrigin(0.5, 0.5);
            container.add(img);
        } else {
            // フォールバック: 簡易プレースホルダー
            const buildingHeight = 20;
            const buildingW = this.iso.tileWidth * 0.75;
            const buildingH = this.iso.tileHeight * 0.85;
            const sides = this.add.graphics();
            const sideColor = Phaser.Display.Color.ValueToColor(type.color);
            sideColor.darken(30);
            sides.fillStyle(Phaser.Display.Color.GetColor(sideColor.r, sideColor.g, sideColor.b), 0.9);
            sides.beginPath();
            sides.moveTo(-buildingW / 2, -buildingH / 2);
            sides.lineTo(buildingW / 2, -buildingH / 2);
            sides.lineTo(buildingW / 2, -buildingH / 2 - buildingHeight);
            sides.lineTo(-buildingW / 2, -buildingH / 2 - buildingHeight);
            sides.closePath();
            sides.fillPath();
            sides.lineStyle(2, type.borderColor, 0.8);
            sides.strokePath();
            container.add(sides);
            const top = this.add.rectangle(0, -buildingH / 2 - buildingHeight / 2, buildingW, buildingH, type.color, 0.95);
            top.setStrokeStyle(3, type.borderColor, 1);
            container.add(top);
            const label = this.add.text(0, -buildingH / 2 - buildingHeight / 2, type.name, {
                fontSize: '14px',
                color: '#ffffff',
                fontFamily: 'Arial, sans-serif',
                stroke: '#000000',
                strokeThickness: 2
            }).setOrigin(0.5);
            container.add(label);
        }
        
        container.setScale(0.1);
        container.setDepth(12); // 建物はタイルより上に
        this.tweens.add({
            targets: container,
            scale: 1,
            duration: 160,
            ease: 'Back.Out'
        });
        group.content = { typeId, container };
        this.iso.groups.set(`${group.gx},${group.gy}`, group);
    }

    _removeGroupBuilding(group) {
        if (!group.content) return;
        const container = group.content.container;
        this.tweens.add({
            targets: container,
            alpha: 0,
            scale: 0.85,
            duration: 120,
            onComplete: () => container.destroy()
        });
        group.content = null;
        this.iso.groups.set(`${group.gx},${group.gy}`, group);
    }

    // ===== 建物選択ツールバー（階層化：カテゴリ→建物） =====
    _createBuildingToolbar() {
        const { width, height } = this.cameras.main;
        const container = this.add.container(width / 2, height - 50);
        container.setDepth(200);
        const toolbarBgW = Math.min(1180, width - 20);
        
        // カテゴリ定義
        const categories = [
            {
                id: 'military',
                name: '軍事・統治',
                icon: '⚔️',
                color: 0x8b0000,
                buildingIds: ['castle', 'academy', 'barracks', 'prison', 'altar', 'hospital', 'guild']
            },
            {
                id: 'resources',
                name: '資源',
                icon: '💎',
                color: 0x228b22,
                buildingIds: ['farm', 'quarry', 'mine', 'lumber', 'vault', 'manor']
            },
            {
                id: 'hero_trade',
                name: 'ヒーロー・交易',
                icon: '⭐',
                color: 0x4169e1,
                buildingIds: ['hero_hall', 'colosseum', 'merchant', 'trade_hall', 'forge', 'monster_cage']
            }
        ];
        
        // 背景パネル
        const bg = this.add.rectangle(0, 0, toolbarBgW, 110, 0x1a1a1a, 0.95);
        bg.setStrokeStyle(3, 0xffffff, 0.6);
        container.add(bg);
        
        // タイトル
        const title = this.add.text(0, -45, '🏗️ 建物を選択してください', {
            fontSize: '16px',
            color: '#ffffff',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#ff6b6b',
            padding: { x: 12, y: 4 }
        }).setOrigin(0.5, 0.5);
        container.add(title);
        
        // カテゴリボタン（第1階層）
        const catGap = 10;
        const catBtnW = 140;
        const catBtnH = 35;
        const catTotalW = categories.length * catBtnW + (categories.length - 1) * catGap;
        let catX = -catTotalW / 2 + catBtnW / 2;
        
        this.categoryButtons = [];
        categories.forEach((cat) => {
            const catBtn = this.add.container(catX, -5);
            const catRect = this.add.rectangle(0, 0, catBtnW, catBtnH, cat.color, 0.9);
            catRect.setStrokeStyle(2, 0xffffff, 0.5);
            const catLabel = this.add.text(0, 0, `${cat.icon} ${cat.name}`, {
                fontSize: '14px',
                color: '#ffffff',
                fontFamily: 'Arial, sans-serif'
            }).setOrigin(0.5);
            catBtn.add([catRect, catLabel]);
            catBtn.setInteractive(new Phaser.Geom.Rectangle(-catBtnW/2, -catBtnH/2, catBtnW, catBtnH), Phaser.Geom.Rectangle.Contains);
            catBtn.on('pointerdown', () => {
                this.selectedCategory = this.selectedCategory === cat.id ? null : cat.id;
                this._updateCategoryButtons();
                this._updateBuildingButtons(categories.find(c => c.id === this.selectedCategory));
            });
            container.add(catBtn);
            this.categoryButtons.push({ container: catBtn, rect: catRect, categoryId: cat.id });
            catX += catBtnW + catGap;
        });
        
        // 建物ボタンエリア（第2階層）
        const buildingArea = this.add.container(0, 25);
        this.buildingButtonsContainer = buildingArea;
        container.add(buildingArea);
        
        this.toolbarContainer = container;
        this.categories = categories;
        this._updateCategoryButtons();
    }
    
    _updateCategoryButtons() {
        if (!this.categoryButtons) return;
        this.categoryButtons.forEach((b) => {
            const selected = b.categoryId === this.selectedCategory;
            b.rect.setAlpha(selected ? 1 : 0.6);
            b.container.setScale(selected ? 1.05 : 1.0);
            b.rect.setStrokeStyle(selected ? 3 : 2, 0xffffff, selected ? 1 : 0.5);
        });
    }
    
    _updateBuildingButtons(selectedCategory) {
        // 既存の建物ボタンを削除
        if (this.buildingButtonsContainer) {
            this.buildingButtonsContainer.removeAll(true);
            this.buildingButtons = [];
        }
        
        if (!selectedCategory) {
            // カテゴリ未選択時は何も表示しない
            return;
        }
        
        // 選択されたカテゴリの建物一覧を表示
        const buildingIds = selectedCategory.buildingIds;
        const buildings = buildingIds
            .map(id => Object.values(BUILDING_TYPES).find(t => t.id === id))
            .filter(b => b !== undefined);
        
        const { width } = this.cameras.main;
        const toolbarBgW = Math.min(1180, width - 20);
        const gap = 8;
        const btnW = Math.max(100, Math.floor((toolbarBgW - gap * (buildings.length - 1)) / buildings.length));
        const btnH = 38;
        const totalW = buildings.length * btnW + (buildings.length - 1) * gap;
        let x = -totalW / 2 + btnW / 2;
        
        this.buildingButtons = [];
        buildings.forEach((b) => {
            const btn = this.add.container(x, 0);
            const rect = this.add.rectangle(0, 0, btnW, btnH, b.color, 0.95);
            rect.setStrokeStyle(2, b.borderColor, 1);
            const fontSize = btnW < 110 ? '11px' : '12px';
            const label = this.add.text(0, 0, b.name, {
                fontSize,
                color: '#ffffff',
                fontFamily: 'Arial, sans-serif',
                stroke: '#000000',
                strokeThickness: 2
            }).setOrigin(0.5);
            btn.add([rect, label]);
            btn.setInteractive(new Phaser.Geom.Rectangle(-btnW/2, -btnH/2, btnW, btnH), Phaser.Geom.Rectangle.Contains);
            
            btn.on('pointerover', () => {
                if (this.currentBuildingTypeId !== b.id) {
                    rect.setAlpha(1);
                    btn.setScale(1.05);
                }
            });
            btn.on('pointerout', () => {
                if (this.currentBuildingTypeId !== b.id) {
                    rect.setAlpha(0.85);
                    btn.setScale(1.0);
                }
            });
            btn.on('pointerdown', () => {
                this.currentBuildingTypeId = b.id;
                this._updateBuildingButtonSelection();
                console.log(`🏗️ 建物タイプを選択: ${b.name}`);
            });
            
            this.buildingButtonsContainer.add(btn);
            this.buildingButtons.push({ container: btn, rect, typeId: b.id, selectedIndicator: null });
            x += btnW + gap;
        });
        
        this._updateBuildingButtonSelection();
    }
    
    _updateBuildingButtonSelection() {
        if (!this.buildingButtons) return;
        this.buildingButtons.forEach((b) => {
            const selected = b.typeId === this.currentBuildingTypeId;
            b.rect.setAlpha(selected ? 1 : 0.85);
            b.container.setScale(selected ? 1.1 : 1.0);
            
            if (selected && !b.selectedIndicator) {
                const indicator = this.add.rectangle(0, 0, b.rect.width + 6, b.rect.height + 6, 0x00ff00, 0);
                indicator.setStrokeStyle(3, 0xffff00, 1);
                b.container.add(indicator);
                indicator.setDepth(1);
                b.selectedIndicator = indicator;
            } else if (!selected && b.selectedIndicator) {
                b.selectedIndicator.destroy();
                b.selectedIndicator = null;
            }
        });
        this._updateSelectedBuildingDisplay();
    }

    
    _updateSelectedBuildingDisplay() {
        if (!this.selectedBuildingText) {
            const { width, height } = this.cameras.main;
            this.selectedBuildingText = this.add.text(width / 2, height - 165, '', {
                fontSize: '16px',
                color: '#ffffff',
                fontFamily: 'Arial, sans-serif',
                backgroundColor: '#000000',
                padding: { x: 12, y: 6 }
            }).setOrigin(0.5).setDepth(100);
        }
        
        if (!this.currentBuildingTypeId) {
            this.selectedBuildingText.setText('⚠️ 建物を選択してください（下部のツールバーから選べます）');
            this.selectedBuildingText.setBackgroundColor('#ff6b6b');
            return;
        }
        
        const type = Object.values(BUILDING_TYPES).find(t => t.id === this.currentBuildingTypeId);
        if (!type) return;
        
        this.selectedBuildingText.setText(`✅ 選択中: ${type.name} - ${type.description}`);
        this.selectedBuildingText.setBackgroundColor('#000000');
    }
    
    createStatusBar() {
        // 上部に半透明のバー
        const bar = this.add.rectangle(600, 50, 1200, 100, 0x2C3E50, 0.8);
        
        // タイトル
        this.add.text(50, 50, 'Mobile Strategy Game', {
            fontSize: '32px',
            color: '#FFFFFF',
            fontFamily: 'Arial, sans-serif'
        }).setOrigin(0, 0.5);
        
        // ステータステキスト
        this.statusText = this.add.text(50, 90, 'Connecting...', {
            fontSize: '20px',
            color: '#FFD700',
            fontFamily: 'Arial, sans-serif'
        }).setOrigin(0, 0.5);
    }
    
    // ===== UIボタン =====
    _createUIButtons() {
        const { width, height } = this.cameras.main;
        const btnSize = 50;
        
        // ワールドマップボタン（左下）
        const worldMapBtn = this._createUIButton(width - 60, height - 60, btnSize, 0x4a90e2, '🗺️', 'ワールドマップ', () => {
            console.log('🌍 ワールドマップを開く');
            alert('ワールドマップ画面（実装予定）');
        });
        
        // バッグボタン（右下）
        const bagBtn = this._createUIButton(width - 60, height - 130, btnSize, 0x8b4513, '🎒', 'バッグ', () => {
            console.log('🎒 バッグを開く');
            alert('バッグ（インベントリ）画面（実装予定）');
        });
        
        // メールボタン（右上）
        const mailBtn = this._createUIButton(width - 60, 130, btnSize, 0xff6b6b, '✉️', 'メール', () => {
            console.log('✉️ メールボックスを開く');
            alert('メールボックス画面（実装予定）');
        });
        
        // クエストボタン（右下、通知バッジ付き）
        const questBtn = this._createUIButton(width - 130, height - 60, btnSize, 0xffc107, '📋', 'クエスト', () => {
            console.log('📋 クエストを開く');
            alert('クエスト/ミッション画面（実装予定）');
        });
        // 通知バッジ（!マーク）
        const questBadge = this.add.circle(width - 130 + 18, height - 60 - 18, 10, 0xff0000);
        const questExcl = this.add.text(width - 130 + 18, height - 60 - 18, '!', { fontSize: '14px', color: '#fff', fontFamily: 'Arial, sans-serif' }).setOrigin(0.5);
        
        // ロードの才能ボタン（左上、プレイヤー情報エリア内）
        const skillBtn = this._createUIButton(60, height - 60, btnSize, 0x9b59b6, '⭐', '才能', () => {
            console.log('⭐ ロードの才能を開く');
            alert('ロードの才能（スキルツリー）画面（実装予定）');
        });
    }
    
    _createUIButton(x, y, size, bgColor, icon, tooltip, onClick) {
        const btn = this.add.container(x, y);
        const bg = this.add.circle(0, 0, size / 2, bgColor, 0.9);
        bg.setStrokeStyle(3, 0xffffff, 0.3);
        const iconText = this.add.text(0, 0, icon, { fontSize: '24px', fontFamily: 'Arial, sans-serif' }).setOrigin(0.5);
        btn.add([bg, iconText]);
        btn.setInteractive(new Phaser.Geom.Circle(0, 0, size / 2), Phaser.Geom.Circle.Contains);
        btn.on('pointerover', () => {
            bg.setAlpha(1);
            iconText.setScale(1.1);
            this.tooltipText?.setText(tooltip);
            this.tooltipText?.setPosition(x, y - size / 2 - 15);
            this.tooltipText?.setVisible(true);
        });
        btn.on('pointerout', () => {
            bg.setAlpha(0.9);
            iconText.setScale(1);
            this.tooltipText?.setVisible(false);
        });
        btn.on('pointerdown', onClick);
        btn.depth = 100;
        return btn;
    }
    
    // ===== チャットウィンドウ =====
    _createChatWindow() {
        const { width, height } = this.cameras.main;
        const chatW = 300;
        const chatH = 180;
        const chatX = width - chatW - 10;
        const chatY = height - 240;
        
        // チャット背景パネル
        const chatPanel = this.add.container(chatX + chatW / 2, chatY + chatH / 2);
        const bg = this.add.rectangle(0, 0, chatW, chatH, 0x000000, 0.6);
        bg.setStrokeStyle(2, 0xffffff, 0.3);
        chatPanel.add(bg);
        
        // チャットヘッダー
        const header = this.add.text(0, -chatH / 2 + 15, '💬 チャット', {
            fontSize: '16px',
            color: '#ffffff',
            fontFamily: 'Arial, sans-serif'
        }).setOrigin(0.5);
        chatPanel.add(header);
        
        // チャットメッセージエリア（スクロール可能）
        const messagesArea = this.add.container(0, 0);
        const messagesBg = this.add.rectangle(0, 15, chatW - 10, chatH - 50, 0x000000, 0.4);
        messagesArea.add(messagesBg);
        chatPanel.add(messagesArea);
        
        // サンプルメッセージ
        const sampleMsg = this.add.text(-chatW / 2 + 10, 10, 'ギルド: こんにちは！', {
            fontSize: '12px',
            color: '#88ff88',
            fontFamily: 'Arial, sans-serif',
            wordWrap: { width: chatW - 20 }
        }).setOrigin(0, 0);
        messagesArea.add(sampleMsg);
        
        // ツールチップ用テキスト（全ボタンで共有）
        this.tooltipText = this.add.text(0, 0, '', {
            fontSize: '14px',
            color: '#ffffff',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#000000',
            padding: { x: 8, y: 4 }
        }).setOrigin(0.5).setVisible(false).setDepth(200);
        
        chatPanel.setDepth(90);
        this.chatPanel = chatPanel;
    }
    
    setSocket(socket) {
        this.socket = socket;
        
        // messageイベントでuserIdを受け取る
        this.socket.on('message', (data) => {
            console.log('📨 Received message:', data);
            
            if (data.type === 'welcome' && data.userId) {
                // userIdをコンソールに表示
                console.log('✅ User ID:', data.userId);
                
                // ステータスバーのテキストを更新
                this.statusText.setText(`Connected as: ${data.userId.substring(0, 8)}...`);
                this.statusText.setColor('#90EE90');
            }
        });
    }
}

