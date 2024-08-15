//导出变量
export const str = 'aaa'

//导出函数
export function fn() {
    console.log('bbb');
}

//导出类
export class Student {
    constructor(name) {
        this.name = name
    }
}

//默认导出（仅有一个）
export default function () {
    console.log('匿名函数');
}