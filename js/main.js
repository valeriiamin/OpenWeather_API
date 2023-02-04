

window.addEventListener('load', () => {
    // const content = document.querySelector('.content')
    // const preloader = document.querySelector('.preloader')

    contentSwitcher();

    

})

function contentSwitcher(content, preloader) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            document.querySelector('.content').hidden = false;
            document.querySelector('.preloader').style.display = 'none';
        }, 3000)
    })
}