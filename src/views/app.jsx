/**
 * Created by xiaoluzi on 2018/7/16.
 */
import {message} from 'antd'
import {config} from './config';
import axios from 'axios';
import md5 from 'MD5';
const app = {
    serverUrl: config.serverUrl,
    imgServerUrl: config.imgServerUrl,
    fileUrl: config.fileUrl,
    loadIndex: "",
    setToken: function (token) { //存储Token值
        return localStorage.setItem("footballToken", token);  //localStorage没有时间限制的数据存储。添加键值对：localStorage.setItem(key,value)，将value存储到key字段
    },
    getToken: function () {  //获取token值
        return localStorage.getItem("footballToken"); //　获取键值：localStorage.getItem(key)
    },
    removeToken() {
        localStorage.removeItem("footballToken");
    },
    /**
     *   存储值
     */
    setData: function (key, value) {
        if (!value) {
            return;
        }
        if (typeof value == 'object') {
            localStorage.setItem(key, JSON.stringify(value));
        } else {
            localStorage.setItem(key, value);
        }
    },
    /**
     * 获取存储的值
     * @key 需要的值对应的Key
     * @defaultData 当返回的值是空的时候，返回
     */
    getData(key, defaultData) {
        try {
            var re = localStorage.getItem(key);
            if (re) {
                return JSON.parse(re);
            } else {
                return defaultData;
            }
        } catch (e) {
            return re;
        }
    },
    removeData(key) {
        localStorage.removeItem(key);
    },

    clear(){
        localStorage.clear();
    },

    post: function (url, data) {
        // 以下两个固定传给服务器的参数
         data.venue_id = app.getToken();
        return this.ajax(url, 'POST',data)
    },
    get: function (url, data) {
        const option = {form: data, method: 'GET'};
        // return this.ajax(url, option)
    },

    // request-promise请求
    ajax: function (url, method,data) {
        return new Promise(function (resolve, reject) {
            axios({
                method: method,
                url: app.serverUrl + url,
                headers: {
                    'Content-Type': 'application/json',
                    'accessToken':app.getData('accessToken'),
                    'Accept':'application/json',
                    'currentUser':app.getData('currentUser'),
                },
                data: data
            }).then(function (req) {
                switch (req.status) {
                    case 401 :
                        app.alert("未登录");

                        // app.removeCookie('token');
                        // app.removeToken('token');
                        break;
                    case 403 :
                        app.alert("权限不足，禁止访问");
                        break;
                    case 200 :
                        resolve(req.data);
                        break;
                    default:
                        app.alert("未知错误");
                        break;
                }
            }).catch(function (error) {
                app.alert(error.message);
            });
        })
    },

    /**
     * 弹出警告
     * @param msg 警告内容
     * @param times 时长 默认 1.5
     * @param type 警告类型可选值 success、error、warning、info 默认 info
     */
    alert(msg, type = "info", times = 1.5) {
        message.config({
            top: '35%',
            duration: 2,
        });
        message[type](msg, times);
    },

    md5(value) {
        return md5(value);
    }
};

export default app;