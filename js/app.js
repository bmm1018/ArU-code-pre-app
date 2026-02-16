// ==================== 定数定義 ====================
const SCREEN_FLOW = {
    'IMG_1': { next: 'IMG_2', back: null, title: 'ログイン' },
    'IMG_2': { next: 'IMG_3', back: 'IMG_1', title: 'メニュー選択' },
    'IMG_3': { next: 'IMG_4', back: 'IMG_2', title: '機能選択（仕分け管理）' },
    'IMG_4': { next: 'IMG_5', back: 'IMG_3', title: '検索条件' },
    'IMG_5': { next: 'IMG_7', back: 'IMG_4', title: '選択開始' },
    'IMG_6': { next: 'IMG_4', back: 'IMG_2', title: '機能選択（送り状管理）' },
    'IMG_7': { next: null, back: 'IMG_5', title: '仕分け登録実行' },
    // 量販モード
    'IMG_RETAIL_CLIENT': { next: 'IMG_RETAIL_DELIVERY', back: 'IMG_4', title: '取引先一覧' },
    'IMG_RETAIL_DELIVERY': { next: 'IMG_RETAIL_DEPT', back: 'IMG_RETAIL_CLIENT', title: '配送先一覧' },
    'IMG_RETAIL_DEPT': { next: 'IMG_7', back: 'IMG_RETAIL_DELIVERY', title: '部門一覧' },
    // DCモード
    'IMG_DC_TRANSPORT': { next: 'IMG_DC_DIRECTION', back: 'IMG_4', title: '運送便一覧' },
    'IMG_DC_DIRECTION': { next: 'IMG_DC_STORE', back: 'IMG_DC_TRANSPORT', title: '方面一覧' },
    'IMG_DC_STORE': { next: 'IMG_7', back: 'IMG_DC_DIRECTION', title: '着店CD一覧' }
};

const SCREEN_LIST = ['IMG_1', 'IMG_2', 'IMG_3', 'IMG_4', 'IMG_5', 'IMG_6', 'IMG_7', 'IMG_RETAIL_CLIENT', 'IMG_RETAIL_DELIVERY', 'IMG_RETAIL_DEPT', 'IMG_DC_TRANSPORT', 'IMG_DC_DIRECTION', 'IMG_DC_STORE'];

// ==================== アプリケーション状態 ====================
let currentScreen = 'IMG_1';
let screenHistory = ['IMG_1'];
let currentMode = localStorage.getItem('appMode') || 'retail'; // 'retail' or 'dc'

// ==================== DOM要素 ====================
let elements = {};

// ==================== 初期化 ====================
function initApp() {
    // DOM要素の取得
    elements = {
        phoneContent: document.getElementById('phoneContent'),
        prevBtn: document.getElementById('prevBtn'),
        nextBtn: document.getElementById('nextBtn'),
        pageIndicator: document.getElementById('pageIndicator')
    };

    // イベントリスナーの設定
    setupEventListeners();

    // モードの初期化
    initMode();

    // 初期画面の表示
    displayScreen(currentScreen);
}

// ==================== イベントリスナー ====================
function setupEventListeners() {
    // 前へボタン（開発用）
    elements.prevBtn.addEventListener('click', () => {
        const currentIndex = SCREEN_LIST.indexOf(currentScreen);
        if (currentIndex > 0) {
            navigateTo(SCREEN_LIST[currentIndex - 1]);
        }
    });

    // 次へボタン（開発用）
    elements.nextBtn.addEventListener('click', () => {
        const currentIndex = SCREEN_LIST.indexOf(currentScreen);
        if (currentIndex < SCREEN_LIST.length - 1) {
            navigateTo(SCREEN_LIST[currentIndex + 1]);
        }
    });

    // キーボードナビゲーション
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            elements.prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            elements.nextBtn.click();
        }
    });
}

// ==================== 画面遷移 ====================
function navigateTo(screenId) {
    currentScreen = screenId;
    screenHistory.push(screenId);

    // 履歴は10件まで保持
    if (screenHistory.length > 10) {
        screenHistory.shift();
    }

    displayScreen(screenId);
}

// ==================== 戻る ====================
function goBack() {
    if (screenHistory.length > 1) {
        screenHistory.pop(); // 現在の画面を削除
        const previousScreen = screenHistory[screenHistory.length - 1];
        currentScreen = previousScreen;
        displayScreen(previousScreen);
    } else {
        // 履歴がない場合はフロー定義を使用
        const flowBack = SCREEN_FLOW[currentScreen].back;
        if (flowBack) {
            navigateTo(flowBack);
        }
    }
}

// ==================== 画面表示 ====================
function displayScreen(screenId) {
    currentScreen = screenId;

    // すべての画面を非表示
    const allScreens = document.querySelectorAll('.screen');
    allScreens.forEach(screen => {
        screen.classList.remove('active');
    });

    // 該当する画面を表示
    const targetScreen = document.getElementById(`screen-${screenId}`);
    if (targetScreen) {
        targetScreen.classList.add('active');
    } else {
        console.warn(`画面 ${screenId} が見つかりません`);
    }

    // ページインジケーターの更新
    const currentIndex = SCREEN_LIST.indexOf(screenId);
    elements.pageIndicator.textContent = `${currentIndex + 1}/${SCREEN_LIST.length}`;

    // ボタンの有効/無効
    elements.prevBtn.disabled = currentIndex === 0;
    elements.nextBtn.disabled = currentIndex === SCREEN_LIST.length - 1;

    // タイトルの更新
    document.title = `${SCREEN_FLOW[screenId].title} - ArU-code蔵スターシステムR`;
}

// ==================== アプリケーション起動 ====================
document.addEventListener('DOMContentLoaded', initApp);

// ==================== モード管理 ====================
function switchMode(mode) {
    currentMode = mode;
    localStorage.setItem('appMode', mode);

    // UI更新
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === mode);
    });

    // body要素にdata-mode属性を設定（CSS制御用）
    document.body.setAttribute('data-mode', mode);

    console.log(`モード切り替え: ${mode === 'retail' ? '量販モード' : 'DCモード'}`);
}

function initMode() {
    // 保存されているモードを復元
    const savedMode = localStorage.getItem('appMode') || 'retail';
    currentMode = savedMode;

    // body要素にdata-mode属性を設定
    document.body.setAttribute('data-mode', savedMode);

    // UIに反映（IMG_2が表示されている場合）
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === savedMode);
    });
}

// ==================== 検索条件処理 ====================
function searchCondition() {
    if (currentMode === 'retail') {
        // 量販モード：取引先一覧へ遷移
        navigateTo('IMG_RETAIL_CLIENT');
    } else if (currentMode === 'dc') {
        // DCモード：運送便一覧へ遷移
        navigateTo('IMG_DC_TRANSPORT');
    }
}

// ==================== 量販モード：画面遷移 ====================
function selectClient(clientId) {
    console.log('取引先選択:', clientId);
    navigateTo('IMG_RETAIL_DELIVERY');
}

function selectDelivery(deliveryId) {
    console.log('配送先選択:', deliveryId);
    navigateTo('IMG_RETAIL_DEPT');
}

// ==================== チェックボックス制御 ====================
function toggleAllCheckboxes(type) {
    const selectAllCheckbox = document.getElementById(`selectAll${type.charAt(0).toUpperCase() + type.slice(1)}`);
    const checkboxes = document.querySelectorAll(`.${type}-checkbox`);

    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAllCheckbox.checked;
    });

    updateStartButton();
}

function updateStartButton() {
    const deptCheckboxes = document.querySelectorAll('.dept-checkbox:checked');
    const startButtonContainer = document.getElementById('deptStartButtonContainer');

    if (deptCheckboxes.length > 0) {
        startButtonContainer.style.display = 'block';
    } else {
        startButtonContainer.style.display = 'none';
    }
}

function startWork() {
    if (currentMode === 'retail') {
        const selectedDepts = Array.from(document.querySelectorAll('.dept-checkbox:checked'))
            .map(cb => cb.closest('tr').querySelector('.table-cell:nth-child(2)').textContent);
        console.log('選択された部門:', selectedDepts);
    } else if (currentMode === 'dc') {
        // 方面一覧から開始する場合
        const selectedDirections = Array.from(document.querySelectorAll('.direction-checkbox:checked'))
            .map(cb => cb.closest('tr').querySelector('.clickable-cell').textContent);
        if (selectedDirections.length > 0) {
            console.log('選択された方面:', selectedDirections);
        }

        // 着店一覧から開始する場合
        const selectedStores = Array.from(document.querySelectorAll('.store-checkbox:checked'))
            .map(cb => cb.closest('tr').querySelector('.table-cell:nth-child(2)').textContent);
        if (selectedStores.length > 0) {
            console.log('選択された着店:', selectedStores);
        }
    }
    navigateTo('IMG_7');
}

// ==================== DCモード：画面遷移 ====================
function selectTransport(transportId) {
    console.log('運送便選択:', transportId);
    navigateTo('IMG_DC_DIRECTION');
}

function selectDirection(directionId) {
    console.log('方面選択（着店一覧へ）:', directionId);
    navigateTo('IMG_DC_STORE');
}

function updateDirectionButton() {
    const directionCheckboxes = document.querySelectorAll('.direction-checkbox:checked');
    const buttonContainer = document.getElementById('directionButtonContainer');

    if (directionCheckboxes.length > 0) {
        buttonContainer.style.display = 'block';
    } else {
        buttonContainer.style.display = 'none';
    }
}

function updateStoreButton() {
    const storeCheckboxes = document.querySelectorAll('.store-checkbox:checked');
    const startButtonContainer = document.getElementById('storeStartButtonContainer');

    if (storeCheckboxes.length > 0) {
        startButtonContainer.style.display = 'block';
    } else {
        startButtonContainer.style.display = 'none';
    }
}

// ==================== グローバル関数（HTML内から呼び出し用） ====================
window.navigateTo = navigateTo;
window.goBack = goBack;
window.switchMode = switchMode;
window.searchCondition = searchCondition;
// 量販モード
window.selectClient = selectClient;
window.selectDelivery = selectDelivery;
window.toggleAllCheckboxes = toggleAllCheckboxes;
window.updateStartButton = updateStartButton;
window.startWork = startWork;
// DCモード
window.selectTransport = selectTransport;
window.selectDirection = selectDirection;
window.updateDirectionButton = updateDirectionButton;
window.updateStoreButton = updateStoreButton;
