import i18n from './i18n.json';

class I18N {
    constructor() {
        this.i18n = i18n;
    }

    getText(key) {
        if (this.i18n.hasOwnProperty(key)) return this.i18n[key];
        else return key;
    }

    parseText(key, attributes) {
        let text = this.getText(key);

        if (attributes) {
            for (let i = 0; i < attributes.length; i++) {
                text = text.replace(`&${i + 1}`, attributes[i]);
            }
        }

        return text;
    }
}

export default new I18N();