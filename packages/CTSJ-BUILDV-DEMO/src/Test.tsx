import { CSSProperties, defineComponent, ref, VNode, watch, PropType } from 'vue';
import classNames from 'classnames';
import { bool, object, oneOfType, string } from 'vue-types';

const selectorPrefix = 'adherev-ui-playground-collapse';

export const collapseProps = {
  headerClassName: string().def(''),
  headerStyle: object<CSSProperties>().def({}),
  bodyClassName: string().def(''),
  bodyStyle: object<CSSProperties>().def({}),
  title: oneOfType([string(), object<VNode>()]),
  extra: oneOfType([string(), object<VNode>()]),
  defaultCollapse: bool().def(false),
  border: bool().def(false),
  scrollY: bool().def(false),
  fixedHeaderScrollBody: bool().def(false),

  // headerClassName: {
  //   type: String,
  //   default: '',
  // },
  // headerStyle: {
  //   type: Object as PropType<CSSProperties>,
  //   default: () => ({}),
  // },
  // bodyClassName: {
  //   type: String,
  //   default: '',
  // },
  // bodyStyle: {
  //   type: Object as PropType<CSSProperties>,
  //   default: () => ({}),
  // },
  // title: {
  //   type: [String, Object],
  // },
  // extra: {
  //   type: [String, Object],
  // },
  // defaultCollapse: {
  //   type: Boolean,
  //   default: false,
  // },
  // border: {
  //   type: Boolean,
  //   default: false,
  // },
  // scrollY: {
  //   type: Boolean,
  //   default: false,
  // },
  // fixedHeaderScrollBody: {
  //   type: Boolean,
  //   default: false,
  // },
};

console.log('collapseProps11111111', JSON.stringify(collapseProps));

export default defineComponent({
  name: 'adv-playground-collapse',
  props: collapseProps,
  setup(props, { slots }) {
    console.log('props', JSON.stringify(props));

    const collapse = ref<boolean>(props.defaultCollapse);

    watch(
      () => props.defaultCollapse,
      (newVal, preValue) => {
        if (newVal !== preValue) {
          collapse.value = newVal;
        }
      },
    );

    const onClickHeader = () => {
      collapse.value = !collapse.value;
    };

    console.log('headerClassName', props.headerClassName);

    return () => (
      <div
        class={classNames(
          selectorPrefix,
          props.scrollY ? `${selectorPrefix}-scroll-y` : '',
          props.fixedHeaderScrollBody ? `${selectorPrefix}-fixed-header-scroll-body` : '',
        )}
      >
        <div
          class={classNames(
            `${selectorPrefix}-header`,
            props.border ? `${selectorPrefix}-header-border` : '',
            (props.headerClassName || '').split(/\s+/),
          )}
          style={props.headerStyle}
          onClick={onClickHeader}
        >
          <div class={`${selectorPrefix}-header-collapse`}>
            <div
              class={classNames(
                `${selectorPrefix}-header-collapse-icon`,
                collapse.value ? '' : `${selectorPrefix}-header-collapse-icon-close`,
              )}
            />
            <div class={`${selectorPrefix}-header-title`}>{props.title}</div>
          </div>

          <div class={`${selectorPrefix}-header-extra`}>{props.extra}</div>
        </div>

        <div
          class={classNames(
            `${selectorPrefix}-body`,
            props.border ? `${selectorPrefix}-body-border` : '',
            (props.bodyClassName || '').split(/\s+/),
            !!props.title || !!props.extra ? `${selectorPrefix}-body-exists-header` : '',
          )}
          style={props.bodyStyle}
        >
          {slots.default ? slots.default() : null}
        </div>
      </div>
    );
  },
});
