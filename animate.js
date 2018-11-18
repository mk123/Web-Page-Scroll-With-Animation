/**
 * Created by manjeet on 18/11/18.
 */
animationInProgress = false;
scrollDirection = 'DOWN';
scrollStartTimeStamp = null;
scrollLastPageOffset = null;
animationTimeInMilliSecs = 1000;
numberOfPixelsToScroll = screen.availHeight;

window.requestAnimationFrame = window.requestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.msRequestAnimationFrame
    || function (f) {
        return setTimeout(f, 1000 / 60)
    }; // simulate calling code 60


function easeOut(t, b, c, d) {
    t /= d;
    return -c * t * (t - 2) + b;
}


/*
 timestamp is in milliseconds
 */
function scrollByY(timestamp) {
    if (scrollStartTimeStamp === null) {
        scrollStartTimeStamp = timestamp;
        scrollLastPageOffset = 0;
    }
    const newPageYOffset = easeOut(timestamp - scrollStartTimeStamp,
        0,
        numberOfPixelsToScroll,
        animationTimeInMilliSecs);
    const yDelta = Math.abs(newPageYOffset - scrollLastPageOffset);
    if (scrollDirection === 'DOWN') {
        window.scrollBy(0, yDelta);
    } else {
        window.scrollBy(0, -1 * yDelta);
    }
    scrollLastPageOffset = newPageYOffset;
    if (timestamp - scrollStartTimeStamp < animationTimeInMilliSecs) {
        window.requestAnimationFrame(scrollByY);
    } else {
        animationInProgress = false;
    }
}


function bodyScrolled(event) {
    if (animationInProgress === true) {
        return;
    }
    if (event.deltaY > 0) {
        scrollDirection = 'DOWN'
    } else {
        scrollDirection = 'UP'
    }
    animationInProgress = true;
    scrollStartTimeStamp = null;
    scrollLastPageOffset = null;
    window.requestAnimationFrame(scrollByY);
}

function getVisibleContentBlockId() {
    for (const block in contentBlocks) {

    }
}
