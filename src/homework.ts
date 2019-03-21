// 1. Создать декоратор метода addItemInfoDecorator он должен добавлять поле date в возвращаемом объекте с датой когда 
// был вызван метод а также поле info в котором будет записан текст состоящий из названия товара и его цены 
// например: ‘Apple iPhone - $100’;
// Для того что бы функция была вызвана в правильном контексте внутри декоратора ее нужно вызывать через
// apply let origResult =  originalFunc.apply(this);

function addItemInfoDecorator(target: Object, method: string, descriptor: PropertyDescriptor) {
    let origFunc = descriptor.value;
    descriptor.value = function() {
        let origResult =  origFunc.apply(this);
        this.date = new Date();
        this.info = `${this.name} IPhone - ${this.price}$`
    }
}

class Item {
    public price: number;
    public name: string;
    public date: string;
    public info: string;

    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }

    @addItemInfoDecorator
    public getItemInfo() {
        return {
            name: this.name, 
            price: this.price
        };
    }
}

let item = new Item('Apple', 100);
console.log(item.getItemInfo());

// 2.Создать декоратор класса User. Он должен добавлять в данном классе поле createDate
// датой создания класса а также добавлять поле type в котором будет записана строка ‘admin’ или ‘user’
// данную строку нужно передать в декоратор при вызове. Сам класс и имя декоратора может быть произвольным.

function addUserDecorator(type: string) {
    return function(targetClass) {
        return class {
            public createDate = new Date();
            public type: string = type;
        }
    }
}

@addUserDecorator('user')
class User {

}

const user = new User()

// 3. Есть два апи для получения и работы с новостями одно для получения новостей из USA второе из Ukraine.
// Под эти апи создано по два интерфейса и по два класса. Переделайте это в namespaces.

// News api USA
interface INews {
    id: number;
    title: string;
    text: string;
    author: string;
}

class NewsService {
    protected apiurl: string = 'https://news_api_usa_url'
    public getNews() {} // method
}

// News api Ukraine
interface INews2 {
    uuid: string;
    title: string;
    body: string;
    author: string;
    date: string;
    imgUrl: string;
}

class NewsService2 {
    protected apiurl: string = 'https://news_api_2_url'
    public getNews() {} // method get all news
    public addToFavorite() {} // method add to favorites
}

namespace ApiNews {
    export interface INews {
        id: number;
        title: string;
        text: string;
        author: string;
    }

    export interface INews2 {
        uuid: string;
        title: string;
        body: string;
        author: string;
        date: string;
        imgUrl: string;
    }
}

// 4.Есть два класса Junior и Middle создайте класс Senior который будет имплементировать 
// этих два класса а также у него будет еще свой метод createArchitecture 
// реализация данного метода может быть произвольной.

class Junior {
    doTasks() {
        console.log('Actions!!!');
    }
}

class Middle {
    createApp() {
        console.log('Creating!!!');
    }
}

class Senior implements Junior, Middle {
    public doTasks() {
        console.log('Actions!!!');
    }
    public createApp() {
        console.log('Creating!!!');
    }
    public createArchitecture() {
        console.log('Architecture!!!')
    }
}

applyMixins(Senior, [Junior, Middle]) 

function applyMixins(targetClass: any, baseClass: any[]) {
    baseClass.forEach(baseClass => {
        Object.getOwnPropertyNames(baseClass.prototype).forEach(name => {
            targetClass.prototype[name] = baseClass.prototype[name];
        });
    });
}

const developer = new Senior()

