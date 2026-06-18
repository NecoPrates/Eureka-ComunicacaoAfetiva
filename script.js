const contextInput = document.getElementById('context');
const needInput = document.getElementById('need');
const recipientInput = document.getElementById('recipient');
const toneInput = document.getElementById('tone');
const previewBox = document.getElementById('previewBox');
const previewBtn = document.getElementById('previewBtn');
const clearBtn = document.getElementById('clearBtn');

function buildMessage() {
  const context = contextInput.value.trim();
  const need = needInput.value.trim();
  const recipient = recipientInput.value.trim() || 'pessoa';
  const tone = toneInput.value;

  if (!context && !need) {
    previewBox.textContent = 'Preencha o contexto e o que você deseja comunicar para ver a sugestão de mensagem.';
    return;
  }

  const toneMap = {
    acolhedor: 'de forma acolhedora e cuidadosa',
    claro: 'de maneira clara e objetiva',
    respeitoso: 'com respeito e reconhecimento',
    direto: 'de forma direta e honesta'
  };

  const phrase = `Oi ${recipient},

${context}

Eu gostaria de dizer que ${need}. Faço isso ${toneMap[tone]} e fico aberto(a) para conversar mais se você quiser.`;

  previewBox.textContent = phrase;
}

function clearForm() {
  contextInput.value = '';
  needInput.value = '';
  recipientInput.value = '';
  toneInput.value = 'acolhedor';
  previewBox.textContent = 'Sua mensagem aparecerá aqui.';
}

previewBtn.addEventListener('click', buildMessage);
clearBtn.addEventListener('click', clearForm);
