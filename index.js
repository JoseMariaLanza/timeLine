$(document).ready(function () {
    $('[data-toggle="popover"]').popover({
        title: popoverTitle,
        html: true,
        placement: 'bottom',
        trigger: 'hover',
        content: popoverContent
    })
    timeLine()
});

function popoverContent() {
    let element = $(this)
    let tag = document.getElementById(element.attr('id'))
    return tag.innerHTML
}

function popoverTitle() {
    let element = $(this)
    let tag = document.getElementById(element.attr('id'))

    // // Style (refactorizar)
    // tag.style.outline = 'none'

    let parentNode = tag.parentNode
    return parentNode.lastElementChild.lastElementChild.innerHTML
}

function timeLine() {
    let timeLineWidth = document.getElementById('timeline').offsetWidth;

    const firstDateElement = document.getElementById(1)
    firstDateElement.style.left = "0px"

    const lastDateElement = document.getElementById(8)

    const totalDays = getDaysBetweenElements(parseInt(firstDateElement.id), parseInt(lastDateElement.id))

    for (let i = 2; i <= 8; i++) {
        let actualDateElement = document.getElementById(i)

        let left = (timeLineWidth * getDaysBetweenElements(parseInt(firstDateElement.id), parseInt(actualDateElement.id))) / totalDays

        left = (i === 8) ? left -= actualDateElement.offsetWidth : left
        actualDateElement.style.left = left + "px"
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

function debounce(func, time) {
    var time = time || 100
    var timer
    return function(event) {
        if(timer) clearTimeout(timer)
        timer = setTimeout(func, time, event)
    }
}

window.addEventListener("resize", debounce(timeLine, 150))