import{createVNode as _createVNode,createTextVNode as _createTextVNode}from"vue";import{defineComponent}from"vue";import{Button}from"ant-design-vue";export default defineComponent({name:"my-component",props:{data:{type:Array,default:function(){return[]}}},render:function(){return _createVNode("div",{class:"my-component"},[_createVNode("p",null,[_createTextVNode("我是JSX写的组件666")]),_createVNode(Button,null,{default:function(){return[_createTextVNode("Button")]}})])}});
//# sourceMappingURL=component.js.map
