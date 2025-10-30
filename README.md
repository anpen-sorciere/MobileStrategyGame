# Mobile Strategy Game

イベント特化型MMOストラテジーゲームプロジェクト

## プロジェクト構造

```
MobileStrategyGame/
├── server/          # Node.jsサーバーサイド
├── client/          # Phaser 3ゲームクライアント
├── shared/          # 共通コード
└── docs/            # ドキュメント
```

## セットアップ

### 前提条件

- Node.js v24.11.0以上
- npm 11.6.1以上

### 環境変数の確認

Node.jsとnpmのPATHはシステム環境変数に設定済みです。

新しいPowerShellまたはコマンドプロンプトで以下を実行して確認してください：

```powershell
node --version
npm --version
```

両方のコマンドが実行できれば環境は整っています。

### 開発環境の起動方法

#### 方法1: バッチファイルで起動（最も簡単！）

**`start-game.bat`をダブルクリックするだけ：**

```
start-game.bat
```

これで、サーバーとクライアントが自動的に起動します。
それぞれ別のコマンドウィンドウが開き、実行状態が確認できます。

#### 方法2: PowerShellスクリプト

**通常のPowerShell（Cursorの統合ターミナルではない）で実行：**

```powershell
.\start-dev.ps1
```

これで、サーバーとクライアントが自動的に起動します。

#### 方法3: 手動起動

2つのPowerShellターミナルを開いて、それぞれで起動：

**ターミナル1 - サーバー:**
```bash
cd server
npm run dev
```

**ターミナル2 - クライアント:**
```bash
cd client
npm run dev
```

### サーバー側のセットアップ

```bash
cd server
npm install
npm run dev
```

### クライアント側のセットアップ

```bash
cd client
npm install
npm run dev
```

### ポート番号

- **サーバー**: `http://localhost:3000` (Socket.IO)
- **クライアント**: `http://localhost:5173` (Vite開発サーバー)

## 開発

- **クライアント**: Phaser 3.70.0 + Vite
- **サーバー**: Node.js + Express + Socket.IO
- **通信**: Socket.IO (リアルタイム双方向通信)

## トラブルシューティング

### 環境変数が反映されない場合

Cursorの統合ターミナルでは環境変数が正しく反映されない場合があります。

以下の方法を試してください：

1. **通常のPowerShellを使用**（推奨）
2. **start-dev.ps1スクリプトを使用**（PATHを自動設定）
3. **手動でPATHを設定**：
   ```powershell
   $env:Path = $env:Path + ";C:\Program Files\nodejs"
   ```

## 詳細

詳細な仕様については `docs/MobileStrategyGameDocs.md` を参照してください。
