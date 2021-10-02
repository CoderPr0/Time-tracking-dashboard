/* HTML variables */
let currentTime = document.querySelectorAll('.current')
let previousTime = document.querySelectorAll('.previous')
let periods = document.querySelectorAll('.periods')


/* data.json converter */
getData = () => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status ==200) {
            let myData = JSON.parse(this.responseText)
            dataChange(myData)
        }
    }
    xhttp.open("GET", "data.json", true);
    xhttp.send();
}

getData()


/* For data changes */
dataChange = (object) => {

    /* Changes the data */
    changesToData = (object, period, prev) => {
        currentTime.forEach((time, i) => {
            time.textContent = `${object[i].timeframes[period].current}hrs`
        })
        previousTime.forEach((time, i) => {
            time.textContent = `${prev} - ${object[i].timeframes[period].previous}hrs`
        })
        
        periods.forEach((item) => {
            item.classList.remove('active')})

        document.querySelector(`.${period}`).classList.add('active')
    }

    /* Functions for switching between periods */
    daily = () => {
        changesToData(object, 'daily', 'Yesterday')
    }
    weekly = () => {
        changesToData(object, 'weekly', 'Last week')
    }
    monthly = () => {
        changesToData(object, 'monthly', 'Last month')
    }

    weekly()
}

