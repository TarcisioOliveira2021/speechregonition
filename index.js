const button = document.querySelector('button')
const text = document.querySelector('.text')

/* Chamada da função*/
const recognition = createRecognition()
/* Variavel de controle 
    - Verifica se o botão está funcionando.
*/
let listening = false;

/* Evento de clique no botão */
button.addEventListener('click', e => {
    if (!recognition) return;

    listening ? recognition.stop() : recognition.start()
    /* Mudando o texto do botão quando clicar. */
    button.innerHTML = listening ? 'Aperte para falar' : 'Parar de escutar'
    button.classList.toggle('bg-purple-200')
    button.classList.toggle('text-red-500')
})

/* API para conversão do fala em texto
   - Compatibilidade apenas com o Chorme atualmente. 
   - A função createRecognition vai criar um recognition. 
*/

function createRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    /* Se o recognition for diferente de indefinido crie um novo SpeechRecognition 
       se não é null.
    */
    const recognition = SpeechRecognition !== undefined ? new SpeechRecognition() : null

    /* Verificação caso o recognition não exista 
       - Retorna o texto.
    */
    if (!recognition) {
        text.innerHTML = "Speech Recognition is not found! "
        return null
    }

    /* Configuração caso o recognition exista. 
       - '() =>' Criando uma função
       - e = evento.  
    */
    recognition.lang = "pt_BR"
    recognition.onstart = () => listening = true
    recognition.onend = () => listening = false
    recognition.onerror = e => console.log('error', e)
    /* Pega a fala e transcrever */
    recognition.onresult = e => text.innerHTML = e.results[0][0].transcript

    return recognition
}

