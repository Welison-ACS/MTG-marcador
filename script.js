// lógica simples e robusta — funciona por toque/click
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
// press and hold implementation
let holdTimer = null;
let holdTarget = null;

function startHold(btn) {
  holdTarget = btn;
  holdTimer = setTimeout(() => {
    const player = btn.closest('.player');
    const lifeEl = player.querySelector('.life');
    let val = parseInt(lifeEl.textContent, 10) || 0;
    if (btn.classList.contains('plus')) val += 5;
    else if (btn.classList.contains('minus')) val -= 5;
    lifeEl.textContent = val;
  }, 450); // 450ms para reconhecer hold
}

function cancelHold() {
  clearTimeout(holdTimer);
  holdTimer = null;
  holdTarget = null;
}

document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('pointerdown', (ev) => {
    startHold(btn);
  });
  btn.addEventListener('pointerup', cancelHold);
  btn.addEventListener('pointercancel', cancelHold);
  btn.addEventListener('pointerleave', cancelHold);
});

// reset com duplo toque no centro (debug / util)
// duplo clique reseta todos para 40
document.addEventListener('dblclick', (e) => {
  const any = e.target.closest('.player .life');
  if (!any) return;
  document.querySelectorAll('.player .life').forEach(el => el.textContent = 40);
});
