import { PropType } from 'vue';
interface IDataItem {
    key: string;
    name: string;
    age: null;
    address: string;
    tags: string[];
}
declare const _default: import("vue").DefineComponent<{
    data: {
        type: PropType<IDataItem[]>;
        default: () => never[];
    };
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    data: {
        type: PropType<IDataItem[]>;
        default: () => never[];
    };
}>>, {
    data: IDataItem[];
}>;
export default _default;
