const API_URL = 'http://localhost:5000/api/teas';

// 炫光移動邏輯
document.addEventListener('mousemove', (e) => {
    const glow = document.getElementById('glow');
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
});

// 控制「其他」輸入框的顯示
function toggleOther(id) {
    const select = document.getElementById(id);
    const otherInput = document.getElementById(id + 'Other');
    if (select.value === '其他') {
        otherInput.classList.remove('hidden');
    } else {
        otherInput.classList.add('hidden');
    }
}

// 取得資料並渲染 (Read)
async function fetchTeas() {
    try {
        const res = await fetch(API_URL);
        const teas = await res.json();
        const list = document.getElementById('teaList');
        list.innerHTML = '';

        teas.forEach(tea => {
            const card = document.createElement('div');
            card.className = 'bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/20 flex flex-col justify-between transform transition hover:-translate-y-2';
            
            // 這裡假設後端還沒存評分，我們隨機模擬，之後可改為讀取資料庫
            const scores = [Math.floor(Math.random()*5)+1, Math.floor(Math.random()*5)+1, 3, 4, 2];

            card.innerHTML = `
                <div>
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="text-2xl font-bold text-emerald-900">${tea.name}</h3>
                        <button onclick="deleteTea('${tea._id}')" class="text-stone-300 hover:text-red-500 transition">
                            <i data-lucide="trash-2" size="18"></i>
                        </button>
                    </div>
                    <div class="flex gap-2 mb-4">
                        <span class="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full font-bold">${tea.type}</span>
                        <span class="bg-stone-100 text-stone-600 text-xs px-2 py-1 rounded-full font-bold">${tea.origin || '未知產地'}</span>
                    </div>
                    <div id="chart-${tea._id}" class="h-56"></div>
                </div>
                <div class="mt-4 pt-4 border-t border-stone-100 flex justify-between items-center text-sm">
                    <span class="text-stone-400">目前庫存</span>
                    <span class="font-bold text-emerald-700 text-lg">${tea.amount}g</span>
                </div>
            `;
            list.appendChild(card);
            // 呼叫渲染圖表，傳入預設或儲存的數值
            renderChart(`chart-${tea._id}`, scores);
        });
        lucide.createIcons();
    } catch (e) { console.error("資料讀取失敗", e); }
}

// 渲染雷達圖
function renderChart(elementId, scores) {
    const options = {
        series: [{ name: '風味指標', data: scores }],
        chart: { height: '100%', type: 'radar', toolbar: { show: false } },
        xaxis: { 
            categories: ['香氣', '甜度', '苦澀', '回甘', '醇厚'],
            labels: { style: { colors: ['#065f46'], fontSize: '12px' } }
        },
        fill: { opacity: 0.4, colors: ['#10b981'] },
        stroke: { show: true, width: 2, colors: ['#059669'], dashArray: 0 },
        markers: { size: 4, colors: ['#fff'], strokeColors: '#059669', strokeWidth: 2 },
        yaxis: { show: false, min: 0, max: 5, tickAmount: 5 }
    };
    new ApexCharts(document.querySelector(`#${elementId}`), options).render();
}

// 新增茶葉 (Create)
document.getElementById('teaForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // 處理「其他」選項的邏輯
    const finalType = document.getElementById('type').value === '其他' 
        ? document.getElementById('typeOther').value 
        : document.getElementById('type').value;
    
    const finalCountry = document.getElementById('country').value === '其他' 
        ? document.getElementById('countryOther').value 
        : document.getElementById('country').value;
    
    const city = document.getElementById('city').value;
    
    // 獲取評分
    const currentScores = [
        document.getElementById('score-aroma').value,
        document.getElementById('score-sweet').value,
        document.getElementById('score-bitter').value,
        document.getElementById('score-aftertaste').value,
        document.getElementById('score-strength').value
    ];

    const teaData = {
        name: document.getElementById('name').value,
        type: finalType,
        origin: `${finalCountry} ${city}`, // 組合產地
        amount: document.getElementById('amount').value,
        // 如果後端有欄位可存，就傳送評分資料
        // scores: currentScores 
    };

    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(teaData)
        });
        fetchTeas();
        e.target.reset();
        // 重置隱藏欄位
        document.getElementById('typeOther').classList.add('hidden');
        document.getElementById('countryOther').classList.add('hidden');
    } catch (e) { alert("儲存失敗"); }
});

// 刪除茶葉 (Delete)
async function deleteTea(id) {
    if(confirm('要從譜中移除這段香氣嗎？')) {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchTeas();
    }
}

fetchTeas();