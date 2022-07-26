import Uploader from 'simple-uploader.js'
import { getCurrentInstance } from 'vue'

export function useuploader(options,autoStart,fileStatusText){
    options.initialPaused=!autoStart
    const uploader =new Uploader(options)
    uploader.fileStatusText=fileStatusText

    return {uploader}
}

const FILE_ADDED_EVENT = 'fileAdded'
const FILES_ADDED_EVENT = 'filesAdded'
const UPLOAD_START_EVENT = 'uploadStart'
const EVENTSMAP = {
    [FILE_ADDED_EVENT]: true,
    [FILES_ADDED_EVENT]: true,
    [UPLOAD_START_EVENT]: 'uploadStart'
}
const {proxy} =getCurrentInstance()
//注册所有事件
export function allEvent(...args){
    const name = args[0]
    const handler = EVENTSMAP[name]
    if(handler){
        if (handler === true) {
            return
        }
        if(proxy[handler]){
            proxy[handler].apply(proxy, args.slice(1))
        }else{
            console.error("方法未注册成功")
        }
    }
    proxy.$emit(name, ...args.slice(1))
}



