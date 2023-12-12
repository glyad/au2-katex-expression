import { CustomElement } from 'aurelia';
import { render } from './helper';
import { KatexExpression } from '../src/katex-expression';

describe('hello-world', () => {
  it('should render message', async () => {
    const node = (await render(`<katex-expression expression="\\int \\dfrac{(log\\ x)^3}{x}\\ dx" options="{ "displayMode": false , "throwOnError": true, "output": "mathml" }'></katex-expression>`, KatexExpression)).firstElementChild;
    // In Shadow DOM open mode, shadowRoot is also accessible through DOM API
    //   node.shadowRoot
    // But only Aurelia API can access shadowRoot in both open and closed mode.
    const shadowRoot = CustomElement.for(node).shadowRoot;
    const text = (shadowRoot as Node).textContent;
    expect(text == '∫(log x)3x dx\\int \\dfrac{(log\\ x)^3}{x}\\ dx∫x(log x)3 dx').toBeTruthy();
  });
});
