const balanceE = document.getElementById("balance") // document позволяет вытащить кнопку, текст, картинку, поле, зашоловки с помощью id //
const betE = document.getElementById("bet")
const spinButton = document.getElementById("spinButton")   
const message = document.getElementById("message")
const reel1 = document.getElementById("reel1")
const reel2 = document.getElementById("reel2")
const reel3 = document.getElementById("reel3")
const min = document.getElementById("min")
const all = document.getElementById("all")
const authScreen = document.getElementById('autoScreen')
const userNameI = document.getElementById('userName')
const loginB = document.getElementById('loginB')
const authMessage = document.getElementById('authMessege')

const userName = document.getElementById('username')

let username =localStorage.getItem('username')

let balance =  10000 // localStorage память сайта, помогает сохранить данные после закрытия сайта. getItem берет значение из ключа balance. тк это строка, то Number превращает в int. || 10000 на случай какого то херового знвчения (можно заменить или) //

function loadPlayer(name) {
    username = name

    const savedBalance = localStorage.getItem("balance_" + username)

    if (savedBalance === null) {
        balance = 10000
        localStorage.setItem("balance_" + username, balance)
    } else {
        balance = Number(savedBalance)
    }

    authScreen.style.display = "none"

    updateBalance()
}


loginB.addEventListener("click", function () {
    const enteredName = userNameI.value.trim()

    if (!enteredName) {
        authMessage.textContent = "ВВЕДИ ИМЯ!"
        return
    }

    localStorage.setItem("username", enteredName)

    loadPlayer(enteredName)
})

function updateBalance() {
    balanceE.textContent = balance

    if (username) {
        localStorage.setItem("balance_" + username, balance)
    }
}

const symbols = [
    "🍒",
    "🍋",
    "💎",
    "7️⃣"] // массив, индексы также начинаются с 0 // 

const multipliers = {
    "🍒": 5,
    "🍋": 10,
    "💎": 25,
    "7️⃣": 50} // это objects, то есть если выпадет алмаз получим 25



function getRandomSymbol() {
    const randomIndex = Math.floor(Math.random() * symbols.length) 
    return symbols[randomIndex]
} // math.random возвращает число от 0 до 1, lenght это число эл-ов. Таким образом мы умножаем рандом число на 4, округляем его в меньшую сторону и получаем индекс для каждого эл-та, в конце возвращаем случайный символ // 


spinButton.addEventListener("click", spin) // при нажатии кнопки будет работать функция spin, вообще js может ждать click, input, change, keydown, mousemove, submit //

min.addEventListener("click", minn)
all.addEventListener("click", alll)

function minn(){
    betE.value = 10
}

function alll(){
    betE.value = balance
}

function spin() {
    const bet = Number(betE.value) // betE.value значение поля 

    if (balance == 0){
        message.textContent = "БАЛИК НОЛЬ, СЪЕБАЛСЯ НАХУЙ"
        return
    }

    if (bet <= 0){
        message.textContent = "Введи норм ставку, а то я краснею"
        return 
    }

   if (bet > balance){
    MediaKeyMessageEvent.textContent = "бабок не ма"
    return
   }
    
    balance -= bet
    updateBalance()
    spinButton.ariaDisabled = true // отключили кнопку //

    let animation = setInterval(() => {
        reel1.textContent = getRandomSymbol();  reel2.textContent = getRandomSymbol(); reel3.textContent = getRandomSymbol()
    }, 100) // setInterval задаёт интервал в миллисекундах // 

    setTimeout(() => {
        clearInterval(animation)
        const result1 = getRandomSymbol()
        const result2 = getRandomSymbol()
        const result3 = getRandomSymbol()

        reel1.textContent = result1
        reel2.textContent = result2
        reel3.textContent = result3
        if (result1 === result2 && result2 === result3){
            const multiplier = multipliers[result1]
            const win = bet * multiplier
            balance += win
            message.textContent =  `🎉 ПОБЕДА! +${win}` //Вот это: `...` называется template literal. Можно вставлять переменные через:${переменная} Например: const name = "Родион"; console.log(`Привет, ${name}!`);получится:Привет, Родион! //
        }else{
            message.textContent = `😢 Не повезло. -${bet}`
        }

        spinButton.disable = false
    }, 1000) // повторять каждую секунду //
}

