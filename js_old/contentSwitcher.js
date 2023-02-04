import {getElem} from './helper.js'

export class ContentSwitcher {
    #content = getElem('#content')
    #preloader = getElem('#preloader')

    disablePreloader = () => this.#preloader.hidden = true
    enablePreloader = () => this.#preloader.hidden = false
    showContent = () => this.#content.hidden = false
}