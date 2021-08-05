/**
 * 将阿里妈妈的iconfont.json文件读成想用的单色图标对象
 * @param json
 * @returns {{font_family: string, list: [], css_prefix_text: string}}
 */
export const analyzingIconForIconfont = function (json) {
    let font_family = '';
    let css_prefix_text = '';
    let list = [];
    if (json) {
        if (json.font_family) {
            font_family = json.font_family;
        }
        if (json.css_prefix_text) {
            css_prefix_text = json.css_prefix_text;
        }
        if (json.glyphs) {
            list = json.glyphs.map(function (value, index, array) {
                return font_family + " " + css_prefix_text + value.font_class
            });
        }
    }
    return {
        font_family,
        css_prefix_text,
        list
    }
};

/**
 * 将阿里妈妈的iconfont.json文件读成想用的彩色图标对象
 * @param json
 * @returns {{font_family: string, list: [], css_prefix_text: string}}
 */
export const eIconSymbol = function (json) {
    let font_family = '';
    let css_prefix_text = '';
    let list = [];
    if (json) {
        if (json.font_family) {
            font_family = json.font_family;
        }
        if (json.css_prefix_text) {
            css_prefix_text = json.css_prefix_text;
        }
        if (json.glyphs) {
            list = json.glyphs.map(function (value, index, array) {
                return '#' + css_prefix_text + value.font_class
            });
        }
    }
    return {
        font_family,
        css_prefix_text,
        list
    }
};

