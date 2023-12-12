import { ICustomElementViewModel, bindable } from 'aurelia';
import katex from 'katex';

export class KatexExpression implements ICustomElementViewModel {
  @bindable public expression: string;
  @bindable public options: string;

  private katexElement: Element;
  private _options = {};

  public bound() {
    this.updateOptions(this.options);
    this.renderExpression();
  }

  public expressionChanged(newValue: string, oldValue: string) {
    if (!newValue || newValue === oldValue) {
      return;
    }
    this.renderExpression();
  }

  public optionsChanged(newValue: string, oldValue: string) {
    if(!this.options || !newValue || newValue === oldValue) {
      return;
    }

    this.updateOptions(newValue);
  }

  private updateOptions(value) {
      if (!value) {
        return;
      }

      try {
        this._options = JSON.parse(value);
      } catch (error) {
        console.error('Invalid JSON in katexOptions', error);
      }
  }

  private renderExpression() {
    if (this.expression && this.katexElement) {
      try {
        katex.render(this.expression, this.katexElement, this._options);
      } catch (err) {
        console.error('Error rendering KaTeX expression', err);
      }
    }
  }
}
