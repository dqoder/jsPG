
let terminal = document.querySelector('#terminal > .text-area')
// var myCodeMirror = CodeMirror(document.body);
let codeArea = document.querySelector('#input > .text-area')

let buttonHide = document.querySelector('#terminal > .top-bar > button:last-of-type')
let buttonShow = document.querySelector('#input > .top-bar > button:last-of-type')

let terminalIsShowing = true


var codeMirr = CodeMirror.fromTextArea(codeArea, {
    value: "sadlfkj",
    mode: 'javascript',
    theme: 'material-darker',
    indentWithTab: true,
    lineNumbers: true,
    lineWrapping: true,
    autofocus: true,
    scrollbarStyle: 'overlay',
})


let lastText = null




function uT(str) {
    // let addMe = '\n'
    // console.log('>', `[${terminal.innerText[terminal.innerText.length - 1] == '\n'}]`)
    // if (terminal.innerText.length == 0 ||
    //     terminal.innerText[terminal.innerText.length - 1] == '\n') {
    //     addMe = ''
    // }
    // terminal.innerText += addMe + convSPtoNBSP(str) + '\n'
    if (lastText != null) {
        lastText.style.color = 'gray'
    }
    lastText = document.createElement('text')
    // lastText.textContent = convSPtoNBSP(str)
    // lastText.innerText = convSPtoNBSP(str)
    lastText.textContent = str
    terminal.appendChild(lastText)
    terminal.appendChild(document.createElement('br'))
}
/* 
function convSPtoNBSP(str) {
    let ret = str.replaceAll(' ', ' &nbsp;   ')
    console.log(ret)
    return ret;
} */

function clearTerminal() {
    while (terminal.firstChild) {
        terminal.removeChild(terminal.firstChild)
    }
}

function toggleTerminal() {
    buttonHide.classList.toggle('hidden')
    buttonShow.classList.toggle('hidden')
    document.getElementById('terminal').classList.toggle('hidden')
    terminalIsShowing = !terminalIsShowing;
}

function clearInput() {
    codeArea.value = ''
    codeMirr.setValue('')
    codeMirr.clearHistory()
}

function runInput() {
    codeMirr.save();
    try {
        eval(codeArea.value)
    }
    catch (e) {
        uT(`${e.name}: ${e.message}`)
        console.log(typeof (e), e)
    }

    terminal.scrollTop = terminal.scrollHeight;
}




console.logg = (function (old_function, div_log) {
    return function (...args) {
        old_function(...args);
        // div_log.value += text;
        uT(args.map(arg => JSON.stringify(arg)))
        // for (let k in args)
        //     uT(args[k].toString())
    };
}(console.log.bind(console), terminal));


this.addEventListener('keydown', event => {

    if (event.ctrlKey && event.altKey && event.key === 'f') {
        runInput()
    }
    if (event.ctrlKey && event.altKey && event.key === 'v') {
        clearTerminal()
    }
    if (event.ctrlKey && event.altKey && event.key === 'c') {
        clearInput()
    }
})

/* codeArea.addEventListener('keydown', function (e) {
    if (e.key == 'Tab') {
        e.preventDefault();
        var start = this.selectionStart;
        var end = this.selectionEnd;

        // set textarea value to: text before caret + tab + text after caret
        this.value += '    '
        // this.value.substring(0, start) + "\t" + this.value.substring(end);

        // put caret at right position again
        this.selectionStart =
            this.selectionEnd = start + 4;
    }
});
 */