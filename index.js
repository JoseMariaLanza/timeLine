$(document).ready(function() {
    $('[data-toggle="popover"]').popover({
        title: popoverTitle,
        html: true,
        placement: 'bottom',
        trigger: 'hover',
        content: popoverContent
    })
});

function popoverContent() {
    let element = $(this)
    // let content = document.querySelector('#dataPopover')
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

// --------------------------------------------------------------

// FUNCIONAMIENTO DE POPOVER

// $(document).ready(function() {
//     $data = $(document).getElementById('dataPopover')
//     $('[data-toggle="popover", data-content="$data"]').popover()
// });

// --------------------------------------------------------------

function timeLine() {
    let timeLineWidth = document.getElementById('timeline').offsetWidth;
    console.log(timeLineWidth)
    let days = getDays()
    console.log(days)
}

function getDays() {
    let firstDate = formatDate(1)
    let lastDate = formatDate(8)
    let diffInTime = lastDate.getTime() - firstDate.getTime()
    let diffInDays = diffInTime / (1000 * 3600 * 24)
    return diffInDays
}

function formatDate(id) {
    let dayMonth = document.getElementById(id).lastElementChild.innerHTML.split('-')
    return new Date(2021, dayMonth[1]-1, dayMonth[0])
}

timeLine()


// document.addEventListener('DOMContentLoaded', readddy);

// function readddy() {

//     var navListItems = $('div.setup-panel div a'),

//         allWells = $('.setup-content'),

//         allNextBtn = $('.nextBtn'),

//         allPrevBtn = $('.prevBtn');



//     allWells.hide();



//     navListItems.click(function (e) {

//         e.preventDefault();

//         var target = $($(this).attr('href')),

//             item = $(this);



//         if (!item.hasClass('disabled')) {

//             navListItems.removeClass('btn-indigo').addClass('btn-default');

//             item.addClass('btn-indigo');

//             allWells.hide();

//             target.show();

//             target.find('input:eq(0)').focus();

//         }

//     });



//     allPrevBtn.click(function () {

//         console.log('allPrevBtn');

//     });



//     allNextBtn.click(function () {

//         console.log('allNextBtn');

//     });



//     $('div.setup-panel div a.btn-indigo').trigger('click');

// };