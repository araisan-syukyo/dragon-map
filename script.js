// マップの初期化
const map = L.map('map', {
    center: [38.0, 137.0],
    zoom: 5,
    zoomControl: false,
    attributionControl: false
});

// 衛星写真モード (Esri World Imagery)
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri',
    maxZoom: 17,
    minZoom: 4
}).addTo(map);

// ズームコントロール
L.control.zoom({ position: 'topright' }).addTo(map);
const zoomControlContainer = document.querySelector('.leaflet-top.leaflet-right');
zoomControlContainer.style.marginTop = '80px'; 

// --- 龍体データ ---
const dragonData = [
    // 頭部
    { 
        name: "龍の角", 
        jp: "サハリン", 
        desc: "北海道の北へ一直線に伸びる細長い島。オホーツク海を割るその形状は、天を突く鋭利な角に見立てられる。", 
        lat: 48.0, lng: 142.5 
    },
    { 
        name: "龍のひげ", 
        jp: "国後島", 
        desc: "知床半島の延長線上に連なる島々。海流にたなびくように東へ伸びる姿は、龍の長い髭を連想させる。", 
        lat: 44.0, lng: 146.0 
    },
    { 
        name: "龍の鼻先", 
        jp: "知床", 
        desc: "オホーツク海へ鋭く突き出した半島。世界自然遺産にもなる手つかずの険しい山並みは、荒々しい龍の鼻梁そのもの。", 
        lat: 44.0, lng: 145.1 
    },
    { 
        name: "龍の目", 
        jp: "摩周湖", 
        desc: "カルデラ壁に囲まれた、世界有数の透明度を誇る湖。深く青い湖面は『摩周ブルー』と呼ばれ、大地の瞳のように静まり返っている。", 
        lat: 43.57, lng: 144.53 
    },
    { 
        name: "龍のくちびる", 
        jp: "根室半島", 
        desc: "北海道の東端、太平洋側へ薄く伸びる半島。知床（鼻）の下に位置し、わずかに開いた龍の上唇の形を成している。", 
        lat: 43.3, lng: 145.7 
    },
    { 
        name: "龍のあご", 
        jp: "襟裳岬", 
        desc: "日高山脈が海に落ち込む南端の岬。太平洋の荒波を受け止めるその鋭角な形状は、強靭な龍の顎骨にあたる。", 
        lat: 41.9, lng: 143.2 
    },
    { 
        name: "龍の頭全体", 
        jp: "北海道", 
        desc: "菱形の輪郭を持つ巨大な島。西（大陸）を向いたその形状は、明確に龍の頭部のシルエットを描き出している。", 
        lat: 43.0, lng: 142.0, zoom: 7 
    },
    
    // 首・胴体
    { 
        name: "龍の首", 
        jp: "津軽海峡", 
        desc: "本州と北海道を隔てるブラキストン線。生態系の境界線であり、頭部と胴体を繋ぐ重要な『くびれ』となっている。", 
        lat: 41.5, lng: 140.5 
    },
    { 
        name: "龍の心臓", 
        jp: "十和田湖", 
        desc: "火山活動によって形成された二重カルデラ湖。繰り返された噴火の歴史は、大地が脈打つ鼓動（心臓）の記憶。", 
        lat: 40.4, lng: 140.9 
    },
    { 
        name: "龍の肺", 
        jp: "岩手", 
        desc: "広大な北上山地と森林地帯。酸素を生み出し続ける緑豊かな土地は、巨大な龍の呼吸器（肺）の役割を果たす。", 
        lat: 39.7, lng: 141.1 
    },
    { 
        name: "龍の肩甲骨", 
        jp: "牡鹿半島", 
        desc: "リアス式海岸を持つ、太平洋へ突き出した半島。本州の骨格の一部として、前足の付け根にある肩甲骨のような張り出しを見せる。", 
        lat: 38.3, lng: 141.5 
    },
    { 
        name: "龍の右手", 
        jp: "房総半島", 
        desc: "太平洋を抱え込むように湾曲した半島。その鉤爪のような形状は、海流を掴もうとする龍の右手を想起させる。", 
        lat: 35.1, lng: 140.0 
    },
    { 
        name: "龍の左手・玉", 
        jp: "能登半島・珠洲", 
        desc: "日本海側で唯一大きく突出した半島。内側へ曲がる形は何かを握るようであり、先端の『珠洲（すず）』は龍が持つ宝珠とされる。", 
        lat: 37.4, lng: 137.2 
    },
    { 
        name: "龍の左乳", 
        jp: "富士山", 
        desc: "完璧な円錐形を持つ独立峰。地下深くからマグマ（エネルギー）を供給する姿は、大地を育む乳房の象徴。", 
        lat: 35.36, lng: 138.72 
    },
    { 
        name: "龍の右乳", 
        jp: "伊豆半島", 
        desc: "フィリピン海プレートが本州に衝突して生まれた半島。南から突き上げる地質学的エネルギーの隆起。", 
        lat: 34.9, lng: 138.9 
    },
    { 
        name: "龍のへそ", 
        jp: "伊勢湾", 
        desc: "日本列島のほぼ中央に位置し、構造線が交わる場所。伊勢神宮が鎮座するこの地は、身体の中心（へそ）として機能する。", 
        lat: 34.7, lng: 136.7 
    },
    { 
        name: "龍の子宮", 
        jp: "琵琶湖", 
        desc: "日本最古の古代湖であり、近畿の水源。生命を育む豊かな水瓶であることから、母なる子宮に例えられる。", 
        lat: 35.3, lng: 136.1 
    },
    
    // 下半身
    { 
        name: "龍の腰", 
        jp: "紀伊半島", 
        desc: "本州最大の半島であり、急峻な山々が連なる。列島が大きく屈曲するこの地点は、巨体を支える強靭な腰にあたる。", 
        lat: 34.0, lng: 135.8 
    },
    { 
        name: "龍の腸", 
        jp: "瀬戸内海", 
        desc: "本州、四国、九州に囲まれた内海。無数の島々と複雑な潮流が入り組む様子は、消化器官（腸）の内部構造に似る。", 
        lat: 34.2, lng: 133.2 
    },
    { 
        name: "龍の尻", 
        jp: "中国地方", 
        desc: "西へ向かってなだらかに伸びる山地。胴体の終わり部分であり、ここから四国・九州という足へと接続する。", 
        lat: 35.0, lng: 133.5 
    },
    { 
        name: "龍の右足", 
        jp: "四国", 
        desc: "太平洋側に独立して存在する大きな島。踏ん張るように配置されたその形状は、龍の力強い後ろ足に見える。", 
        lat: 33.7, lng: 133.5 
    },
    { 
        name: "龍の左足", 
        jp: "九州", 
        desc: "巨大なカルデラ（阿蘇）を持つ火の国。大陸側へ踏み出すような配置は、もう片方の後ろ足として体を支えている。", 
        lat: 32.5, lng: 131.0 
    },
    
    // 尾
    { 
        name: "龍の尾のつけ根", 
        jp: "種子島", 
        desc: "九州の南に浮かぶ細長い島。ここから南西諸島という長い尾が始まっていく、その起点の関節。", 
        lat: 30.5, lng: 130.9 
    },
    { 
        name: "龍の尾", 
        jp: "沖縄・南西諸島", 
        desc: "遥か台湾付近まで連なる島々の列。海原をうねりながら細く伸びていく姿は、まさに龍の尾そのものである。", 
        lat: 26.5, lng: 128.0, zoom: 8 
    }
];

let markers = [];

// マーカーアイコン
const dragonIcon = L.divIcon({ 
    className: 'custom-icon', 
    iconSize: [20, 20], 
    iconAnchor: [10, 10] 
});

// マーカー配置
dragonData.forEach((data, index) => {
    const marker = L.marker([data.lat, data.lng], { icon: dragonIcon }).addTo(map);
    marker.on('click', () => jumpToStep(index));
    markers.push(marker);
});


// --- ツアー機能 ---
let currentTourIndex = -1;
let tourInterval;
let isPlaying = false;

const btnPlay = document.getElementById('btn-play');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const tourProgress = document.getElementById('tour-progress');

btnPlay.addEventListener('click', toggleTour);
btnPrev.addEventListener('click', () => jumpToStep(currentTourIndex - 1));
btnNext.addEventListener('click', () => jumpToStep(currentTourIndex + 1));

function toggleTour() {
    if (isPlaying) stopTour();
    else startTour();
}

function startTour() {
    isPlaying = true;
    btnPlay.innerHTML = '■ Stop';
    btnPlay.style.background = 'rgba(255, 100, 100, 0.5)';
    
    if (currentTourIndex === -1) currentTourIndex = -1;
    playNextStep();
    // ★変更点: 12秒から10秒に変更
    tourInterval = setInterval(playNextStep, 10000);
}

function stopTour() {
    isPlaying = false;
    btnPlay.innerHTML = '▶ Tour';
    btnPlay.style.background = '';
    clearInterval(tourInterval);
}

function playNextStep() {
    jumpToStep(currentTourIndex + 1);
}

function jumpToStep(index) {
    if (index < 0) index = 0;
    if (index >= dragonData.length) {
        if (isPlaying) stopTour();
        index = dragonData.length - 1;
        return;
    }

    currentTourIndex = index;
    const data = dragonData[currentTourIndex];
    
    markers.forEach(m => L.DomUtil.removeClass(m.getElement(), 'active'));
    if (markers[index]) {
         L.DomUtil.addClass(markers[index].getElement(), 'active');
    }

    const targetZoom = data.zoom || 9;
    map.flyTo([data.lat, data.lng], targetZoom, { duration: 3.0 });

    showDetails(data);
    updateTourStatus();
}

// 詳細パネル表示
function showDetails(data) {
    const panelContent = document.querySelector('.panel-content');
    panelContent.innerHTML = `
        <span class="label">LOCATION</span>
        <span id="jp-loc" class="value">${data.jp}</span>
        <div class="description">${data.desc}</div>
    `;

    document.getElementById('part-name').innerText = data.name;
    document.getElementById('info-panel').classList.remove('hidden');
}

function closePanel() {
    document.getElementById('info-panel').classList.add('hidden');
    markers.forEach(m => L.DomUtil.removeClass(m.getElement(), 'active'));
    if (isPlaying) stopTour();
}

function updateTourStatus() {
    tourProgress.innerText = `${currentTourIndex + 1} / ${dragonData.length}`;
}
