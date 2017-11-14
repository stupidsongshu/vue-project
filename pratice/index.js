Vue.config.keyCodes.f1 = 112;
Vue.config.keyCodes.f2 = 113;
Vue.config.keyCodes.f3 = 114;
Vue.config.keyCodes.f4 = 115;
Vue.config.keyCodes.f5 = 116;
document.onkeydown = function (e) {
    if (e.keyCode == 112) {
        alert('F1');
        e.preventDefault();
    }
    if (e.keyCode == 116) {
        // alert('F5');
        // e.preventDefault();
    }
}
Vue.component('todo-item', {
    props: ['todo', 'message'],
    template: '<li>{{todo.text}} {{message}}</li>'
});

Vue.component('currencyInput1', {
    template: '\
                <span>\
                    $\
                    <input\
                        ref="input"\
                        v-bind:value="value"\
                        v-on:input="updateValue($event.target.value)"\
                    >\
                </span>\
                    ',
    props: ['value'],
    methods: {
        // 不是直接更新值，而是使用此方法来对输入值进行格式化和位数限制
        updateValue: function (value) {
            var formattedValue = value
                // 删除两侧的空格符
                .trim()
                // 保留 2 位小数
                .slice(
                    0,
                    value.indexOf('.') === -1 ?
                    value.length :
                    value.indexOf('.') + 3
                )
            // 如果值尚不合规，则手动覆盖为合规的值
            if (formattedValue !== value) {
                this.$refs.input.value = formattedValue
            }
            // 通过 input 事件带出数值
            this.$emit('input', Number(formattedValue))
        }
    }
});

/* Vue.component('currency-input', {
    template: '\
                <div>\
                <label v-if="label">{{ label }}</label>\
                $\
                <input\
                    ref="input"\
                    v-bind:value="value"\
                    v-on:input="updateValue($event.target.value)"\
                    v-on:focus="selectAll"\
                    v-on:blur="formatValue"\
                >\
                </div>\
            ',
    props: {
        value: {
            type: Number,
            default: 0
        },
        label: {
            type: String,
            default: ''
        }
    },
    mounted: function () {
        this.formatValue()
    },
    methods: {
        updateValue: function (value) {
            var result = currencyValidator.parse(value, this.value)
            if (result.warning) {
                this.$refs.input.value = result.value
            }
            this.$emit('input', result.value)
        },
        formatValue: function () {
            this.$refs.input.value = currencyValidator.format(this.value)
        },
        selectAll: function (event) {
            // Workaround for Safari bug
            // http://stackoverflow.com/questions/1269722/selecting-text-on-focus-using-jquery-not-working-in-safari-and-chrome
            setTimeout(function () {
                event.target.select()
            }, 0)
        }
    }
}); */

Vue.component('my-component', {
    template: '\
                <div>\
                    <h2>我是子组件的标题</h2>\
                    <slot>只有在没有要分发的内容时才会显示。</slot>\
                </div>'
});

Vue.component('app-layout', {
    template: '\
                <div class="container">\
                    <header>\
                        <slot name="header"></slot>\
                    </header>\
                    <main>\
                        <slot></slot>\
                    </main>\
                    <footer>\
                        <slot name="footer"></slot>\
                    </footer>\
                </div>'
});

Vue.component('child', {
    template: '\
                <div class="child">\
                    <slot text="hello from child"></slot>\
                </div>'
});

Vue.component('prop-validator', {
    props: {

    }
});

var data = {
    count: 0
}
var vm = new Vue({
    el: '#app',
    data: {
        message: 'hello vue' + new Date().toLocaleString(),
        todos: [{
                text: '学习 JavaScript'
            },
            {
                text: '学习 Vue'
            },
            {
                text: '整个牛项目'
            }
        ],
        groceryList: [{
                id: 0,
                text: '蔬菜'
            },
            {
                id: 1,
                text: '奶酪'
            },
            {
                id: 2,
                text: '随便其他什么人吃的东西'
            }
        ],
        a: '123',
        rawHtml: '<span style="color:red;">测试</span>',
        firstName: 'Foo',
        lastName: 'Bar',
        // fullName:'Foo Bar'
        question: '',
        answer: 'I cannot give you an answer until you ask a question!',
        imageSrc: '',
        isActive: false,
        classObject: {
            red: true,
            'font-20': true
        },
        isRed: 'red',
        font20: 'font-20',
        activeColor: 'red',
        fontSize: 24,
        styleObject: {
            color: 'red',
            fontSize: '24px',
            transform: 'rotate(10deg)'
        },
        yes: true,
        type: 'A',
        forObject: {
            firstName: 'John',
            lastName: 'Doe',
            age: 30
        },
        numbers: [1, 2, 3, 4, 5, 6, 7, 8],
        newTodoText: '',
        todoList: [{
                id: 1,
                title: 'Do the dishes',
            },
            {
                id: 2,
                title: 'Take out the trash',
            },
            {
                id: 3,
                title: 'Mow the lawn'
            }
        ],
        nextTodoId: 4,
        checkedNames: ['John'],
        picked: 'TWO',
        selected: '',
        selected1: [],
        selected2: '',
        selectedOptions: [{
                text: 'one',
                value: '1'
            },
            {
                text: 'two',
                value: '2'
            },
            {
                text: 'three',
                value: '3'
            }
        ],
        b: '',
        toggle: '',
        todoObj: {
            texttest: 'learn vue',
            isComplete: false
        },
        supCounter: 0,
        currencyValue: '',
        price: 0,
        shipping: 0,
        handling: 0,
        discount: 0,
        myAwesomeItems: [{
                name: 'html',
                price: 100
            },
            {
                name: 'css',
                price: 200
            },
            {
                name: 'js',
                price: 300
            }
        ],
        currentView: 'home',
        show: true
    },
    methods: {
        reverseMessage: function () {
            this.message = this.message.split('').reverse().join('');
        },
        getAnswer: _.debounce(function () {
            if (this.question.indexOf('?') == -1) {
                this.answer = 'Questions usually contain a question mark. ;-)';
                return;
            }
            this.answer = 'Waiting...';

            var vm = this;
            axios.get('https://yesno.wtf/api')
                .then(function (response) {
                    vm.answer = _.capitalize(response.data.answer);
                    vm.imageSrc = _.capitalize(response.data.image);
                })
                .catch(function (error) {
                    vm.answer = 'Error! Could not reach the API. ' + error;
                })
        }, 500),
        even: function (numbers) {
            return numbers.filter(function (item) {
                return item % 2 === 0;
            })
        },
        addNewTodo: function () {
            this.todoList.push({
                id: this.nextTodoId,
                title: this.newTodoText
            })
            this.nextTodoId++;
            this.newTodoText = '';
        },
        removeTodo: function (index) {
            console.log(index);
            this.todoList.splice(index, 1);
        },
        doThis: function () {
            alert(this.answer);
        },
        doThat: function () {
            alert('parent');
        },
        showkeyCode: function (event) {
            console.log(event.keyCode);
        },
        supIncrease: function () {
            this.supCounter++;
        },
        total: function () {
            return ((
                this.price * 100 +
                this.shipping * 100 +
                this.handling * 100 -
                this.discount * 100
            ) / 100).toFixed(2)
        },
        goHome(){
            this.currentView = 'home';
        },
        goToSchool(){
            this.currentView = 'school';
        },
        goToCompany(){
            this.currentView = 'company';
        },
    },
    // 不要在选项属性或回调上使用箭头函数，因为箭头函数是和父级上下文绑定在一起的，this 不会是如你所预期的 Vue 实例
    created: function () {
        // `this` 指向 vm 实例
        console.log(this.message);
    },
    // 计算属性
    computed: {
        reversedMessage: function () {
            return this.message.split('').reverse().join('');
        },
        /* fullName:function(){
            return this.firstName + " " + this.lastName;
        } */
        fullName: {
            // getter
            get: function () {
                return this.firstName + " " + this.lastName;
            },
            // setter
            set: function (newValue) {
                console.log(newValue);
                var names = newValue.split(' ');
                this.firstName = names[0];
                this.lastName = names[names.length - 1];
            }
        },
        classObject1: function () {
            return {
                red: this.isActive,
                'font-20': this.isActive
            }
        },
        evenNumbers: function () {
            return this.numbers.filter(function (item, index, arr) {
                return item % 2 == 0;
            })
        }
    },
    /* 
        当你有一些数据需要随着其它数据变动而变动时，你很容易滥用 watch——特别是如果你之前使用过 AngularJS。然而，通常更好的想法是使用计算属性而不是命令式的 watch 回调。
     */
    /* watch:{
        firstName:function(val){
            this.fullName = val + " " + this.lastName;
        },
        lastName:function(val){
            this.fullName = this.firstName + ' ' + val;
        }
    }, */
    watch: {
        question: function (value) {
            this.answer = 'Waiting for you to stop typing...';
            this.getAnswer();
        }
    },
    components: {
        'new-todo-item': {
            // 子组件要显式地用 props 选项声明它期待获得的数据
            // props: ['title', 'id', 'index', 'myMessage', 'todoObj'],
            props: {
                title: {
                    type: String,
                    default: 'hello world',
                    required: true
                },
                id: Number,
                index: Number,
                myMessage: String,
                todoObj: Object
            },
            template: '\
                        <li>\
                        {{index}}-{{id}}-{{title}}\
                        <button v-on:click="$emit(\'remove\')">×</button>\
                        <button v-on:click="count++">{{count}}</button>{{myMessage}}{{todoObj}}\
                        </li>',
            data: function () {
                // return data; //组件共享了同一个 data，因此增加一个 count 会影响所有组件,可以通过为每个组件返回全新的 data 对象来解决这个问题
                console.log(this.todoObj); //怪了啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊
                console.log(this.title);
                return {
                    count: 0
                }
            }
        },
        'button-counter': {
            template: '<button @click="subIncrease">{{subCounter}}</button>',
            data: function () {
                return {
                    subCounter: 0
                }
            },
            methods: {
                subIncrease: function () {
                    console.log(this);
                    this.subCounter++;
                    this.$emit('event');
                }
            }
        },
        'my-awesome-list': {
            props: {
                items: {
                    type: Array
                }
            },
            template: '<ul>\
                            <slot name="item" v-for="item in items" :data="item"></slot>\
                        </ul>'
        },
        home: {
            template: '<h2>This is home</h2>'
        },
        school: {
            template: '<h2>This is school</h2>'
        },
        company: {
            template: '<h2>This is company</h2>'
        }
    }
});


setTimeout(() => {
    vm.todos.push({
        text: '哈哈哈'
    });
    vm.todos[2] = {
        text: '2秒后更改'
    };
    // vm.todos.length = 2;
    vm.groceryList.splice(1, 0, {
        id: 3,
        text: '渲染后改变'
    })
    vm.message = 'zhouyusong';
    vm.fullName = 'hello world';
    vm.type = 'B';
    Vue.set(vm.forObject, 'sex', 'Man');
    vm.$set(vm.forObject, 'nickname', 'Bob');
    vm.forObject = Object.assign({}, vm.forObject, {
        a: '1',
        b: '2'
    });
}, 2000);
setTimeout(() => {
    vm.type = 'C';
}, 4000);
setTimeout(() => {
    vm.type = 'D';
}, 6000);
console.log(vm.$el === document.getElementById('app'));
console.log(vm.$el, vm.$data);
vm.$watch('a', function (newValue, oldValue) {
    console.log(newValue, oldValue);
});
// vm.b = '456';
// Vue.set(vm,'b',789);

console.log(vm);