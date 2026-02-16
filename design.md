# ArU-code蔵スターシステムR デザイン仕様書

## 概要
このドキュメントは、ArU-code蔵スターシステムRのモックアプリケーションのデザイン仕様をまとめ、横画面版から縦画面版への改修に向けた検討事項を整理します。

---

## 現行版デザイン仕様（横画面: 736px × 414px）

### 画面サイズ
- **アスペクト比**: 736:414 (約16:9の横長)
- **想定デバイス**: iPhone 横画面（ランドスケープモード）
- **表示領域**: 90vw（最大1200px）

### カラーパレット

#### 主要カラー
- **プライマリブルー**: `#1E90FF` - ボタン、アイコン、強調要素
- **プライマリブルー（ホバー）**: `#1873CC`
- **背景グラデーション**: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`

#### セクション別カラー
- **黄色セクション（検索条件）**: `#FFF9E6` (背景), `#FFD700` (ボーダー)
- **オレンジヘッダー（テーブル）**: `#FF8C00`
- **木目調背景（作業画面）**: `linear-gradient(135deg, #D2B48C 0%, #C19A6B 100%)`
- **iPhoneフレーム**: `#1f1f1f` (ダークグレー)

#### テキストカラー
- **基本テキスト**: `#333`
- **薄いテキスト**: `#666`, `#999`
- **ホワイトテキスト**: `white` (ヘッダー、ボタン、ステータスバー)

### タイポグラフィ

#### フォントファミリー
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
```

#### フォントサイズ（横画面版）
- **ヘッダータイトル**: 22px
- **画面タイトル**: 28px
- **アプリタイトル（ログイン）**: 32px
- **バージョン表示**: 24px
- **メニューボタン**: 28px
- **通常ボタン**: 18px
- **入力フィールド**: 20px
- **フォームラベル**: 18px
- **テーブルヘッダー**: 14px (bold)
- **テーブルセル**: 14px
- **情報ラベル**: 18px
- **情報値（大）**: 32px (bold)
- **情報値（通常）**: 18px

### コンポーネント設計

#### 1. ボタン

##### プライマリボタン（青色、WiFiアイコン付き）
```css
background: #1E90FF;
color: white;
padding: 15px 40px;
border-radius: 30px;
font-size: 18px;
font-weight: bold;
```
- 用途: ログイン、検索、開始、完了
- アイコン: WiFiアイコン（📶）右側配置

##### メニューボタン（大型）
```css
background: #1E90FF;
padding: 30px 50px;
border-radius: 15px;
font-size: 28px;
font-weight: bold;
box-shadow: 0 4px 10px rgba(30, 144, 255, 0.3);
```
- 用途: メニュー選択、機能選択

##### 戻るボタン（丸形）
```css
width: 50px;
height: 50px;
border-radius: 50%;
background: #1E90FF;
color: white;
font-size: 24px;
```
- 配置: 左上固定
- アイコン: ◀

##### 削除ボタン（丸形）
```css
width: 50px;
height: 50px;
border-radius: 50%;
background: #1E90FF;
color: white;
font-size: 24px;
```
- 配置: 右上固定
- アイコン: 🗑️

#### 2. 入力フィールド

##### テキスト入力
```css
width: 100%;
max-width: 400px;
padding: 15px 20px;
font-size: 20px;
border: 2px solid #333;
border-radius: 5px;
```
- フォーカス時: `border-color: #1E90FF`

##### フォーム入力（検索条件）
```css
flex: 1;
padding: 12px 15px;
font-size: 18px;
border: 2px solid #ddd;
border-radius: 5px;
```

#### 3. チェックボックス

##### 標準チェックボックス
```css
width: 20px;
height: 20px;
cursor: pointer;
```
- 配置: ラベルテキストと8px間隔

##### テーブル内チェックボックス
```css
width: 18px;
height: 18px;
cursor: pointer;
```

#### 4. テーブル

##### ヘッダー行
```css
background: #FF8C00;
color: white;
position: sticky;
top: 0;
z-index: 5;
```

##### データ行
```css
border-bottom: 1px solid #ddd;
```
- ホバー時: `background: #f5f5f5`

##### セル
```css
padding: 12px 10px;
border: 1px solid #ddd;
white-space: nowrap;
font-size: 14px;
```

#### 5. セクション

##### 黄色セクション（検索条件）
```css
background: #FFF9E6;
padding: 20px;
border-radius: 8px;
border: 2px solid #FFD700;
```

#### 6. アイコン

##### フッターアイコン
```css
font-size: 32px;
cursor: pointer;
color: #1E90FF;
```
- 配置: 右下固定
- アイコン: ⚙️, ℹ️, 👤

### レイアウト構造

#### IMG_1: ログイン画面
```
┌──────────────────────────────────────┐
│ ⚙️                                    │
│                                      │
│   ArU-code蔵スターシステムR          │
│   Ver. 1.0.4                         │
│                                      │
│   [ユーザーID入力]                   │
│   [パスワード入力]                   │
│                                      │
│   [ログイン 📶]                      │
│                                      │
└──────────────────────────────────────┘
```
- レイアウト: センター配置、縦方向フレックス

#### IMG_2/3/6: メニュー選択画面
```
┌──────────────────────────────────────┐
│ ◀  メニュー選択                      │
├──────────────────────────────────────┤
│                                      │
│         [仕分け管理]                 │
│                                      │
│         [送り状管理]                 │
│                                      │
│                          ⚙️ ℹ️ 👤   │
└──────────────────────────────────────┘
```
- レイアウト: センター配置、縦方向フレックス
- ボタン間隔: 30px

#### IMG_4: 検索条件画面
```
┌──────────────────────────────────────┐
│ ◀  仕分け登録（検索条件）            │
├──────────────────────────────────────┤
│ 【基本情報】    │ 【検索条件】       │
│ 出荷日:        │ ┌───────────────┐  │
│ 納品日:        │ │運送便種別      │  │
│ 運送便CD:      │ │☑フィット便    │  │
│               │ │☑路線便        │  │
│               │ │☑宅配便        │  │
│               │ └───────────────┘  │
│               │ 【仕分け内容】      │
│               │ [検索 📶]          │
└──────────────────────────────────────┘
```
- レイアウト: 2カラム（1:2比率）
- 左: 基本情報、右: 検索条件・ボタン

#### IMG_5: 選択開始画面
```
┌──────────────────────────────────────┐
│ ◀  仕分け登録（選択開始）            │
├──────────────────────────────────────┤
│ ☑│運送便│着店│温度帯│荷姿│出荷│納品│ │
│ ─┼─────┼───┼─────┼───┼───┼───┤ │
│ ☐│156:  │AC02│常温/ │ケー│02/ │02/ │ │
│ ☐│156:  │AC03│常温/ │ケー│02/ │02/ │ │
│ ☐│156:  │AC04│常温/ │ケー│02/ │02/ │ │
├──────────────────────────────────────┤
│            [開始 📶]                 │
└──────────────────────────────────────┘
```
- レイアウト: テーブル＋下部ボタン
- テーブル: スクロール可能、ヘッダー固定

#### IMG_7: 仕分け登録実行画面
```
┌──────────────────────────────────────┐
│ ◀  仕分け登録                    🗑️ │
├──────────────────────────────────────┤
│                                      │
│ 開始時仕分数（済/総）        0 / 30  │
│ 開始後仕分数                      0  │
│ 残数                             30  │
│ 新規アラート                         │
│ 対象外アラート                       │
│ 着店非表示                           │
│ 対象外                          なし │
│                                      │
│                    [完了 📶]         │
└──────────────────────────────────────┘
```
- レイアウト: 縦方向フレックス、情報項目は上部、ボタンは下部右寄せ

---

## 縦画面版デザイン検討（改修後: 375px × 667px）

### 画面サイズ変更
- **新アスペクト比**: 375:667 (約9:16の縦長)
- **想定デバイス**: iPhone 縦画面（ポートレートモード）
- **表示領域**: 調整検討中

### レイアウト変更の必要性

#### 優先度: 高

##### 1. IMG_4: 検索条件画面
- **現状**: 2カラムレイアウト（横に並列）
- **課題**: 縦画面では横幅が足りず、2カラムが窮屈
- **改修案**:
  - 1カラムレイアウトに変更（縦に積み上げ）
  - 基本情報 → 検索条件 → 仕分け内容 → 検索ボタンの順に配置
  - スクロール対応必須

##### 2. IMG_5: 選択開始画面（テーブル）
- **現状**: 8列のワイドテーブル
- **課題**: 縦画面では列が多すぎて見づらい
- **改修案**:
  - テーブルを横スクロール対応にする
  - または、重要列のみ表示し、詳細は行をタップで展開
  - または、カード形式に変更（1行1カード）

##### 3. メニューボタンのサイズ調整
- **現状**: padding: 30px 50px, font-size: 28px
- **課題**: 縦画面では高さ方向に余裕があり、ボタンを大きくできる
- **改修案**:
  - ボタンの高さを維持または拡大
  - 横幅は画面幅に合わせて調整（max-width設定）

#### 優先度: 中

##### 4. フォントサイズ調整
- **検討事項**: 縦画面では横幅が狭いため、一部のフォントサイズを見直す
- **候補**:
  - アプリタイトル（ログイン）: 32px → 28px
  - メニューボタン: 28px → 24px
  - 画面タイトル: 28px → 24px
  - テーブルフォント: 14px → 12px（または維持）

##### 5. 余白・パディング調整
- **検討事項**: 横幅が狭くなるため、左右の余白を最適化
- **候補**:
  - phone-content の padding を調整
  - 各セクションの padding を縮小
  - ボタンの左右 padding を調整

#### 優先度: 低

##### 6. ステータスバーの配置
- **現状**: 横長レイアウト
- **検討事項**: 縦画面では標準的なステータスバー配置に変更
- **候補**: そのまま維持（大きな変更不要）

##### 7. フッターアイコンの配置
- **現状**: 右下に横並び
- **検討事項**: 縦画面でも右下配置で問題ないか確認
- **候補**: そのまま維持、または下部中央に配置

### UI/UX改善提案

#### A. タッチ操作の最適化
- **ボタンのタップ領域**: 最小44px × 44pxを確保（iOS Human Interface Guidelines）
- **チェックボックスのタップ領域**: 現在20px → 最小30px推奨
- **行全体のタップ対応**: テーブル行全体をタップ可能に（チェックボックスのみでなく）

#### B. スクロール体験の向上
- **スムーズスクロール**: `scroll-behavior: smooth` の適用
- **スクロールインジケーター**: 長いリストには進捗表示を追加
- **Infinite Scroll**: 大量データの場合、無限スクロール検討

#### C. フィードバック強化
- **ローディング表示**: ボタン押下時のローディングインジケーター
- **成功/エラー通知**: トーストメッセージまたはアラート
- **バリデーション**: 入力エラー時のリアルタイムフィードバック

#### D. アクセシビリティ
- **コントラスト比**: WCAG AA基準（4.5:1以上）の確保
- **フォーカス表示**: キーボードナビゲーション時の明確なフォーカス
- **aria-label**: アイコンボタンへのaria-label追加

---

## 画面別改修方針

### IMG_1: ログイン画面
- **変更度**: 低
- **理由**: センター配置の縦並びレイアウトは縦画面と相性が良い
- **調整項目**:
  - フォントサイズの微調整
  - ボタン幅の調整（max-width設定）
  - 余白の最適化

### IMG_2/3/6: メニュー選択画面
- **変更度**: 低
- **理由**: 縦並びボタンは縦画面向き
- **調整項目**:
  - ボタンサイズの調整
  - ボタン間隔の調整
  - フッターアイコンの配置確認

### IMG_4: 検索条件画面
- **変更度**: 高
- **理由**: 2カラムレイアウトが縦画面では困難
- **調整項目**:
  - 1カラムレイアウトへの変更
  - セクションの積み上げ配置
  - スクロール領域の設定
  - チェックボックスグループの配置最適化

### IMG_5: 選択開始画面
- **変更度**: 高
- **理由**: ワイドテーブルが縦画面では見づらい
- **調整項目**:
  - テーブルの横スクロール対応
  - または、カード形式レイアウトへの変更
  - 列の優先順位付け（非表示列の検討）
  - フォントサイズの調整

### IMG_7: 仕分け登録実行画面
- **変更度**: 低
- **理由**: 縦並びの情報表示は縦画面と相性が良い
- **調整項目**:
  - 情報項目の間隔調整
  - 木目調背景の維持
  - ボタン配置の調整

---

## 実装優先順位

### Phase 1: 基本的な縦画面対応
1. iPhoneフレームのアスペクト比変更（736:414 → 375:667）
2. 全画面のレスポンシブ対応確認
3. フォントサイズの一律調整
4. ボタンサイズ・余白の調整

### Phase 2: レイアウト改修
1. IMG_4: 2カラム → 1カラムへの変更
2. IMG_5: テーブルの横スクロール対応
3. メニューボタンのレイアウト最適化

### Phase 3: UI/UX改善
1. タッチ領域の拡大
2. スムーズスクロールの実装
3. ローディング・フィードバック機能
4. アクセシビリティ対応

---

## 技術的検討事項

### CSS変更箇所

#### アスペクト比変更
```css
/* 現行版 */
.phone-frame {
  aspect-ratio: 736 / 414; /* 横画面 */
}

/* 改修版 */
.phone-frame {
  aspect-ratio: 375 / 667; /* 縦画面 */
}
```

#### メディアクエリの追加
```css
/* 縦画面専用のスタイル調整 */
@media (aspect-ratio: 375/667) {
  /* 縦画面用の調整 */
}
```

#### フレックスボックス調整（IMG_4）
```css
/* 現行版: 横並び */
.search-content {
  display: flex;
  flex-direction: row;
  gap: 30px;
}

/* 改修版: 縦並び */
.search-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
```

#### テーブルスクロール対応（IMG_5）
```css
/* 追加 */
.table-container {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.data-table {
  min-width: 800px; /* 最小幅を設定して横スクロール */
}
```

### JavaScript変更箇所
- 画面サイズ検出ロジックの追加
- テーブル行タップイベントの追加（チェックボックス切り替え）
- スムーズスクロールの実装
- バリデーション機能の追加

---

## UI改修（モダンデザイン対応）

### 改修日
2026-02-16

### 参考デザイン
- **ベース**: SoftBankアプリ（images/updated/IMG_0281.PNG, IMG_0282.PNG）
- **デザイン方向性**: モダン、クリーン、カード型UI

### デザイン要素の抽出

#### 1. 背景デザイン
- **現状**: 紫のグラデーション（`linear-gradient(135deg, #667eea 0%, #764ba2 100%)`）
- **改修後**: 淡い青〜白のグラデーション
  ```css
  background: linear-gradient(180deg, #f0f4f8 0%, #ffffff 100%);
  ```
- **装飾**: 浮遊する青い円（デザインアクセント、オプション）

#### 2. カラースキーム

##### プライマリカラー
- **メインブルー**: `#007AFF` （iOS標準ブルー）
- **ホバー時**: `#0051D5`
- **アクティブ時**: `#004FC4`

##### 背景カラー
- **ベース背景**: `#f0f4f8` → `#ffffff` グラデーション
- **カード背景**: `#ffffff`
- **セカンダリ背景**: `#f8f9fa`

##### アクセントカラー
- **成功**: `#34C759` （緑）
- **警告**: `#FF9500` （オレンジ）
- **エラー**: `#FF3B30` （赤）
- **情報**: `#007AFF` （青）

##### テキストカラー
- **プライマリ**: `#1c1c1e`
- **セカンダリ**: `#3a3a3c`
- **ターシャリ**: `#8e8e93`

#### 3. ボタンデザイン

##### プライマリボタン（主要アクション）
```css
.btn-primary {
  background: linear-gradient(135deg, #007AFF 0%, #0051D5 100%);
  color: white;
  padding: 14px 28px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 122, 255, 0.25);
  transition: all 0.3s ease;
}

.btn-primary:hover {
  box-shadow: 0 6px 16px rgba(0, 122, 255, 0.35);
  transform: translateY(-2px);
}

.btn-primary:active {
  transform: translateY(0);
}
```

##### セカンダリボタン（補助アクション）
```css
.btn-secondary {
  background: white;
  color: #007AFF;
  padding: 14px 28px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  border: 2px solid #007AFF;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: #f0f4f8;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}
```

##### メニューボタン（大型）
```css
.menu-btn {
  background: white;
  color: #1c1c1e;
  padding: 24px 32px;
  border-radius: 16px;
  font-size: 20px;
  font-weight: 600;
  border: none;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.menu-btn:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  transform: translateY(-4px);
}
```

##### 戻るボタン（丸型）
```css
.back-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: white;
  color: #007AFF;
  border: 1px solid #e5e5ea;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.back-btn:hover {
  background: #f0f4f8;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
```

#### 4. カード型デザイン

##### 基本カード
```css
.card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}
```

##### テーブル行をカード化（オプション）
```css
.table-row-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease;
}

.table-row-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}
```

#### 5. テーブルデザイン

##### ヘッダー
- **現状**: オレンジ背景（`#FF8C00`）
- **改修後**: 淡いグレー背景 + 濃いテキスト
  ```css
  .table-header-row {
    background: #f8f9fa;
    color: #1c1c1e;
  }
  ```

##### テーブル行
```css
.table-row {
  background: white;
  border-bottom: 1px solid #e5e5ea;
  transition: all 0.2s ease;
}

.table-row:hover {
  background: #f8f9fa;
}
```

#### 6. 入力フィールド

```css
.input-field {
  background: white;
  border: 1px solid #e5e5ea;
  border-radius: 10px;
  padding: 12px 16px;
  font-size: 16px;
  color: #1c1c1e;
  transition: all 0.2s ease;
}

.input-field:focus {
  outline: none;
  border-color: #007AFF;
  box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1);
}
```

#### 7. チェックボックス

```css
.checkbox {
  width: 22px;
  height: 22px;
  border: 2px solid #c7c7cc;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.checkbox:checked {
  background: #007AFF;
  border-color: #007AFF;
}
```

#### 8. 開発用ナビゲーション

##### フッター
```css
.dev-navigation {
  background: #2c3e50;
  color: white;
  padding: 16px 24px;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
}

.nav-btn {
  background: transparent;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.5);
}

.nav-btn:active {
  background: rgba(255, 255, 255, 0.05);
}

.page-indicator {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  font-weight: 500;
}
```

#### 9. モード切り替えスイッチ

```css
.mode-switch {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e5ea;
}

.mode-btn {
  padding: 8px 16px;
  border: none;
  background: transparent;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #3a3a3c;
}

.mode-btn.active {
  background: #007AFF;
  color: white;
}

.mode-btn:hover:not(.active) {
  background: #f8f9fa;
}
```

#### 10. 検索条件セクション

##### 黄色セクション → 淡いブルーセクション
```css
.condition-section {
  background: #f0f8ff;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #d1e7ff;
}
```

### タイポグラフィ

#### フォントファミリー
- **変更なし**: システムフォント（-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif）

#### フォントウェイト
- **タイトル**: 700（Bold）→ 600（Semibold）
- **ボタン**: 700（Bold）→ 600（Semibold）
- **通常テキスト**: 400（Regular）

### 影（Box Shadow）の標準化

```css
/* 小 */
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.06);

/* 中 */
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);

/* 大 */
--shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12);

/* 特大 */
--shadow-xl: 0 12px 32px rgba(0, 0, 0, 0.15);
```

### アニメーション

#### トランジション
- **標準**: `all 0.2s ease`
- **ボタン/カード**: `all 0.3s ease`

#### ホバーエフェクト
- **Y軸移動**: `translateY(-2px)` または `translateY(-4px)`
- **影の拡大**: shadow-md → shadow-lg

### 実装優先順位

#### Phase 1: 基本カラー・背景の変更
1. 背景グラデーションの変更
2. プライマリカラーの変更（紫 → 青）
3. 開発用ナビゲーションの背景変更

#### Phase 2: ボタンの改修
1. プライマリボタンのデザイン変更
2. メニューボタンのカード化
3. 戻るボタンのスタイル変更

#### Phase 3: テーブル・リストの改修
1. テーブルヘッダーの色変更
2. 行のホバー効果改善
3. カード型レイアウト（オプション）

#### Phase 4: 細部の調整
1. 入力フィールドのスタイル
2. チェックボックスのデザイン
3. モード切り替えスイッチ
4. 検索条件セクションの色変更

---

## 次ステップ

1. **デザインレビュー**: この仕様書をもとに改修方針を確定
2. **プロトタイプ作成**: 主要画面（IMG_4, IMG_5）の縦画面版プロトタイプ
3. **フィードバック収集**: ユーザビリティテストの実施
4. **本実装**: 承認後、全画面の縦画面対応実装

---

## 参考資料

### デザインガイドライン
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/ios/)
- [Material Design](https://material.io/design)

### アクセシビリティ
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)

### レスポンシブデザイン
- [Responsive Web Design Basics](https://web.dev/responsive-web-design-basics/)

---

**作成日**: 2026-02-16
**最終更新日**: 2026-02-16
**バージョン**: 2.0（UI改修方針追加）
**作成者**: Claude Code
