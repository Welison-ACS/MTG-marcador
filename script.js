// clique simples para +/-1
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn');
  if (!btn) return;

  const player = btn.closest('.player');
  if (!player) return;

  const lifeEl = player.querySelector('.life');
  let val = parseInt(lifeEl.textContent, 10) || 0;

  if (btn.classList.contains('plus')) {
    val = val + 1;
  } else if (btn.classList.contains('minus')) {
    val = val - 1;
  }

  lifeEl.textContent = val;
});

// toque longo para +5 / -5 (opcional)
let holdTimer = null;
function startHold(btn) {
  holdTimer = setTimeout(() => {
    const player = btn.closest('.player');
    const lifeEl = player.querySelector('.life');
    let val = parseInt(lifeEl.textContent, 10) || 0;
    if (btn.classList.contains('plus')) val += 5;
    else if (btn.classList.contains('minus')) val -= 5;
    lifeEl.textContent = val;
  }, 450);
}
function cancelHold() { clearTimeout(holdTimer); holdTimer = null; }

document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('pointerdown', () => startHold(btn));
  btn.addEventListener('pointerup', cancelHold);
  btn.addEventListener('pointercancel', cancelHold);
  btn.addEventListener('pointerleave', cancelHold);
});

// duplo clique no centro de qualquer painel reseta todos (útil para testes)
document.addEventListener('dblclick', (e) => {
  if (!e.target.closest('.player')) return;
  document.querySelectorAll('.player .life').forEach(el => el.textContent = 40);
});
