# Assets Guide

このディレクトリはゲーム内アセット(画像/音声など)の格納場所です。画像の基本仕様は以下の通りです。

- マップチップサイズ: 128x128 px (仕様)
- 画像形式: PNG 推奨 (透過有り)
- 命名規則: `building:<id>` に対応するファイル名を使用 (詳細は下記)

## 配置先

```
client/assets/
  ├─ buildings/           # 建物画像
  │   ├─ military/        # 軍事・統治 (castle, academy, barracks, prison, altar, hospital, guild)
  │   ├─ resources/       # 資源 (farm, quarry, mine, lumber, vault, manor)
  │   └─ hero_trade/      # ヒーロー・交易 (hero_hall, colosseum, merchant, trade_hall, forge, monster_cage)
  └─ tiles/               # 地面などのマップチップ
```

## 建物ファイル名 (128x128, 透過PNG 推奨)

- military:
  - castle.png, academy.png, barracks.png, prison.png, altar.png, hospital.png, guild.png
- resources:
  - farm.png, quarry.png, mine.png, lumber.png, vault.png, manor.png
- hero_trade:
  - hero_hall.png, colosseum.png, merchant.png, trade_hall.png, forge.png, monster_cage.png

オプション:
- 解像度差分: `<id>@1x.png`, `<id>@2x.png`
- レベル差分: `<id>_lv1.png`, `<id>_lv2.png` ...
- アニメ: `<id>_000.png`, `<id>_001.png` ...

## タイル(地面など)

`client/assets/tiles/` に 128x128 px のタイル画像を配置します。
例: `grass.png`, `road.png`, `water.png`

## 置き方(手順)

1) あなたの建物画像を以下のいずれかに配置してください:
   - `client/assets/buildings/military/`
   - `client/assets/buildings/resources/`
   - `client/assets/buildings/hero_trade/`
2) ファイル名は上記のIDに対応させてください (例: `castle.png`, `farm.png`)。
3) 地面タイルは `client/assets/tiles/` に配置してください。

配置が完了したら知らせてください。プリロード実装と描画を画像テクスチャに切り替えます。


