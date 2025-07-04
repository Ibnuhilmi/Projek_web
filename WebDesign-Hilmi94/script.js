// Sample province data (in a real application, this would come from an API)
const provinces = [
    {
        id: 1,
        name: "Jawa Barat",
        capital: "Bandung",
        population: 48277942,
        area: 35377.76,
        island: "Jawa",
        culture: "Sunda",
        dance: "Jaipong",
        house: "Imah Badak Heuay",
        image: "https://i.pinimg.com/736x/da/5b/5c/da5b5c45024ecc4c582faccf772f9669.jpg"
    },
    {
        id: 2,
        name: "Bali",
        capital: "Denpasar",
        population: 4316400,
        area: 5780.06,
        island: "Bali",
        culture: "Bali",
        dance: "Pendet",
        house: "Bale",
        image: "https://d3uyff779abz3k.cloudfront.net/-lempuyang-/image/Bali-Handara-Gate.jpg"
    },
    {
        id: 3,
        name: "Sumatera Utara",
        capital: "Medan",
        population: 14780000,
        area: 72981.23,
        island: "Sumatera",
        culture: "Batak",
        dance: "Tortor",
        house: "Rumah Bolon",
        image: "https://mudanews.com/file/2019/12/WhatsApp-Image-2019-12-24-at-15.14.01.jpeg"
    },
    {
        id: 4,
        name: "Sulawesi Selatan",
        capital: "Makassar",
        population: 9046000,
        area: 46717.48,
        island: "Sulawesi",
        culture: "Bugis",
        dance: "Pattudu",
        house: "Tongkonan",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbQJzJqAkzX99IooGEN5NmJ3sY266B1ccarg&s"
    },
    {
        id: 5,
        name: "Papua Barat",
        capital: "Manokwari",
        population: 1134068,
        area: 102955.15,
        island: "Papua",
        culture: "Papua",
        dance: "Yospan",
        house: "Honai",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD8GG47TJtEmT3c3bI4pSOKvsmIsoJC50XUw&s"
    },
    {
        id: 6,
        name: "Kalimantan Timur",
        capital: "Samarinda",
        population: 3701100,
        area: 129066.64,
        island: "Kalimantan",
        culture: "Dayak",
        dance: "Gantar",
        house: "Lamin",
        image: "https://static.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/p2/179/2024/09/07/WhatsApp-Image-2024-09-06-at-132834-3783454306.jpeg"
    }
];

// Cultural elements data for visualization
const culturalData = [
    { region: "Sumatera", dances: 87, languages: 52, traditions: 120 },
    { region: "Jawa", dances: 68, languages: 15, traditions: 95 },
    { region: "Kalimantan", dances: 42, languages: 74, traditions: 88 },
    { region: "Sulawesi", dances: 58, languages: 62, traditions: 105 },
    { region: "Bali & Nusa Tenggara", dances: 47, languages: 28, traditions: 76 },
    { region: "Maluku & Papua", dances: 63, languages: 271, traditions: 92 }
];

// DOM elements
const provincesGrid = document.querySelector('.provinces-grid');
const chartContainer = document.querySelector('.chart');
const filterButtons = document.querySelectorAll('.filter-btn');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

// Generate province cards
function generateProvinceCards(provinces) {
    provincesGrid.innerHTML = '';
    
    provinces.forEach(province => {
        const card = document.createElement('div');
        card.className = 'province-card';
        
        // Format population number
        const populationFormatted = province.population > 1000000 
            ? `${(province.population / 1000000).toFixed(1)} jt` 
            : `${(province.population / 1000).toFixed(1)} rb`;
        
        card.innerHTML = `
            <div class="card-header">
                <img src="${province.image}" alt="${province.name}">
                <div class="province-name">${province.name}</div>
            </div>
            <div class="card-body">
                <div class="card-stats">
                    <div class="stat-item">
                        <div class="stat-value">${populationFormatted}</div>
                        <div class="stat-label">Penduduk</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${province.area.toLocaleString()} km²</div>
                        <div class="stat-label">Luas</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${province.culture}</div>
                        <div class="stat-label">Budaya</div>
                    </div>
                </div>
                <p class="card-desc">Ibukota: ${province.capital} | Tarian: ${province.dance} | Rumah Adat: ${province.house}</p>
            </div>
            <div class="card-footer">
                <span>Pulau: ${province.island}</span>
                <!-- <button class="btn btn-outline">Detail</button> -->
            </div>
        `;
        
        provincesGrid.appendChild(card);
    });
}

// Generate chart bars with the corrected structure
function generateChartBars() {
    // Find max value for scaling
    const maxValue = Math.max(...culturalData.map(item => 
        Math.max(item.dances, item.languages, item.traditions)
    ));
    
    chartContainer.innerHTML = '';
    
    culturalData.forEach(item => {
        const dancesHeight = (item.dances / maxValue) * 100;
        const languagesHeight = (item.languages / maxValue) * 100;
        const traditionsHeight = (item.traditions / maxValue) * 100;
        
        const barGroup = document.createElement('div');
        barGroup.className = 'bar-group';
        
        barGroup.innerHTML = `
            <div class="bars">
                <div class="bar" style="height: ${dancesHeight}%">
                    <div class="bar-value">${item.dances}</div>
                    <div class="bar-label">Tari</div>
                </div>
                <div class="bar" style="height: ${languagesHeight}%">
                    <div class="bar-value">${item.languages}</div>
                    <div class="bar-label">Bahasa</div>
                </div>
                <div class="bar" style="height: ${traditionsHeight}%">
                    <div class="bar-value">${item.traditions}</div>
                    <div class="bar-label">Adat</div>
                </div>
            </div>
            <div class="region-label">${item.region}</div>
        `;
        
        chartContainer.appendChild(barGroup);
    });
}

// Filter provinces by island
function filterProvinces(island) {
    if (island === 'Semua') {
        generateProvinceCards(provinces);
    } else {
        const filtered = provinces.filter(province => province.island === island);
        generateProvinceCards(filtered);
    }
}

// Initialize the page
function init() {
    generateProvinceCards(provinces);
    generateChartBars();
    
    // Add event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            // Filter provinces
            filterProvinces(button.textContent);
        });
    });
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // Cegah error jika href adalah "#" atau tidak valid
            if (href && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}


// fitur aksebilitas
let accessibilityEnabled = false;
let zoomLevel = 1;
const synth = window.speechSynthesis;
const accessBtn = document.getElementById('accessibility-toggle');
const zoomInBtn = document.getElementById('zoom-in');
const zoomOutBtn = document.getElementById('zoom-out');

function speakText(text) {
    if (!accessibilityEnabled || !synth) return;
    synth.cancel();
    synth.speak(new SpeechSynthesisUtterance(text));
}

function addAccessibility() {
    document.querySelectorAll('a, button, img, p, h1, h2, h3, h4, span')
    .forEach(el => {
        el._speakHandler = () => {
        const label = el.alt
                    || el.getAttribute('aria-label')
                    || el.innerText.trim()
                    || 'Elemen diklik';
        speakText(label);
        };
        el.addEventListener('click', el._speakHandler);
    });
    document.body.classList.add('accessibility-mode');
    accessBtn.classList.add('active');
    accessBtn.setAttribute('aria-label','Fitur Disabilitas aktif');
}

function removeAccessibility() {
    document.querySelectorAll('a, button, img, p, h1, h2, h3, h4, span')
    .forEach(el => {
        el.removeEventListener('click', el._speakHandler);
    });
    document.body.classList.remove('accessibility-mode');
    accessBtn.classList.remove('active');
    accessBtn.setAttribute('aria-label','Fitur Disabilitas mati');
    synth.cancel();
    // reset zoom
    zoomLevel = 1;
    document.body.style.zoom = zoomLevel;
}

accessBtn.addEventListener('click', () => {
    accessibilityEnabled = !accessibilityEnabled;
    if (accessibilityEnabled) {
        addAccessibility();
        alert("Fitur disabilitas diaktifkan.");
        speakText("Fitur disabilitas diaktifkan.");
    } else {
        removeAccessibility();
        alert("Fitur disabilitas dinonaktifkan.");
        speakText("Fitur disabilitas dinonaktifkan.");
    }
});

// Zoom controls
zoomInBtn.addEventListener('click', () => {
    zoomLevel = Math.min(zoomLevel + 0.1, 2);
    document.body.style.zoom = zoomLevel;
});
zoomOutBtn.addEventListener('click', () => {
    zoomLevel = Math.max(zoomLevel - 0.1, 0.5);
    document.body.style.zoom = zoomLevel;
});

// Notifikasi otomatis saat load (masih ada di kode sebelumnya)
window.addEventListener('load', () => {
    setTimeout(() => {
        alert("🔊 Website ini mendukung fitur disabilitas. Klik 🔊 di pojok kanan bawah untuk mengaktifkan.");
        const info = new SpeechSynthesisUtterance(
            "Website ini mendukung fitur disabilitas. Klik ikon speaker di pojok kanan bawah untuk mengaktifkan."
        );
        window.speechSynthesis.speak(info);
    }, 1000);
});

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
