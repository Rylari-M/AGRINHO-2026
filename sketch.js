/* =========================================================
   AGRO FORTE — Site 100% renderizado em p5.js (canvas único)
   Navegação: clique no menu superior
   Páginas: Início | Sobre | Dicas | Práticas | Contato
   ========================================================= */

const COLORS = {
  bg:       "#f5f1e8",
  primary:  "#2f6b3a",
  primaryD: "#1f4a27",
  accent:   "#d4a017",
  text:     "#222222",
  muted:    "#5a5a5a",
  card:     "#ffffff",
};

const PAGES = ["Início", "Sobre", "Dicas", "Práticas", "Contato"];
let currentPage = 0;

let leaves = [];
let scrollY = 0;
let contentHeight = 1200;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont("Georgia");
  for (let i = 0; i < 25; i++) {
    leaves.push(new Leaf(random(width), random(-height, height)));
  }
}

function windowResized() { 
  resizeCanvas(windowWidth, windowHeight); 
}

function draw() {
  background(COLORS.bg);

  // Área de conteúdo com scroll
  push();
  translate(0, -scrollY);
  drawPage(currentPage);
  pop();

  // Folhas animadas no fundo (em todas as páginas)
  for (let l of leaves) { 
    l.update(); 
    l.show(); 
  }

  // Header fixo
  drawHeader();
}

/* ---------- HEADER / NAV ---------- */
function drawHeader() {
  noStroke();
  fill(COLORS.primary);
  rect(0, 0, width, 70);

  // Logo
  fill(COLORS.accent);
  textSize(24); 
  textStyle(BOLD); 
  textAlign(LEFT, CENTER);
  text("🌱 Agro Forte", 30, 35);

  // Menu
  textSize(15); 
  textStyle(NORMAL);
  let x = width - 30;
  for (let i = PAGES.length - 1; i >= 0; i--) {
    const label = PAGES[i];
    const w = textWidth(label) + 20;
    const hover = mouseX > x - w && mouseX < x && mouseY < 70;
    fill(i === currentPage ? COLORS.accent : (hover ? "#ffffff" : "#e8e8e8"));
    textAlign(RIGHT, CENTER);
    text(label, x, 35);
    x -= w;
  }
}

function mousePressed() {
  if (mouseY > 70) return;
  let x = width - 30;
  for (let i = PAGES.length - 1; i >= 0; i--) {
    const w = textWidth(PAGES[i]) + 20;
    if (mouseX > x - w && mouseX < x) {
      currentPage = i;
      scrollY = 0;
      return;
    }
    x -= w;
  }
}

function mouseWheel(e) { 
  scrollY = constrain(scrollY + e.delta, 0, max(0, contentHeight - height + 100)); 
}

/* ---------- PÁGINAS ---------- */
function drawPage(idx) {
  switch (idx) {
    case 0: pageHome(); break;
    case 1: pageSobre(); break;
    case 2: pageDicas(); break;
    case 3: pagePraticas(); break;
    case 4: pageContato(); break;
  }
}

function drawTitle(t, y) {
  fill(COLORS.primaryD);
  textAlign(CENTER, TOP); 
  textStyle(BOLD); 
  textSize(44);
  text(t, width/2, y);
}

function drawParagraph(t, y, maxW = 700) {
  fill(COLORS.text);
  textAlign(CENTER, TOP); 
  textStyle(NORMAL); 
  textSize(16);
  text(t, width/2 - maxW/2, y, maxW);
}

function drawCard(x, y, w, h, title, body) {
  noStroke();
  fill(COLORS.card);
  rect(x, y, w, h, 14);
  fill(COLORS.primary);
  textAlign(LEFT, TOP); 
  textStyle(BOLD); 
  textSize(20);
  text(title, x + 20, y + 18);
  fill(COLORS.muted); 
  textStyle(NORMAL); 
  textSize(14);
  text(body, x + 20, y + 55, w - 40);
}

/* INÍCIO */
function pageHome() {
  // Hero
  fill(COLORS.primary); 
  noStroke();
  rect(0, 70, width, 360);
  fill(COLORS.accent);
  textAlign(CENTER, CENTER); 
  textStyle(BOLD); 
  textSize(56);
  text("Agro Forte", width/2, 200);
  fill("#ffffff"); 
  textSize(22); 
  textStyle(NORMAL);
  text("Futuro sustentável no campo.", width/2, 260);
  
  // Botão
  fill(COLORS.accent);
  rect(width/2 - 110, 310, 220, 50, 25);
  fill(COLORS.primaryD); 
  textStyle(BOLD); 
  textSize(16);
  text("Ver dicas →", width/2, 335);

  drawTitle("Nossos pilares", 480);
  const items = [
    ["Solo Vivo", "Cobertura, compostagem e rotação que regeneram a terra."],
    ["Água Consciente", "Captação, reúso e irrigação por gotejamento."],
    ["Energia Limpa", "Solar e biogás transformam fazendas."],
    ["Ciclo Circular", "Resíduos viram insumo: nada se perde."],
  ];
  const cw = 240, ch = 160, gap = 20;
  const totalW = items.length * cw + (items.length-1) * gap;
  let sx = width/2 - totalW/2;
  for (let i = 0; i < items.length; i++) {
    drawCard(sx + i*(cw+gap), 560, cw, ch, items[i][0], items[i][1]);
  }
  contentHeight = 800;
}

/* SOBRE */
function pageSobre() {
  drawTitle("Sobre o projeto", 110);
  drawParagraph(
    "Agro Forte nasceu para mostrar que produção e meio ambiente podem caminhar juntos. " +
    "Apresentamos práticas, dados e ideias para um agro mais responsável, fértil e duradouro.",
    190
  );
  drawTitle("Missão", 320);
  drawParagraph("Inspirar produtores e estudantes a adotar técnicas sustentáveis no campo.", 400);
  drawTitle("Visão", 480);
  drawParagraph("Um Brasil onde cada hectare cultivado também regenera o ecossistema.", 560);
  contentHeight = 700;
}

/* DICAS */
function pageDicas() {
  drawTitle("Dicas Sustentáveis", 110);
  const dicas = [
    ["1. Rotação de culturas", "Alterne plantas para preservar nutrientes do solo."],
    ["2. Adubação verde", "Use leguminosas para fixar nitrogênio naturalmente."],
    ["3. Irrigação por gotejamento", "Economiza até 60% de água."],
    ["4. Compostagem", "Resíduos orgânicos viram adubo de alta qualidade."],
    ["5. Plantio direto", "Reduz erosão e mantém a estrutura do solo."],
    ["6. Energia solar", "Bombas e cercas elétricas movidas a sol."],
  ];
  const cw = 320, ch = 130, gap = 20;
  const cols = 2;
  const sx = width/2 - (cols*cw + gap)/2;
  for (let i = 0; i < dicas.length; i++) {
    const r = floor(i / cols), c = i % cols;
    drawCard(sx + c*(cw+gap), 200 + r*(ch+gap), cw, ch, dicas[i][0], dicas[i][1]);
  }
  contentHeight = 200 + 3*(130+20) + 100;
}

/* PRÁTICAS */
function pagePraticas() {
  drawTitle("Práticas Regenerativas", 110);
  drawParagraph("Conheça técnicas que regeneram solo, água e biodiversidade.", 190);
  const praticas = [
    ["Agrofloresta", "Combina árvores, lavouras e animais no mesmo espaço, ampliando biodiversidade."],
    ["Pastoreio rotacionado", "O gado se move entre piquetes, dando tempo ao pasto se recuperar."],
    ["Cobertura permanente", "Mantém o solo sempre coberto, protegendo de sol e chuva forte."],
    ["Bioinsumos", "Microorganismos e extratos vegetais substituem agroquímicos."],
  ];
  const cw = 320, ch = 150, gap = 20;
  const sx = width/2 - (2*cw + gap)/2;
  for (let i = 0; i < praticas.length; i++) {
    const r = floor(i/2), c = i%2;
    drawCard(sx + c*(cw+gap), 280 + r*(ch+gap), cw, ch, praticas[i][0], praticas[i][1]);
  }
  contentHeight = 800;
}

/* CONTATO */
function pageContato() {
  drawTitle("Fale Conosco", 110);
  drawParagraph("Entre em contato com a responsável pelo projeto:", 190);

  // Card central
  const cw = 460, ch = 180;
  const cx = width/2 - cw/2, cy = 260;
  noStroke(); 
  fill(COLORS.card);
  rect(cx, cy, cw, ch, 16);

  fill(COLORS.primary);
  textAlign(CENTER, TOP); 
  textStyle(BOLD); 
  textSize(22);
  text("Rylari Maria de Oliveira Camargo", width/2, cy + 35);

  fill(COLORS.muted); 
  textStyle(NORMAL); 
  textSize(14);
  text("E-mail para contato:", width/2, cy + 80);

  fill(COLORS.accent); 
  textStyle(BOLD); 
  textSize(18);
  text("rylari.camargo@escola.pr.gov.br", width/2, cy + 110);

  contentHeight = 600;
}

/* ---------- FOLHAS ANIMADAS ---------- */
class Leaf {
  constructor(x, y) {
    this.x = x; 
    this.y = y;
    this.size = random(8, 18);
    this.speed = random(0.3, 1.2);
    this.sway = random(0.5, 1.5);
    this.angle = random(TWO_PI);
    this.color = random([COLORS.primary, COLORS.accent, "#7ba05b"]);
  }
  
  update() {
    this.y += this.speed;
    this.x += sin(this.angle) * this.sway;
    this.angle += 0.02;
    if (this.y > height + 20) { 
      this.y = -20; 
      this.x = random(width); 
    }
  }
  
  show() {
    noStroke();
    fill(this.color + "88"); // Hex + 88 adiciona opacidade (semi-transparente)
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    ellipse(0, 0, this.size*0.6, this.size);
    pop();
  }
}
