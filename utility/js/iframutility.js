import { iframeLink } from "./constants.js";

const gameLink = window.pageConfig ? window.pageConfig.gameLink : "home";

const size = window.pageConfig ? window.pageConfig.size : 0;



const iframe = document.querySelector('.game-iframe');
const pageContent = document.querySelector('.page-content');
const exitBtn = document.getElementById('exit-game-btn');

window.addEventListener('blur', function () {
    setTimeout(() => {
        if (document.activeElement === iframe) {
            // Enter Game Mode: scroll to center, show exit button, then lock scroll
            iframe.scrollIntoView({ behavior: 'smooth', block: 'center' });
            exitBtn.style.display = 'block';
            
            setTimeout(() => {
                pageContent.classList.add('scroll-locked');
            }, 500); // Delay scroll lock to let smooth scrolling finish
        }
    }, 50);
});

exitBtn.addEventListener('click', function () {
    pageContent.classList.remove('scroll-locked');
    exitBtn.style.display = 'none';

    // Return focus to the main page to enable normal scrolling
    window.focus();
    exitBtn.blur();
});


const gameLinkIframe=document.getElementById("game-link-iframe");

gameLinkIframe.src=iframeLink+gameLink;




if(size!=0){
gameLinkIframe.onload = () => {
    iframe.contentWindow.postMessage(
        {
            size:size
        },
        iframeLink+gameLink
    );
};}