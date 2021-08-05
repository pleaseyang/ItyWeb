/**
 *类功能：对象类型判断工具
 **/
export const TypeUtil = {
    /**
     *方法说明：是否是数组
     **/
    isArray: function (obj) {//是否是数组
        return (typeof obj == 'object') && obj.constructor === Array;//返回是否是数组
    },
    /**
     *方法说明：是否是字符串
     **/
    isString: function (obj) {//是否是字符串
        return (typeof obj == 'string') && obj.constructor === String;//返回是否是字符串
    },
    /**
     *方法说明：是否是数字
     **/
    isNumber: function (obj) {//是否是数字
        return (typeof obj == 'number') && obj.constructor === Number;//返回是否是数字
    },
    /**
     *方法说明：是否是日期
     **/
    isDate: function (obj) {//是否是日期
        return (typeof obj == 'object') && obj.constructor === Date;//返回是否是日期
    },
    /**
     *方法说明：是否是方法
     **/
    isFunction: function (obj) {//是否是方法
        return (typeof obj == 'function') && obj.constructor === Function;//返回是否是方法
    },
    /**
     *方法说明：是否是对象
     **/
    isObject: function (obj) {//是否是对象
        return (typeof obj == 'object') && obj.constructor === Object;//返回是否是对象
    },
};
