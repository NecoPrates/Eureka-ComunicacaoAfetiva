const contextInput = document.getElementById('context');
const needInput = document.getElementById('need');
const recipientInput = document.getElementById('recipient');
const toneInput = document.getElementById('tone');
const receptorProfileInput = document.getElementById('receptorProfile');
const telosInput = document.getElementById('telos');
const previewBox = document.getElementById('previewBox');
const previewBtn = document.getElementById('previewBtn');
const clearBtn = document.getElementById('clearBtn');

let eurekaEngine = null;

async function loadEurekaConfig() {
  try {
    const response = await fetch('EUREKA_CORE.json');
    if (!response.ok) throw new Error('Não foi possível carregar o config EUREKA.');
    const config = await response.json();
    eurekaEngine = new EurekaCommunicationEngine(config);
  } catch (error) {
    previewBox.textContent = 'Erro ao carregar o framework EUREKA: ' + error.message;
  }
}

async function buildMessage() {
  const context = contextInput.value.trim();
  const need = needInput.value.trim();
  const recipient = recipientInput.value.trim() || 'pessoa';
  const receptorProfile = receptorProfileInput.value.trim() || 'perfil indefinido';
  const telos = telosInput.value.trim() || 'alcançar entendimento mútuo';

  if (!context && !need) {
    previewBox.textContent = 'Preencha o contexto e o que você deseja comunicar para ver a sugestão de mensagem.';
    return;
  }

  if (!eurekaEngine) {
    previewBox.textContent = 'Framework EUREKA não está disponível. Atualize a página.';
    return;
  }

  const message = `${context}. ${need}`;
  const output = await eurekaEngine.processMessage({
    receptorProfile,
    message,
    telos
  });

  previewBox.textContent = output;
}

function clearForm() {
  contextInput.value = '';
  needInput.value = '';
  recipientInput.value = '';
  toneInput.value = 'acolhedor';
  receptorProfileInput.value = '';
  telosInput.value = '';
  previewBox.textContent = 'Sua mensagem aparecerá aqui.';
}

previewBtn.addEventListener('click', buildMessage);
clearBtn.addEventListener('click', clearForm);
window.addEventListener('DOMContentLoaded', loadEurekaConfig);
