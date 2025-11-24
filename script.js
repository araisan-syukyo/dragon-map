// マップの初期化
const map = L.map('map', {
    center: [38.0, 137.0],
    zoom: 5,
    zoomControl: false,
    attributionControl: false
});

// 地形がはっきり見える「衛星写真」モード (Esri World Imagery)
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
    { name: "龍の角", jp: "サハリン", lat: 48.0, lng: 142.5 },
    { name: "龍のひげ", jp: "国後島", lat: 44.0, lng: 146.0 },
    { name: "龍の鼻先", jp: "知床", lat: 44.0, lng: 145.1 },
    // ▼ ここを変更しました ▼
    { name: "龍の目", jp: "摩周湖", lat: 43.57, lng: 144.53 },
    // ▲ ここを変更しました ▲
    { name: "龍のくちびる", jp: "根室半島", lat: 43.3, lng: 145.7 },
    { name: "龍のあご", jp: "襟裳岬", lat: 41.9, lng: 143.2 },
    { name: "龍の頭全体", jp: "北海道", lat: 43.0, lng: 142.0, zoom: 7 },
    
    // 首・胴体
    { name: "龍の首", jp: "津軽海峡", lat: 41.5, lng: 140.5 },
    { name: "龍の心臓", jp: "十和田湖", lat: 40.4, lng: 140.9 },
    { name: "龍の肺", jp: "岩手", lat: 39.7, lng: 141.1 },
    { name: "龍の肩甲骨", jp: "牡鹿半島", lat: 38.3, lng: 141.5 },
    { name: "龍の右手", jp: "房総半島", lat: 35.1, lng: 140.0 },
    { name: "龍の左手・玉", jp: "能登半島・珠洲", lat: 37.4, lng: 137.2 },
    { name: "龍の左乳", jp: "富士山", lat: 35.36, lng: 138.72 },
    { name: "龍の右乳", jp: "伊豆半島", lat: 34.9, lng: 138.9 },
    { name: "龍のへそ", jp: "伊勢湾", lat: 34.7, lng: 136.7 },
    { name: "龍の子宮", jp: "琵琶湖", lat: 35.3, lng: 136.1 },
    
    // 下半身
    { name: "龍の腰", jp: "紀伊半島", lat: 34.0, lng: 135.8 },
    { name: "龍の腸", jp: "瀬戸内海", lat: 34.2, lng: 133.2 },
    { name: "龍の尻", jp: "中国地方", lat: 35.0, lng: 133.5 },
    { name: "龍の右足", jp: "四国", lat: 33.7, lng: 133.5 },
    { name: "龍の左足", jp: "九州", lat: 32.5, lng: 131.0 },
    
    // 尾
    { name: "龍の尾のつけ根", jp: "種子島", lat: 30.5, lng: 130.9 },
    { name: "龍の尾", jp: "沖縄", lat: 26.5, lng: 128.0, zoom: 8 }
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
    tourInterval = setInterval(playNextStep, 5000);
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
    map.flyTo([data.lat, data.lng], targetZoom, { duration: 2.0 });

    showDetails(data);
    updateTourStatus();
}

function showDetails(data) {
    document.getElementById('part-name').innerText = data.name;
    document.getElementById('jp-loc').innerText = data.jp;
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
