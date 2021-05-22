$(document).ready(function () {
    $('[data-toggle="popover"]').popover({
        title: popoverTitle,
        content: popoverContent,
        html: true,
        placement: 'bottom',
        trigger: 'hover',
    })
    timeLine()
});

var repeatedElements;

function popoverTitle() {

    let element = $(this)
    let tag = document.getElementById(element.attr('id'))
    let title = tag.parentNode.lastElementChild.lastElementChild.innerHTML

    repeatedElements.forEach(rep => {
        if (rep.repeatedElementIndexes === parseInt(tag.id)) {
            tag = document.getElementById(rep.id)
            title = tag.parentNode.lastElementChild.lastElementChild.innerHTML + ' - ' + rep.title
        }
    });

    return title
}

function popoverContent() {
    let element = $(this)
    let tag = document.getElementById(element.attr('id'))
    let content = tag.innerHTML

    repeatedElements.forEach(rep => {
        if (rep.repeatedElementIndexes === parseInt(tag.id)) {
            console.log(rep.id)
            tag = document.getElementById(rep.id)
            content = tag.innerHTML
        }
    });


    return content
}

function timeLine() {
    let timeLineWidth = document.getElementById('timeline').offsetWidth;

    const firstElement = document.getElementById(1)
    firstElement.style.left = "0px"

    const lastDateElement = document.getElementById(8)

    const totalDays = getDaysBetweenElements(parseInt(firstElement.id), parseInt(lastDateElement.id))

    const dates = new Array()
    repeatedElements = new Array()

    for (let i = 0; i <= 7; i++) {
        let currentElement = document.getElementById(i + 1)

        let left = (timeLineWidth * getDaysBetweenElements(parseInt(firstElement.id), parseInt(currentElement.id))) / totalDays

        left = (i === 7) ? left -= currentElement.offsetWidth : left
        currentElement.style.left = left + "px"
        dates.push(currentElement.lastElementChild.innerHTML)

        const dateIndex = searchRepeatedDates(dates, currentElement.lastElementChild.innerHTML, i)
        if (dateIndex) {

            repeatedElements.push({
                id: dateIndex,
                title: currentElement.parentNode.lastElementChild.lastElementChild.innerHTML,
                value: currentElement.lastElementChild.innerHTML,
                repeatedElementIndexes: parseInt(currentElement.id),
            })

        }

    }
}

function getDaysBetweenElements(element_1, element_2) {
    let firstDate = formatDate(element_1)
    let lastDate = formatDate(element_2)
    let diffInTime = lastDate.getTime() - firstDate.getTime()
    let diffInDays = diffInTime / (1000 * 3600 * 24)
    return diffInDays
}

function formatDate(id) {
    let dayMonth = document.getElementById(id).lastElementChild.innerHTML.split('-')
    return new Date(new Date().getFullYear(), dayMonth[1] - 1, dayMonth[0])
}

function searchRepeatedDates(dates, currentDate, index) {
    if (dates.indexOf(currentDate) !== index) {
        return dates.indexOf(currentDate) + 1
    }
}

function debounce(func, time) {
    var time = time || 100
    var timer
    return function (event) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(func, time, event)
    }
}

window.addEventListener("resize", debounce(timeLine, 150))